"use client"

import { useEffect } from 'react'

interface KitFormProps {
  className?: string
}

export function KitForm({ className = "" }: KitFormProps) {
  useEffect(() => {
    // Load ConvertKit script
    const script = document.createElement('script')
    script.src = 'https://f.convertkit.com/ckjs/ck.5.js'
    script.async = true
    document.head.appendChild(script)
  }, [])

  return (
    <>
      <style>{`
        .formkit-form .formkit-input {
          border: 2px solid #1A1A1A !important;
          padding: 0.75rem 1rem !important;
          font-family: 'Lato', sans-serif !important;
          background-color: #FFFFFF !important;
          color: #1A1A1A !important;
        }

        .formkit-form .formkit-input:focus {
          border-color: #1A1A1A !important;
          outline: none !important;
          box-shadow: none !important;
        }

        .formkit-form .formkit-input::placeholder {
          color: #999999 !important;
        }

        .formkit-form .formkit-submit {
          background-color: #E8392A !important;
          border: 2px solid #1A1A1A !important;
          color: #FFFFFF !important;
          padding: 0.75rem 1.5rem !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.04em !important;
          font-family: 'Lato', sans-serif !important;
          cursor: pointer !important;
          font-size: 0.875rem !important;
          transition: transform 0.15s ease, box-shadow 0.15s ease !important;
          box-shadow: 5px 5px 0 #1A1A1A !important;
        }

        .formkit-form .formkit-submit:hover {
          transform: translate(-2px, -2px) !important;
          box-shadow: 7px 7px 0 #1A1A1A !important;
        }

        .formkit-form .formkit-submit:active {
          transform: translate(4px, 4px) !important;
          box-shadow: none !important;
        }

        .formkit-form .formkit-submit:focus-visible {
          outline: 2px solid #1A1A1A !important;
          outline-offset: 2px !important;
        }

        .formkit-form .formkit-fields {
          gap: 0.75rem !important;
          flex-wrap: wrap !important;
        }

        .formkit-form .formkit-field {
          flex: 1 1 auto !important;
          min-width: 200px !important;
        }

        .formkit-alert {
          color: #E8392A !important;
          font-size: 0.875rem !important;
          margin-bottom: 0.5rem !important;
        }
      `}</style>
      <div className={`flex ${className}`}>
      <form
        action="https://app.kit.com/forms/9206634/subscriptions"
        className="seva-form formkit-form"
        method="post"
        data-sv-form="9206634"
        data-uid="7770c7b826"
        data-format="inline"
        data-version="5"
        data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Success! Now check your email to confirm your subscription.","redirect_url":""},"analytics":{"google":null,"fathom":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null,"googletagmanager":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":true,"url":"https://kit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic"},"recaptcha":{"enabled":false},"return_visitor":{"action":"show","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}'
        min-width="400 500 600 700 800"
      >
        <div data-style="clean">
          <ul className="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul>
          <div data-element="fields" data-stacked="false" className="seva-fields formkit-fields">
            <div className="formkit-field">
              <input
                className="formkit-input"
                name="email_address"
                aria-label="Email Address"
                placeholder="Email Address"
                required
                type="email"
              />
            </div>
            <button data-element="submit" className="formkit-submit formkit-submit">
              <div className="formkit-spinner">
                <div></div>
                <div></div>
                <div></div>
              </div>
              <span className="formkit-state-loading">Get Early Access</span>
            </button>
          </div>

        </div>
      </form>
      </div>
    </>
  )
}
