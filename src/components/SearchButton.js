import React, { useContext } from "react"
// import SearchPopup from "./SearchPopup"
import { Search } from "../icons"
import SearchPopupContext from "../util/searchPopupContext"

const SearchButton = () => {
  const { popupVisible, setPopupVisible } = useContext(SearchPopupContext)
  const handleToggle = () => {
    setPopupVisible(!popupVisible)
  }
  return (
    <>
      <button
        className="nav-icon search-icon flex btn-no-style"
        aria-label="Open search"
        onClick={handleToggle}
      >
        <span>
          <Search />
        </span>
      </button>
    </>
  )
}

export default SearchButton
