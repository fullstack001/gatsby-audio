const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// creating slug field
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  // post slug
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
  // tag slug
  if (node.internal.type === `TagsJson`) {
    const slug = createFilePath({ node, getNode, basePath: `tags` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
  // author slug
  if (node.internal.type === `AuthorsJson`) {
    const slug = createFilePath({ node, getNode, basePath: `authors` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

// schema customization
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions
  const typeDefs = [
    // modifying tag in markdown frontmatter to include extra data from tag json data
    `type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }`,
    `type Frontmatter {
      tags: [TagsJson] @link(by: "name")
    }`,
    `type TagsJson implements Node {
      posts: [MarkdownRemark]! @link(by: "frontmatter.tags.name", from: "name")
    }`,
    // set featuredImage field to a file path / this solves error when the field value is empty string
    `type Frontmatter {
      featuredImage: File @fileByRelativePath
    }`,
    // modifying author frontmatter
    `type Frontmatter {
      author: AuthorsJson @link(by: "name")
    }`,
    `type AuthorsJson implements Node {
      posts: [MarkdownRemark] @link(by: "frontmatter.author.name", from: "name")
    }`,
    `type AuthorsJson {
      coverImage: File @fileByRelativePath
    }`,
    `type TagsJson {
      coverImage: File @fileByRelativePath
    }`,

    // add a related fields for related posts
    schema.buildObjectType({
      name: "MarkdownRemark",
      fields: {
        related: {
          type: "[MarkdownRemark]",
          resolve: async (source, args, context, info) => {
            const tags = source.frontmatter.tags
            // if (!tags.length) return []
            const { entries } = await context.nodeModel.findAll({
              query: {
                filter: {
                  frontmatter: { tags: { elemMatch: { name: { in: tags } } } },
                  id: { ne: source.id },
                  fileAbsolutePath: { regex: "/content/posts/" },
                },
              },
              type: "MarkdownRemark",
            })

            const posts = Array.from(entries)
            return posts && posts.length ? posts : []
          },
        },
      },
    }),

    // Defining SubMenu type scheme
    schema.buildObjectType({
      name: "SubMenu",
      fields: {
        name: "String!",
        url: "String!",
      },
    }),

    // Attaching SubMenu field to Header Menu and return empty array if null
    schema.buildObjectType({
      name: "SiteSiteMetadataHeaderMenu",
      fields: {
        subMenu: {
          type: "[SubMenu!]",
        },
      },
    }),
  ]
  createTypes(typeDefs)
}

// creating single pages(post/page/tag) dynamically from markdown and other data

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      posts: allMarkdownRemark(
        filter: {
          frontmatter: { published: { ne: false } }
          fileAbsolutePath: { regex: "/content/posts/" }
        }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
      pages: allMarkdownRemark(
        filter: {
          frontmatter: { published: { ne: false } }
          fileAbsolutePath: { regex: "/content/pages/" }
        }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
      tags: allTagsJson {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
      authors: allAuthorsJson {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const postTemplate = path.resolve(`./src/templates/post.js`)
  const pageTemplate = path.resolve(`./src/templates/page.js`)
  const tagTemplate = path.resolve(`./src/templates/tag.js`)
  const authorTemplate = path.resolve(`./src/templates/author.js`)

  // extract post data from query
  const posts = result.data.posts.edges
  // create post pages
  posts.forEach(({ node }, index) => {
    const slug = node.fields.slug
    createPage({
      path: slug,
      component: postTemplate,
      context: {
        slug: slug,
        next: index === 0 ? null : posts[index - 1].node.fields.slug,
        prev:
          index === posts.length - 1 ? null : posts[index + 1].node.fields.slug,
      },
    })
  })

  // extract post data from query
  const pages = result.data.pages.edges
  // create pages from markdown files located in "content/pages" folder
  pages.forEach(({ node }) => {
    const slug = node.fields.slug
    createPage({
      path: slug,
      component: pageTemplate,
      context: {
        slug: slug,
      },
    })
  })

  // Extract tag data from query
  const tags = result.data.tags.edges
  // create tag pages
  tags.forEach(({ node }) => {
    createPage({
      path: `/tag${node.fields.slug}`,
      component: tagTemplate,
      context: {
        slug: node.fields.slug,
      },
    })
  })

  // Extract author data from query
  const authors = result.data.authors.edges
  // create author pages
  authors.forEach(({ node }) => {
    createPage({
      path: `/author${node.fields.slug}`,
      component: authorTemplate,
      context: {
        slug: node.fields.slug,
      },
    })
  })

  // Extract alafacy data from query
  const alafasys = result.data.alafasys.edges
  // create alafacy pages
  alafasys.forEach(({ node }) => {
    createPage({
      path: `/alafasy${node.fields.slug}`,
      component: authorTemplate,
      context: {
        slug: node.fields.slug,
      },
    })
  })
}



//create route of alafasy
// exports.createPages = async function ({ actions, graphql }) {
//   const { data } = await graphql(`
//     query {
//       allMarkdownRemark {
//         nodes {
//           fields {
//             slug
//           }
//         }
//       }
//     }
//   `)
//   data.allMarkdownRemark.nodes.forEach(node => {
//     const slug = node.fields.slug
//     actions.createPage({
//       path: slug,
//       component: require.resolve(`./src/templates/blog-post.js`),
//       context: { slug: slug },
//     })
//   })
// }
