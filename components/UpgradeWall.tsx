'use client';

import { useState } from 'react';

interface UpgradeWallProps {
  userId: string;
  messageCount: number;
  messageLimit: number;
}

export default function UpgradeWall({
  userId,
  messageCount,
  messageLimit,
}: UpgradeWallProps) {
  const [loading, setLoading] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>(
    'annual'
  );

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const priceId =
        billingPeriod === 'annual'
          ? 'price_1TFpZtRwIeAXbMNlyXvqXME9'
          : 'price_1TFpWNRwIeAXbMNlc8W0Z8Fp';

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          billingPeriod,
          userId,
        }),
      });

      const data = await response.json();

      if (data.sessionId) {
        window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`;
      } else {
        alert('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Error initiating checkout');
    } finally {
      setLoading(false);
    }
  };

  if (messageCount < messageLimit) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            You've used your 20 free messages
          </h2>
          <p className="text-gray-600">
            Join the Artist tier to get unlimited access to Junior.
          </p>
        </div>

        <div className="mb-6 flex gap-3">
          <button
            onClick={() => setBillingPeriod('annual')}
            className={`flex-1 py-3 px-4 rounded font-semibold transition-colors ${
              billingPeriod === 'annual'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            Annual
            <div className="text-sm font-normal">CA$32/mo</div>
          </button>
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`flex-1 py-3 px-4 rounded font-semibold transition-colors ${
              billingPeriod === 'monthly'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            Monthly
            <div className="text-sm font-normal">CA$39/mo</div>
          </button>
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded transition-colors"
        >
          {loading ? 'Loading...' : 'Join as Artist'}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Secure checkout powered by Stripe
        </p>
      </div>
    </div>
  );
}
