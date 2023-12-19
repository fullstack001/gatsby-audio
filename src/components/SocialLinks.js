import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import IconsMap from "../util/IconsMap"

const SocialLinks = () => {
  const data = useStaticQuery(socialQuery)
  const social = data.site.siteMetadata.social

  return (
    <div className="social-links-wrap flex">
      <span className="title">Follow:</span>
      <div className="social-links flex">
        {social.map((item, index) => (
          <a href={item.url} aria-label="twitter link" key={index}>
            {(() => {
              const Icon =
                IconsMap[item.name.toLowerCase()] || IconsMap["Default"]
              return <Icon />
            })()}
          </a>
        ))}
      </div>
    </div>
  )
}

export default SocialLinks

const socialQuery = graphql`
  query SocialLinks {
    site {
      siteMetadata {
        social {
          name
          url
        }
      }
    }
  }
`
