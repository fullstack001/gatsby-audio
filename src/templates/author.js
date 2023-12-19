import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import PostLoop from "../components/PostLoop"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import IconsMap from "../util/IconsMap"

const author = ({ data }) => {
  const author = data.authorsJson
  const posts = data.allMarkdownRemark.nodes
  const totalPosts = data.allMarkdownRemark.totalCount
  const UserIcon = IconsMap["user"]

  return (
    <Layout>
      <Seo title={author.name} />
      <div className="main">
        <div className="container">
          <div className="archive-cover">
            <div
              className={`archive-cover-inner cover-author flex ${
                author.coverImage !== null ? "has-image" : ""
              }`}
            >
              {author.coverImage && (
                <GatsbyImage
                  className="cover-image"
                  image={getImage(author.coverImage)}
                  alt={`${author.name} cover image`}
                />
              )}
              <div className="cover-content-wrapper flex">
                <div className="avatar-wrap">
                  {author.profilePicture !== null ? (
                    <GatsbyImage
                      image={getImage(author.profilePicture)}
                      alt={author.name}
                    />
                  ) : (
                    <div className="avatar no-image">
                      <UserIcon />
                    </div>
                  )}
                </div>
                <div className="author-info">
                  <h2 className="name h4">{author.name}</h2>
                  <div className="author-meta">
                    {author.location && (
                      <span className="author-location">{author.location}</span>
                    )}
                    <span className="post-count">
                      {` `}
                      {totalPosts > 1
                        ? `${totalPosts} posts`
                        : `${totalPosts} post`}
                    </span>
                  </div>

                  {author.description && (
                    <div className="bio">{author.description}</div>
                  )}
                  <div className="author-social">
                    {author.socialLinks &&
                      author.socialLinks.map((item, index) => (
                        <a
                          key={index}
                          href={item.url}
                          target="_blanK"
                          rel="noreferrer"
                        >
                          {(() => {
                            const Icon =
                              IconsMap[item.platform.toLowerCase()] ||
                              IconsMap["default"]
                            return <Icon />
                          })()}
                        </a>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PostLoop posts={posts} />
      </div>
    </Layout>
  )
}

export default author

export const query = graphql`
  query authorQuery($slug: String!) {
    authorsJson(fields: { slug: { eq: $slug } }) {
      ...AuthorQueryFragment
    }
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: {
        frontmatter: {
          published: { ne: false }
          author: { fields: { slug: { eq: $slug } } }
        }
      }
    ) {
      totalCount
      nodes {
        ...PostQueryFragment
      }
    }
  }
`
