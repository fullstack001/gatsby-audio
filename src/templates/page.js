import React from "react"
import { graphql } from "gatsby"
import { getSrc } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import PageContainer from "../components/PageContainer"
import Seo from "../components/Seo"

const contact = ({ data }) => {
  const { page } = data
  const { title, featuredImage, seoImage } = page.frontmatter
  const { description, excerpt } = page

  return (
    <Layout>
      <Seo
        title={title}
        description={description || excerpt}
        image={getSrc(seoImage)}
      />
      <PageContainer title={title} image={featuredImage}>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: page.html }}
        />
      </PageContainer>
    </Layout>
  )
}

export default contact

export const query = graphql`
  query PageQuery($slug: String!) {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      frontmatter {
        title
        date
        dateFormatted: date(formatString: "MMMM DD, YYYY")
        featuredImage {
          childImageSharp {
            gatsbyImageData(
              width: 1000
              placeholder: BLURRED
              formats: [AUTO, WEBP]
              transformOptions: { fit: COVER }
            )
          }
        }
        seoImage: featuredImage {
          childImageSharp {
            gatsbyImageData(layout: FIXED, height: 600, width: 1200)
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
      excerpt(pruneLength: 150)
    }
  }
`
