import { graphql } from "gatsby"
export const PrevNextPostFragment = graphql`
  fragment PrevNextPostFragment on MarkdownRemark {
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
            width: 120
            placeholder: BLURRED
            formats: [AUTO, WEBP]
            transformOptions: { fit: COVER }
            aspectRatio: 1
          )
        }
      }
    }
  }
`
