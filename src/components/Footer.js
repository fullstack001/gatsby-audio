import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Logo from "./Logo"
import SocialLinks from "./SocialLinks"

const Footer = () => {
  const data = useStaticQuery(siteQuery)
  const { title, description, footerMenu } = data.site.siteMetadata

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">

          <div className="row">
            <div className="col-lg-5">
              <div className="footer-widget widget-about">
                <div className="widget-content">
                  <div className="footer-logo-wrap">
                    <Logo />
                  </div>
                  <div className="site-description">{description}</div>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="widget secondary-nav flex">
                {footerMenu.map((column, index) => (
                  <div className="nav-col" key={index}>
                    <h3 className="title h6">{column.title}</h3>
                    <nav>
                      <ul className="no-style-list">
                        {column.items.map((item, i) => (
                          <li className="nav-link" key={i}>
                            <Link to={item.url}>{item.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
        <div className="footer-bottom flex justify-space-between">
          {/* {{> social-links}}
                {{> copyright}} */}
          <SocialLinks />
          <div className="copyright">
            &copy; 2023 <Link to="/">Atstudios</Link> - All right Reserved
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

const siteQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        footerMenu {
          title
          items {
            name
            url
          }
        }
      }
    }
  }
`
