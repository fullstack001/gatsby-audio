import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image"
import { Disqus } from "gatsby-plugin-disqus"
import Layout from "../components/Layout"
import Tags from "../components/Tags"
import PrevNextPosts from "../components/PrevNextPosts"
import Seo from "../components/Seo"
import User from "../assets/svg-icons/user.svg"
import author from "./author"
import RelatedPosts from "../components/RelatedPosts"
import ShareLinks from "../components/ShareLinks"
import AuthorInfoCard from "../components/AuthorInfoCard"

const post = ({ data, location }) => {
  const { post, site } = data

  const disqusConfig = {
    config: {
      url: post.fields.slug,
      identifier: post.id,
      title: post.frontmatter.title,
      language: site.siteMetadata.siteLanguage,
    },
  }
  return (
    <Layout>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={getSrc(post.frontmatter.seoImage)}
        author={post.frontmatter.author}
        date={post.frontmatter.date}
      />
      <div className="main">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <article className="single-post">
                <header className="post-header">
                  <h1 className="post-title">{post.frontmatter.title}</h1>
                  <div className="post-meta flex">
                    <div className="author-list flex">
                      <Link
                        className="author-image"
                        to={`/author${post.frontmatter.author.fields.slug}`}
                        aria-label={post.frontmatter.author.name}
                      >
                        {post.frontmatter.author.profilePicture !== null ? (
                          <GatsbyImage
                            image={getImage(
                              post.frontmatter.author.profilePicture
                            )}
                            alt={author.name}
                          />
                        ) : (
                          <User />
                        )}
                      </Link>
                      <Link
                        to={`/author${post.frontmatter.author.fields.slug}`}
                        className="author-name"
                      >
                        {post.frontmatter.author.name}
                      </Link>
                      &nbsp;
                    </div>
                    <time
                      className="post-date"
                      dateTime={post.frontmatter.date}
                    >
                      {post.frontmatter.dateFormatted}
                    </time>
                    <span className="read-time">
                      {post.timeToRead} min read
                    </span>
                  </div>
                </header>
                {post.frontmatter.featuredImage && (
                  <div className="featured-image-wrap">
                    <GatsbyImage
                      image={getImage(post.frontmatter.featuredImage)}
                      alt={post.frontmatter.title}
                    />
                  </div>
                )}
                <div
                  className="post-content"
                  dangerouslySetInnerHTML={{ __html: post.html }}
                />
                <div className="post-footer">
                  <div className="tag-wrap">
                    {post.frontmatter.tags && (
                      <Tags tags={post.frontmatter.tags} />
                    )}
                  </div>
                  <ShareLinks
                    url={location.href}
                    title={post.frontmatter.title}
                  />
                  <AuthorInfoCard author={post.frontmatter.author} />
                </div>
              </article>
              <PrevNextPosts prev={data.prev} next={data.next} />
              <div className="comment-wrap">
                <div className="comment-container">
                  <Disqus config={disqusConfig} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RelatedPosts posts={post.related} count={4} />
    </Layout>
  )
}

export default post

export const query = graphql`
  query BlogQuery($slug: String!, $prev: String, $next: String) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
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
          ...TagQueryFragment
        }
        author {
          ...AuthorQueryFragment
        }
        featured
      }
      excerpt(pruneLength: 150)
      related {
        id
        timeToRead
        fields {
          slug
        }
        frontmatter {
          published
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
                aspectRatio: 1.75
              )
            }
          }
        }
      }
    }
    prev: markdownRemark(fields: { slug: { eq: $prev } }) {
      ...PrevNextPostFragment
    }
    next: markdownRemark(fields: { slug: { eq: $next } }) {
      ...PrevNextPostFragment
    }
    site {
      siteMetadata {
        disqusShortName
        siteLanguage
      }
    }
  }
`
