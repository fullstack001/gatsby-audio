import { graphql } from "gatsby"
export const TagQueryFragment = graphql`
  fragment TagQueryFragment on TagsJson {
    fields {
      slug
    }
    color
    name
    description
  }
`
