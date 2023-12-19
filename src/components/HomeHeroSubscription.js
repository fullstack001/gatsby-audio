import React, { useState } from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import { Close } from "../icons"

const HomeHeroSubscription = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const result = await addToMailchimp(email)
    setLoading(false)
    setResponse(result)
    setEmail("")
  }

  const closeNotification = () => {
    setResponse(null)
  }

  return (
    <form
      className={`members-form cover-subscribe-form text-left${
        loading ? " loading" : ""
      }`}
      data-members-form="subscribe"
      onSubmit={e => handleSubmit(e)}
    >
      <div className="form-field-wrap field-group-inline">
        <label htmlFor="header-form-email" className="sr-only">
          Email
        </label>
        <input
          type="email"
          name="email"
          className="email form-field input-field"
          id="header-form-email"
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
  )
}

export default HomeHeroSubscription
