import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
const Logo = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          logoLight
          logoDark
        }
      }
    }
  `)

  const { title, logoLight, logoDark } = data.site.siteMetadata

  return (
    <>
      {logoLight !== null && logoDark !== null ? (
        <>
          <Link to="/" className="logo-img theme-light-logo">
            <img src={logoLight} alt={title} />
          </Link>
          <Link to="/" className="logo-img theme-dark-logo">
            <img src={logoDark} alt={title} />
          </Link>
        </>
      ) : (
        <Link to="/" className="logo-text">
          {title}
        </Link>
      )}
    </>
  )
}

export default Logo
