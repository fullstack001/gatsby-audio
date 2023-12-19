import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const PageContainer = props => {
  const { title, image } = props
  return (
    <div className="main">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <article className="single-post">
              {title && (
                <header className="post-header">
                  <h1 className="post-title">{title}</h1>
                </header>
              )}
              {image && (
                <div className="featured-image-wrap">
                  <GatsbyImage image={getImage(image)} alt={title} />
                </div>
              )}
              {props.children}
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageContainer
