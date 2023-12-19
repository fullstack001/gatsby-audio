import { graphql } from "gatsby"
export const AuthorQueryFragment = graphql`
  fragment AuthorQueryFragment on AuthorsJson {
    id
    fields {
      slug
    }
    name
    email
    description
    profilePicture {
      childImageSharp {
        gatsbyImageData(
          width: 150
          placeholder: BLURRED
          formats: [AUTO, WEBP]
          transformOptions: { fit: COVER }
          aspectRatio: 1
        )
      }
    }
    coverImage {
      childImageSharp {
        gatsbyImageData(
          width: 1200
          placeholder: BLURRED
          formats: [AUTO, WEBP]
          transformOptions: { fit: COVER }
          aspectRatio: 1
        )
      }
    }
    location
    socialLinks {
      platform
      url
    }
  }
`
