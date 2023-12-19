import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { User } from "../icons"

const authors = ({ data }) => {
  // get authors array from allAuthorsJson query
  const authors = data.allAuthorsJson.nodes

  // get array of object from allMarkdownRemark group query which contains author slug and post count
  const postGroup = data.allMarkdownRemark.group

  // Add post count to each author object
  const AuthorsWithPostCount = authors.map(a => {
    const author = postGroup.find(el => el.fieldValue === a.id)
    const count = typeof author !== "undefined" ? author.totalCount : 0
    return { ...a, postCount: count }
  })

  // sorting and reversing the tags array based on post count
  AuthorsWithPostCount.sort((a, b) => {
    return a.postCount - b.postCount
  }).reverse()

  return (
    <Layout>
      <Seo title="Authors" />
      <div className="main">
        <div className="container">
          <div className="centered-page-header text-center">
            <h1 className="title">Authors</h1>
            {/* <div className="description">
                add description here
            </div> */}
          </div>
          <div className="row">
            {AuthorsWithPostCount.filter(author => author.postCount > 0).map(
              (author, index) => (
                <div
                  className="col-xl-4 col-lg-6 col-md-6 author-card-wrap"
                  key={index}
                >
                  <Link
                    to={`/author${author.fields.slug}`}
                    className="author-card"
                  >
                    <div className="avatar-wrap">
                      {author.profilePicture !== null ? (
                        <GatsbyImage
                          image={getImage(author.profilePicture)}
                          alt={author.name}
                        />
                      ) : (
                        <div className="avatar no-image">
                          <User />
                        </div>
                      )}
                    </div>
                    <div className="author-info">
                      <h2 className="name h5">{author.name}</h2>
                      <div className="author-meta">
                        {author.location && (
                          <span className="author-location">
                            {author.location}
                          </span>
                        )}
                        <span className="post-count">
                          {` `}
                          {author.postCount}
                          {` `}
                          {author.postCount > 1 ? "posts" : "post"}
                        </span>
                      </div>
                      {author.description && (
                        <div className="bio">{author.description}</div>
                      )}
                    </div>
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default authors

export const pageQuery = graphql`
  query AuthorsQuery {
    allAuthorsJson {
      nodes {
        ...AuthorQueryFragment
      }
    }
    allMarkdownRemark(filter: { frontmatter: { published: { ne: false } } }) {
      group(field: frontmatter___author___id) {
        fieldValue
        totalCount
      }
    }
  }
`
