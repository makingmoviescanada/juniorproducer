"use client"

import { useEffect } from 'react'

interface KitFormProps {
  className?: string
  variant?: 'light' | 'dark'
}

export function KitForm({ className = "", variant = 'light' }: KitFormProps) {
  useEffect(() => {
    if (!document.querySelector('script[src="https://f.convertkit.com/ckjs/ck.5.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://f.convertkit.com/ckjs/ck.5.js'
      script.async = true
      document.head.appendChild(script)
    }
  }, [])

  const inputBg = variant === 'dark' ? '#FFFFFF' : '#FFFFFF'
  const inputBorder = variant === 'dark' ? '#FFFFFF' : '#1A1A1A'
  const inputColor = '#1A1A1A'
  const btnShadow = variant === 'dark' ? '#1A1A1A' : '#1A1A1A'
  const alertColor = variant === 'dark' ? '#FFFFFF' : '#E8392A'

  return (
    <>
      <style>{`
        .formkit-form[data-uid="7770c7b826"] {
          width: 100% !important;
          background: transparent !important;
          padding: 0 !important;
        }

        .formkit-form[data-uid="7770c7b826"] .formkit-fields {
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: wrap !important;
          gap: 0.75rem !important;
          align-items: stretch !important;
        }

        .formkit-form[data-uid="7770c7b826"] .formkit-field {
          flex: 1 1 220px !important;
          min-width: 0 !important;
        }

        .formkit-form[data-uid="7770c7b826"] .formkit-input {
          width: 100% !important;
          height: 100% !important;
          min-height: 48px !important;
          border: 2px solid ${inputBorder} !important;
          border-radius: 0 !important;
          padding: 0.75rem 1rem !important;
          font-family: 'Lato', sans-serif !important;
          font-size: 0.9375rem !important;
          background-color: ${inputBg} !important;
          color: ${inputColor} !important;
          box-shadow: none !important;
        }

        .formkit-form[data-uid="7770c7b826"] .formkit-input:focus {
          outline: none !important;
          box-shadow: none !important;
          border-color: ${inputBorder} !important;
        }

        .formkit-form[data-uid="7770c7b826"] .formkit-input::placeholder {
          color: #888888 !important;
          opacity: 1 !important;
        }

        .formkit-form[data-uid="7770c7b826"] .formkit-submit {
          height: 48px !important;
          min-height: 48px !important;
          background-color: #E8392A !important;
          border: 2px solid #1A1A1A !important;
          border-radius: 0 !important;
          color: #FFFFFF !important;
          padding: 0 1.5rem !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.06em !important;
          font-family: 'Lato', sans-serif !important;
          font-size: 0.8125rem !important;
          cursor: pointer !important;
          transition: transform 0.15s ease, box-shadow 0.15s ease !important;
          box-shadow: 5px 5px 0 ${btnShadow} !important;
          white-space: nowrap !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        .formkit-form[data-uid="7770c7b826"] .formkit-submit:hover {
          transform: translate(-2px, -2px) !important;
          box-shadow: 7px 7px 0 ${btnShadow} !important;
        }

        .formkit-form[data-uid="7770c7b826"] .formkit-submit:active {
          transform: translate(4px, 4px) !important;
          box-shadow: none !important;
        }

        .formkit-form[data-uid="7770c7b826"] .formkit-spinner {
          display: none !important;
        }

        .formkit-form[data-uid="7770c7b826"] [data-element="errors"] {
          color: ${alertColor} !important;
          font-size: 0.8125rem !important;
          font-family: 'Lato', sans-serif !important;
          margin-bottom: 0.5rem !important;
          list-style: none !important;
          padding: 0 !important;
        }

        .formkit-form[data-uid="7770c7b826"] [data-element="guarantee"] {
          display: none !important;
        }

        .formkit-powered-by-convertkit-container {
          display: none !important;
        }
      `}</style>
      <div className={`w-full ${className}`}>
        <form
          action="https://app.kit.com/forms/9206634/subscriptions"
          className="seva-form formkit-form"
          method="post"
          data-sv-form="9206634"
          data-uid="7770c7b826"
          data-format="inline"
          data-version="5"
          data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Success! Now check your email to confirm your subscription.","redirect_url":""},"analytics":{"google":null,"fathom":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null,"googletagmanager":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":false},"recaptcha":{"enabled":false}},"version":"5"}'
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
                <span>Get Early Access</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
