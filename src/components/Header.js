import React from "react"
import HeaderNavigation from "./HeaderNavigation"
import Logo from "./Logo"

const Header = () => {
  return (
    <header className="site-header">
      <div className="container header-inner justify-space-between">
        {/* logo start */}
        <div className="header-logo flex">
          <Logo />
        </div>
        {/* logo end */}

        <input
          id="mobile-menu-toggle"
          className="mobile-menu-checkbox"
          type="checkbox"
        />
        <label
          htmlFor="mobile-menu-toggle"
          className="mobile-menu-icon"
          aria-label="menu toggle button"
        >
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
          <span className="sr-only">Menu toggle button</span>
        </label>
        <div
          className="header-right flex"
          data-theme-icon="{{@custom.show_theme_mode_switcher_icon}}"
        >
          <HeaderNavigation />
        </div>
        {/* navbar end */}
      </div>
    </header>
  )
}

export default Header
