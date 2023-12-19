import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import PostItem from "./PostItem"

const PostLoop = ({ posts, sectionTitle }) => {
  const data = useStaticQuery(graphql`
    query PostPerPageQuery {
      site {
        siteMetadata {
          postPerPage
        }
      }
    }
  `)
  const { postPerPage } = data.site.siteMetadata

  // state to check is load more button is clicked and posts currently being added to page
  const [isLoading, setIsLoading] = useState(false)

  // state to keep track currently visible posts
  const [visiblePosts, setVisiblePosts] = useState([
    ...posts.slice(0, postPerPage),
  ])

  // state is there more posts to load
  const [hasMore, setHasMore] = useState(posts.length > postPerPage)

  // handle load more button click
  const handleLoadMore = () => {
    setIsLoading(true)
  }

  // add next group of posts to visible post list
  useEffect(() => {
    if (isLoading && hasMore) {
      const isMore = posts.length > visiblePosts.length
      const nextPagePosts = isMore
        ? [
            ...posts.slice(
              visiblePosts.length,
              visiblePosts.length + postPerPage
            ),
          ]
        : []
      setVisiblePosts([...visiblePosts, ...nextPagePosts])
      setIsLoading(false)
    }
  }, [isLoading, hasMore, posts, visiblePosts, postPerPage])

  // check is there is more posts to load after post loading
  useEffect(() => {
    const isMore = visiblePosts.length < posts.length
    setHasMore(isMore)
  }, [visiblePosts, posts])

  // get the featured image

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-10 offset-lg-1 js-post-list-wrap">
          {sectionTitle && (
            <h2 className="h4 section-title">
              <span>{sectionTitle}</span>
            </h2>
          )}
          {visiblePosts.map((post, index) => (
            <PostItem post={post} key={index} />
          ))}
        </div>
      </div>
      {hasMore && (
        <div className="row">
          <div className="col">
            <div className="pagination-wrap text-center" id="pagination-wrap">
              <button
                className={`btn ${isLoading ? "loading" : ""}`}
                disabled={isLoading}
                onClick={handleLoadMore}
              >
                <span>Show more posts</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostLoop
