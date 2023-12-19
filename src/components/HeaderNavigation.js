import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import ThemeToggle from "./ThemeToggle"
import { ArrowDown } from "../icons"
import SearchButton from "./SearchButton"

// import ColorSchemeScript from "./ColorSchemeScript"

const HeaderNavigation = () => {
  const data = useStaticQuery(HeaderNavigationQuery)
  return (
    <>
      <nav
        className="header-nav"
        role="navigation"
        aria-label="Main navigation"
      >
        <ul className="header-nav-list no-style-list">
          {data.site.siteMetadata.headerMenu.map((menuItem, index) => (
            <li
              className={`nav-item${
                menuItem.subMenu !== null ? " submenu-parent" : ""
              }`}
              key={index}
            >
              <Link to={menuItem.url} activeClassName="nav-current">
                {menuItem.name}
                {menuItem.subMenu !== null && <ArrowDown />}
              </Link>
              {menuItem.subMenu !== null && (
                <>
                  <input
                    type="checkbox"
                    id={`submenu-parent-${menuItem.name}`}
                    className="submenu-parent-checkbox"
                  />
                  <label
                    htmlFor={`submenu-parent-${menuItem.name}`}
                    className="submenu-parent-label"
                  >
                    <ArrowDown />
                  </label>
                  <ul className="no-style-list">
                    {menuItem.subMenu.map((subMenuItem, index) => (
                      <li className="nav-item" key={index}>
                        <Link
                          to={subMenuItem.url}
                          activeClassName="nav-current"
                        >
                          {subMenuItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="icon-items-wrap flex">
        <SearchButton />
        <ThemeToggle />
      </div>
    </>
  )
}

export default HeaderNavigation

const HeaderNavigationQuery = graphql`
  query HeaderNavigation {
    site {
      siteMetadata {
        headerMenu {
          name
          url
          subMenu {
            name
            url
          }
        }
      }
    }
  }
`
