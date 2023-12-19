import React from "react"
import SunIcon from "../assets/svg-icons/sun.svg"
import MoonIcon from "../assets/svg-icons/moon.svg"

const ThemeToggle = () => {
  const handleThemeChange = e => {
    if (window.__theme === "dark") {
      window.__setPreferredTheme("light")
    } else {
      window.__setPreferredTheme("dark")
    }
  }

  return (
    <button className="nav-icon theme-icon flex btn-no-style">
      <input
        type="checkbox"
        name="theme-toggle-icon"
        id="theme-toggle-icon"
        onChange={handleThemeChange}
        style={{ display: "none" }}
      />
      <label htmlFor="theme-toggle-icon" className="toggle-mode flex">
        <span className="light">
          <SunIcon />
        </span>
        <span className="dark">
          <MoonIcon />
        </span>
      </label>
    </button>
  )
}

export default ThemeToggle
