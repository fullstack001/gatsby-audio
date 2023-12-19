import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const PopularTags = () => {
  const data = useStaticQuery(query)

  // get tags array from allTagsJson query
  const tags = data.allTagsJson.nodes

  // get array of object from allMarkdownRemark group query which contains tag slug and post count
  const postGroup = data.allMarkdownRemark.group

  // Add post count to each tag object
  const tagsWithPostCount = tags.map(t => {
    const tag = postGroup.find(el => el.fieldValue === t.fields.slug)
    const count = typeof tag !== "undefined" ? tag.totalCount : 0
    return { ...t, postCount: count }
  })

  // sorting and reversing the tags array based on post count
  const sortedTags = tagsWithPostCount
    .sort((a, b) => {
      return a.postCount - b.postCount
    })
    .reverse()
  return (
    <div className="suggested-tags tag-wrap" id="suggested-tags">
      <h2 className="h6">See posts by Popular tags</h2>
      <div className="tag-list">
        {sortedTags
          .filter(tag => tag.postCount > 0)
          .map((tag, index) => (
            <Link
              to={`/tag${tag.fields.slug}`}
              style={{
                backgroundColor:
                  tag.color !== "" || tag.color !== null
                    ? tag.color
                    : "inherit",
              }}
              key={index}
            >
              {tag.name}
            </Link>
          ))}
      </div>
    </div>
  )
}

export default PopularTags

const query = graphql`
  query {
    allTagsJson {
      nodes {
        fields {
          slug
        }
        name
        color
      }
    }
    allMarkdownRemark(filter: { frontmatter: { published: { ne: false } } }) {
      group(field: frontmatter___tags___fields___slug) {
        fieldValue
        totalCount
      }
    }
  }
`
