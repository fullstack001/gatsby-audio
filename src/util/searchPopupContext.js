import { createContext } from "react"

const SearchPopupContext = createContext({
  popupVisible: false,
  setPopupVisible: () => {},
})

export default SearchPopupContext
