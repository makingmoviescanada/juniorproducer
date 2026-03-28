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

    const validPrices = {
      monthly: 'price_1TFpWNRwIeAXbMNlc8W0Z8Fp',
      annual: 'price_1TFpZtRwIeAXbMNlyXvqXME9',
    };

    if (
      priceId !== validPrices.monthly &&
      priceId !== validPrices.annual
    ) {
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
      const customer = await stripe.customers.create({
        metadata: {
          userId,
        },
      });
      stripeCustomerId = customer.id;
      await supabaseAdmin.from('subscriptions').insert({
        user_id: userId,
        stripe_customer_id: stripeCustomerId,
        tier: 'filmmaker',
        subscription_status: 'pending',
      });
    }

    // DEBUG: Log env vars
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.juniorproducer.ca';
    const successUrl = `${siteUrl}/chat`;
    const cancelUrl = `${siteUrl}/pricing`;
    
    console.log('=== STRIPE CHECKOUT DEBUG ===');
    console.log('NEXT_PUBLIC_SITE_URL env var:', process.env.NEXT_PUBLIC_SITE_URL);
    console.log('siteUrl fallback:', siteUrl);
    console.log('success_url:', successUrl);
    console.log('cancel_url:', cancelUrl);
    console.log('=============================');

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId,
        tier: 'filmmaker',
      },
    });

    console.log('Stripe session created:', session.id);
    console.log('Session success_url:', session.success_url);

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
