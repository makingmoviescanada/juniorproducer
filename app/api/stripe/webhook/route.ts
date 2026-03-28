import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10',
});

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SECRET_KEY || '',
  {
    auth: { persistSession: false },
  }
);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature') || '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        const userId = session.metadata?.userId;
        const tier = session.metadata?.tier || 'artist';

        if (!userId || !session.subscription) {
          console.error('Missing userId or subscription ID in session metadata');
          break;
        }

        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );

        await supabaseAdmin
          .from('subscriptions')
          .update({
            stripe_subscription_id: subscription.id,
            stripe_customer_id: session.customer as string,
            subscription_status: subscription.status,
            current_period_end: new Date(
              subscription.current_period_end * 1000
            ).toISOString(),
            tier,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', userId);

        console.log(`Subscription created for user ${userId}`);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const { data: subRecord } = await supabaseAdmin
          .from('subscriptions')
          .select('user_id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (subRecord) {
          await supabaseAdmin
            .from('subscriptions')
            .update({
              subscription_status: subscription.status,
              current_period_end: new Date(
                subscription.current_period_end * 1000
              ).toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq('user_id', subRecord.user_id);

          console.log(
            `Subscription updated for user ${subRecord.user_id}: ${subscription.status}`
          );
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const { data: subRecord } = await supabaseAdmin
          .from('subscriptions')
          .select('user_id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (subRecord) {
          await supabaseAdmin
            .from('subscriptions')
            .update({
              subscription_status: 'canceled',
              updated_at: new Date().toISOString(),
            })
            .eq('user_id', subRecord.user_id);

          console.log(`Subscription canceled for user ${subRecord.user_id}`);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
