import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const NextPost = ({ post }) => {
  return (
    <div className="post next-post">
      <Link to={post.fields.slug} className="flex">
        {post.frontmatter.featuredImage && (
          <div className="featured-image">
            <GatsbyImage
              image={getImage(post.frontmatter.featuredImage)}
              alt={post.frontmatter.title}
            />
          </div>
        )}
        <div className="content-wrap">
          <div className="nav-text">Newer article</div>
          <h4 className="title h5">{post.frontmatter.title}</h4>
          <div className="post-meta">
            <time className="post-date" dateTime="{post.frontmatter.data}">
              {post.frontmatter.dateFormatted}
            </time>
            <span className="read-time">{post.timeToRead} min read</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default NextPost
