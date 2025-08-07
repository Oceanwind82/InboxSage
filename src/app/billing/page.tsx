'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { PRICING_PLANS } from '@/utils/billing-helpers'

export default function BillingPage() {
  const [currentPlan] = useState('free') // This would come from user's subscription data
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handleUpgrade = async (planId: string) => {
    setIsLoading(planId)
    
    try {
      // In a real app, you'd create a Stripe checkout session
      console.log(`Upgrading to ${planId} plan`)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Redirect to Stripe checkout would happen here
      alert(`Upgrade to ${planId} plan initiated!`)
    } catch (error) {
      console.error('Upgrade failed:', error)
      alert('Upgrade failed. Please try again.')
    } finally {
      setIsLoading(null)
    }
  }

  const handleManageBilling = () => {
    // In a real app, this would open the Stripe customer portal
    alert('Opening billing portal...')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
          Billing & Plans
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your subscription and billing information.
        </p>
      </div>

      {/* Current Plan */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Current Plan</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900 capitalize">{currentPlan} Plan</p>
            <p className="text-sm text-gray-500">
              {currentPlan === 'free' 
                ? 'You are currently on the free plan'
                : 'Your subscription is active'
              }
            </p>
          </div>
          {currentPlan !== 'free' && (
            <button
              onClick={handleManageBilling}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Manage Billing
            </button>
          )}
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Available Plans</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-lg border ${
                currentPlan === plan.id
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-300 bg-white'
              } p-6 shadow-sm`}
            >
              {currentPlan === plan.id && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    Current
                  </span>
                </div>
              )}
              
              <div className="mb-4">
                <h4 className="text-lg font-medium text-gray-900">{plan.name}</h4>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-sm text-gray-500">/{plan.interval}</span>
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {currentPlan === plan.id ? (
                <button
                  disabled
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-400 bg-gray-100 cursor-not-allowed"
                >
                  Current Plan
                </button>
              ) : (
                <button
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={isLoading === plan.id}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isLoading === plan.id ? 'Processing...' : plan.price === 0 ? 'Downgrade' : 'Upgrade'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Billing History
          </h3>
          
          <div className="text-sm text-gray-500">
            {currentPlan === 'free' ? (
              <p>No billing history available for free plan.</p>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <div>
                    <p className="font-medium text-gray-900">Pro Plan - Monthly</p>
                    <p className="text-gray-500">Dec 1, 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">$9.99</p>
                    <p className="text-green-600">Paid</p>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <div>
                    <p className="font-medium text-gray-900">Pro Plan - Monthly</p>
                    <p className="text-gray-500">Nov 1, 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">$9.99</p>
                    <p className="text-green-600">Paid</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
