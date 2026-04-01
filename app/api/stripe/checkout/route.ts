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
  try {
    const { priceId, billingPeriod, userId } = await request.json();

    if (!priceId || !billingPeriod || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const validPrices = [
  'price_1TFrW4RzmBTZm8w5ZRTltdfM', // monthly
  'price_1TFrW3RzmBTZm8w5FafvtRoL', // annual
  'price_1TFrW2RzmBTZm8w5R94Bx3w9', // 7-day
];
if (!validPrices.includes(priceId)) {
  return NextResponse.json(
    { error: 'Invalid price ID' },
    { status: 400 }
  );
}

    let stripeCustomerId: string;
    const { data: existingSub } = await supabaseAdmin
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', userId)
      .single();

    if (existingSub?.stripe_customer_id) {
      stripeCustomerId = existingSub.stripe_customer_id;
    } else {
      // Fetch user email from Supabase Auth
      const customer = await stripe.customers.create({
  metadata: { userId },
});
      stripeCustomerId = customer.id;
      await supabaseAdmin.from('subscriptions').insert({
        user_id: userId,
        stripe_customer_id: stripeCustomerId,
        tier: 'filmmaker',
        subscription_status: 'pending',
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: billingPeriod === 'one_time' ? 'payment' : 'subscription',
      success_url: 'https://www.juniorproducer.ca/chat',
      cancel_url: 'https://www.juniorproducer.ca/pricing',
      metadata: {
        userId,
        tier: 'filmmaker',
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
