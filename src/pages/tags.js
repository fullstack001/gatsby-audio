import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const tags = ({ data }) => {
  // get tags array from allTagsJson query
  const tags = data.allTagsJson.nodes

  // get array of object from allMarkdownRemark group query which contains tag slug and post count
  const postGroup = data.allMarkdownRemark.group

  // Add post count to each tag object
  const tagsWithPostCount = tags.map(t => {
    const tag = postGroup.find(el => el.fieldValue === t.id)
    const count = typeof tag !== "undefined" ? tag.totalCount : 0
    return { ...t, postCount: count }
  })

  // sorting and reversing the tags array based on post count
  tagsWithPostCount
    .sort((a, b) => {
      return a.postCount - b.postCount
    })
    .reverse()
  return (
    <Layout>
      <Seo title="Tags" description="Tags archive" />
      <div className="main">
        <div className="container">
          <div className="centered-page-header text-center">
            <h1 className="title">Tags</h1>
            {/* <div className="description">
              add description here
            </div> */}
          </div>
          <div className="row">
            {tagsWithPostCount
              .filter(tag => tag.postCount > 0)
              .map((tag, index) => (
                <div
                  className="col-xl-4 col-lg-6 col-md-6 tag-card-wrap"
                  key={index}
                >
                  <Link to={`/tag${tag.fields.slug}`} className="tag-card flex">
                    <div className="tag-info-wrap">
                      <h2 className="tag-name h5">{tag.name}</h2>
                      <div className="post-count">
                        {tag.postCount}
                        {` `}
                        {tag.postCount > 1 ? "posts" : "post"}
                      </div>
                    </div>
                    {tag.coverImage !== null && (
                      <div className="tag-image-wrap">
                        <GatsbyImage
                          image={getImage(tag.coverImage)}
                          alt={tag.name}
                        />
                      </div>
                    )}
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default tags

export const query = graphql`
  query {
    allTagsJson {
      nodes {
        id
        fields {
          slug
        }
        name
        coverImage {
          childImageSharp {
            gatsbyImageData(
              width: 100
              placeholder: BLURRED
              formats: [AUTO, WEBP]
              transformOptions: { fit: COVER }
              aspectRatio: 1
            )
          }
        }
      }
    }
    allMarkdownRemark(filter: { frontmatter: { published: { ne: false } } }) {
      group(field: frontmatter___tags___id) {
        fieldValue
        totalCount
      }
    }
  }
`
