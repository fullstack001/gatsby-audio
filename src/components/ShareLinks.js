import React, { useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import {
  Facebook,
  Twitter,
  Pinterest,
  Whatsapp,
  Linkedin,
  Envelope,
  Chain,
} from "../icons"

const ShareLinks = ({ url, title }) => {
  // URL encode the title
  title = encodeURIComponent(title)

  // Handling link copy
  const [isCopied, setIsCopied] = useState(false)
  const onCopyText = () => {
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 10000)
  }

  // function to open share window
  const openShareWindow = function (e) {
    e.preventDefault()
    const { href, title } = e.currentTarget
    window.open(href, title, "width=700,height=400")
  }

  return (
    <div className="share-wrap">
      <div className="share-title h5 text-center">Share this article:</div>
      <div className="share-links flex">
        <a
          className="facebook"
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          title="Share on Facebook"
          onClick={openShareWindow}
        >
          <Facebook />
        </a>
        <a
          className="twitter"
          href={`https://twitter.com/share?text=${title}&amp;url=${url}`}
          onClick={openShareWindow}
          title="Share on Twitter"
        >
          <Twitter />
        </a>
        {/* pinterest */}
        <a
          className="pinterest"
          href={`http://pinterest.com/pin/create/button/?url=${url}description=${title}`}
          onClick={openShareWindow}
          title="Share on Pinterest"
        >
          <Pinterest />
        </a>
        {/* whatsapp */}
        <a
          className="whatsapp"
          href={`whatsapp://send?text=${url}}`}
          data-action="share/whatsapp/share"
          onClick={openShareWindow}
          title="Share on Whatsapp"
        >
          <Whatsapp />
        </a>
        {/* linkedin */}
        <a
          className="linkedin"
          href={`http://www.linkedin.com/shareArticle?mini=true&amp;url=${url}&amp;title=${title}`}
          onClick={openShareWindow}
          title="Share on Linkedin"
        >
          <Linkedin />
        </a>
        {/* email */}
        <a
          href={`mailto:?subject=${title}&amp;body=${url}`}
          title="Send via email"
          target="_blank"
          rel="noreferrer"
        >
          <Envelope />
        </a>
        {/* permalink */}
        <CopyToClipboard text={url} onCopy={onCopyText}>
          <button className="link js-copy-link">
            <Chain />
          </button>
        </CopyToClipboard>
      </div>
      <div
        className={`js-notification-copy-link text-center ${
          isCopied ? "visible" : ""
        }`}
      >
        <span>The link has been Copied to clipboard!</span>
      </div>
    </div>
  )
}

export default ShareLinks
