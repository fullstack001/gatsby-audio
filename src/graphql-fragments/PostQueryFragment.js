import { graphql } from "gatsby"
export const PostQueryFragment = graphql`
  fragment PostQueryFragment on MarkdownRemark {
    id
    html
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
        ...TagQueryFragment
      }
      featured
    }
    excerpt(pruneLength: 200)
  }
`
