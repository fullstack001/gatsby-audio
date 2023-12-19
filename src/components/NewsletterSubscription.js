import React, { useState } from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import { Close, CustomEnvelop } from "../icons"

const NewsletterSubscription = () => {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const result = await addToMailchimp(email, {
      FULLNAME: fullName,
    })
    setLoading(false)
    setResponse(result)
    setFullName("")
    setEmail("")
  }

  const closeNotification = () => {
    setResponse(null)
  }

  return (
    <section className="email-subs">
      <div className="container">
        <div className="email-subs-wrap text-center">
          <div className="icon">
            <CustomEnvelop />
          </div>
          <h2 className="h1 email-subs-section-title">
            Subscribe to newsletter
          </h2>
          <div className="email-subs-section-description">
            Stay up to date! Get all the latest posts delivered straight to your
            inbox.
          </div>
          <div className="form-wrap">
            <form
              onSubmit={e => handleSubmit(e)}
              className={`subscribe-form text-left${loading ? " loading" : ""}`}
              data-members-form="subscribe"
            >
              <div className="form-field-wrap field-group-inline">
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="name form-field input-field"
                  id="name"
                  placeholder="Your name"
                  required
                  autoComplete="off"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                />
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="email form-field input-field"
                  id="email"
                  placeholder="Your email address"
                  required
                  autoComplete="off"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <button className="btn form-field" type="submit">
                  <span>Subscribe</span>
                </button>
              </div>
              <div className="message-container">
                {response && (
                  <div
                    className={`notification visible form-notification ${response.result}`}
                  >
                    <div
                      className="notification-close"
                      aria-label="close notification"
                      onClick={closeNotification}
                      onKeyDown={closeNotification}
                      role="button"
                      tabIndex={-1}
                    >
                      <span className="close-icon">
                        <Close />
                      </span>
                    </div>
                    <strong>{`${response.result.toUpperCase()}: `}</strong>
                    {response.msg}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSubscription
