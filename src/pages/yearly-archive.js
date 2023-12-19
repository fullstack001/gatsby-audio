import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

const MonthlyArchive = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout>
      <Seo title="Yearly Archive" />
      <div className="main">
        <div className="container">
          <div className="centered-page-header text-center">
            <h1 className="title">Yearly Archive</h1>
            {/* <div className="description">
                    Use this if you want to show small description
                </div> */}
          </div>
          <div className="archive-wrap">
            {posts.map((post, index) => (
              <div
                className={`archive-post-card py-${post.frontmatter.dateYear}`}
                key={index}
              >
                <div className="py">{post.frontmatter.dateYear}</div>
                <article className="archive-post">
                  <div className="inner">
                    <time
                      className="post-date"
                      dateTime={post.frontmatter.date}
                    >
                      {post.frontmatter.dateMonthDay} -
                    </time>
                    <h2 className="title">
                      <Link to={post.fields.slug}>
                        {post.frontmatter.title}
                      </Link>
                    </h2>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MonthlyArchive

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: {
        frontmatter: { published: { ne: false } }
        fileAbsolutePath: { regex: "/content/posts/" }
      }
    ) {
      nodes {
        ...PostQueryFragment
        frontmatter {
          dateYear: date(formatString: "YYYY")
          dateMonthDay: date(formatString: "MMM DD")
          dateMonth: date(formatString: "M")
        }
      }
    }
  }
`
