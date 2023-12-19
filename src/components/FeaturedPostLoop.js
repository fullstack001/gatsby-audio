import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import PostItem from "./PostItem"

const FeaturedPostLoop = ({ posts }) => {
  const data = useStaticQuery(graphql`
    query featuredCountQuery {
      site {
        siteMetadata {
          featuredPostCount
        }
      }
    }
  `)

  const { featuredPostCount } = data.site.siteMetadata

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-10 offset-lg-1 js-post-list-wrap">
          <h2 className="h4 section-title">
            <span>Featured posts</span>
          </h2>
          {posts.map(
            (post, index) =>
              index < featuredPostCount && <PostItem post={post} key={index} />
          )}
        </div>
      </div>
    </div>
  )
}

export default FeaturedPostLoop
