import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import StarIcon from "../assets/svg-icons/star.svg"
import Tags from "./Tags"

const PostItem = props => {
  const { post } = props
  return (
    <article className="post-card flex">
      {post.frontmatter.featuredImage && (
        <Link to={post.fields.slug} className="post-img-wrap">
          <GatsbyImage
            image={getImage(post.frontmatter.featuredImage)}
            alt={post.frontmatter.title}
            style={{ height: "100%", position: "unset" }}
          />
        </Link>
      )}
      <div className="post-info-wrap">
        <div className="flex post-top-meta">
          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <Tags tags={[post.frontmatter.tags[0]]} />
          )}
          {post.frontmatter.featured && (
            <div
              className="featured-icon"
              aria-labelledby="Featured post icon"
              role="img"
            >
              <StarIcon />
            </div>
          )}
        </div>
        <h2 className="h3 post-title">
          <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
        </h2>
        <div className="post-excerpt">{post.excerpt}</div>
        <div className="post-meta">
          <time className="post-date" dateTime={post.frontmatter.date}>
            {post.frontmatter.dateFormatted}
          </time>
          <span className="read-time">{post.timeToRead} min read</span>
        </div>
      </div>
    </article>
  )
}

export default PostItem
