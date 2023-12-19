// Load config data
const websiteConfig = require("./src/config/website")
const headerMenu = require("./src/config/headerMenu")
const footerMenu = require("./src/config/footerMenu")
const socialLinks = require("./src/config/socialLinks")

// empty path prefix if it is only a slash
const pathPrefix =
  websiteConfig.pathPrefix === "/" ? "" : websiteConfig.pathPrefix

module.exports = {
  pathPrefix: pathPrefix,
  siteMetadata: {
    // adding configs to siteMetadata
    ...websiteConfig,
    ...headerMenu,
    ...footerMenu,
    ...socialLinks,
  },

  // plugins
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-react-helmet",
    {
      resolve: 'gatsby-remark-audio',
      options: {
        preload: 'auto',
        loop: false,
        controls: true,
        muted: false,
        autoplay: false
      }
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Work Sans\:0,500;0,600;1,400`],
        display: "swap",
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /svg-icons/,
        },
      },
    },
    "gatsby-plugin-sitemap",
    // posts
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: "./content/posts/",
      },
    },
    //pages
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./content/pages/",
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // max width of the post content container 700px
              maxWidth: 700,
              showCaptions: ["title", "alt"],
            },
          },
          // responsive iframe
          `gatsby-remark-responsive-iframe`,
          // prism highlight
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    // for twitter embed. https://www.gatsbyjs.com/plugins/gatsby-plugin-twitter/
    `gatsby-plugin-twitter`,
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/assets/images/icon.png",
      },
    },

    // transform json files for tags and authors
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./content/`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,

    // mailchimp
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint: websiteConfig.mailchimpEndpoint, // string; add your MC list endpoint here; see instructions below
        timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      },
    },
    // search
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "pages",
        engine: "flexsearch",
        query: `
          {
            allMarkdownRemark(
              filter: {
                frontmatter: { published: { ne: false } }
                fileAbsolutePath: { regex: "/content/posts/" }
              }
            ) {
              nodes {
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  date
                  dateFormatted: date(formatString: "MMMM DD, YYYY")
                }
                rawMarkdownBody
              }
            }
          }
        `,
        ref: "id",
        index: ["title", "body"],
        store: ["id", "slug", "title", "dateFormatted", "date"],
        normalizer: ({ data }) =>
          data.allMarkdownRemark.nodes.map(node => ({
            id: node.id,
            slug: node.fields.slug,
            title: node.frontmatter.title,
            date: node.frontmatter.dateFormatted,
            body: node.rawMarkdownBody,
          })),
      },
    },

    // disqus comment
    {
      resolve: "gatsby-plugin-disqus",
      options: {
        shortname: websiteConfig.disqusShortName,
      },
    },

    // google analytics
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "your-traking-id",
      },
    },
  ],
}
