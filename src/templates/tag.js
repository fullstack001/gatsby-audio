import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import PostLoop from "../components/PostLoop"
import Seo from "../components/Seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const tag = ({ data }) => {
  const tag = data.tagsJson
  const posts = data.allMarkdownRemark.nodes
  const totalPosts = data.allMarkdownRemark.totalCount
  return (
    <Layout>
      <Seo title={tag.name} description={tag.description} />
      <div className="main">
        <div className="container">
          <div className="archive-cover">
            <div
              className={`archive-cover-inner cover-tag flex${
                tag.coverImage !== null ? " has-image" : ""
              }`}
            >
              {tag.coverImage && (
                <GatsbyImage
                  className="cover-image"
                  image={getImage(tag.coverImage)}
                  alt={tag.name}
                />
              )}
              <div className="cover-content-wrapper">
                <div className="tag-info-wrap text-center">
                  <h1 className="tag-name h2">{tag.name}</h1>
                  <div className="archive-info">
                    <span className="post-count">
                      {totalPosts > 1
                        ? `${totalPosts} posts`
                        : `${totalPosts} post`}
                    </span>
                  </div>
                  <div className="tag-description">{tag.description}</div>
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

export default tag

export const query = graphql`
  query tagQuery($slug: String!) {
    tagsJson(fields: { slug: { eq: $slug } }) {
      color
      name
      description
      coverImage {
        childImageSharp {
          gatsbyImageData(
            width: 1200
            placeholder: BLURRED
            formats: [AUTO, WEBP]
            transformOptions: { fit: COVER }
          )
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: {
        frontmatter: {
          tags: { elemMatch: { fields: { slug: { eq: $slug } } } }
          published: { ne: false }
        }
      }
    ) {
      totalCount
      nodes {
        id
        timeToRead
        fields {
          slug
        }
        frontmatter {
          title
          date
          dateFormatted: date(formatString: "MMMM DD, YYYY")
          featuredImage {
            childImageSharp {
              gatsbyImageData(
                width: 340
                placeholder: BLURRED
                formats: [AUTO, WEBP]
                transformOptions: { fit: COVER }
              )
            }
          }
          description
          tags {
            fields {
              slug
            }
            color
            name
            description
          }
          featured
        }
        excerpt(pruneLength: 200)
      }
    }
  }
`
