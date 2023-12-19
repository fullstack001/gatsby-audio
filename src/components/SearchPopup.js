import React, { useState, useContext, useEffect, useRef } from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { useFlexSearch } from "react-use-flexsearch"
import SearchPopupContext from "../util/searchPopupContext"
import { Close } from "../icons"
import PopularTags from "./PopularTags"

const SearchPopup = ({ popupRef }) => {
  const { popupVisible, setPopupVisible } = useContext(SearchPopupContext)
  const inputRef = useRef(null)

  const handleToggle = () => {
    setPopupVisible(!popupVisible)
    if (popupVisible === true) {
      setSearchTerm(null)
      inputRef.current.value = null
    } else {
      window.setTimeout(function () {
        inputRef.current && inputRef.current.focus()
      }, 200)
    }
  }

  // Keydown handler which closes search popup on "Escape" key press
  const handleKeyDown = event => {
    event.key === "Escape" && handleToggle()
  }
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  })

  // query and search
  const postData = useStaticQuery(graphql`
    query {
      localSearchPages {
        index
        store
      }
    }
  `)
  const { index, store } = postData.localSearchPages
  const [searchTerm, setSearchTerm] = useState(null)
  const handleInputValue = event => {
    setSearchTerm(event.target.value)
  }
  const results = useFlexSearch(searchTerm, index, store)

  return (
    <div
      className={`search-popup js-search-popup${popupVisible && " visible"}`}
      role="dialog"
    >
      <div className="search-popup-bg"></div>
      <button
        className="close-button btn-no-style"
        id="search-close"
        aria-label="Close search"
        onClick={handleToggle}
      >
        <Close />
      </button>
      <div className="popup-inner">
        <div className="inner-container">
          <form
            className="search-form"
            id="search-form"
            onSubmit={e => e.preventDefault()}
          >
            <div className="search-form-box flex">
              <input
                type="text"
                className="search-input"
                placeholder="Type to search"
                id="search-input"
                aria-label="Type to search"
                role="searchbox"
                ref={inputRef}
                onKeyUp={handleInputValue}
              />
            </div>
          </form>
          <div className="search-close-note">Press ESC to close.</div>
          {results.length > 0 ? (
            <div className="search-result" id="search-results">
              {results.map((post, index) => (
                <div className="search-results-item" key={index}>
                  <Link to={post.slug}>
                    <div className="content">
                      <h3 className="title h5">
                        <span>{post.title}</span>
                      </h3>
                      <div className="meta">
                        <time>{post.date}</time>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <PopularTags />
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchPopup
