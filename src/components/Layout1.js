import React from "react"
import "../assets/scss/screen.scss"
import Header from "./Header"
import Footer from "./Footer"
import { graphql, useStaticQuery } from "gatsby"
import SearchPopup from "./SearchPopup"
import SearchPopupContext from "../util/searchPopupContext"

const Layout1 = ({ children }) => {
  const [popupVisible, setPopupVisible] = React.useState(false)
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          stickyNav
        }
      }
    }
  `)
  const { stickyNav } = site.siteMetadata
  return (
    <div className="site-wrap" data-nav={stickyNav ? "sticky" : ""}>
      <SearchPopupContext.Provider value={{ popupVisible, setPopupVisible }}>
        <Header />
        {children}
        <Footer />
        <SearchPopup />
      </SearchPopupContext.Provider>
    </div>
  )
}

export default Layout1
