import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="main">
        <div className="error-content-wrap text-center">
          <div className="error-code">404</div>
          <h1 className="error-message h3">Page not found</h1>
          <p className="message-manual">
            Maybe the URL is incorrect, or the page no longer exist.
          </p>
          <Link to="/" className="btn">
            Return to home page
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default NotFoundPage
