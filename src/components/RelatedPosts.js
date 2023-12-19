import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"

const RelatedPosts = ({ posts, count }) => {
  // filter only published related posts
  const VisiblePosts = posts
    .filter(post => post.frontmatter.published)
    .slice(0, count)

  return (
    <>
      {VisiblePosts.length && (
        <div className="container">
          <div className="related-posts-wrap">
            <h3 className="section-title h5 text-center">
              You might also like
            </h3>
            <div className="row">
              {VisiblePosts.map((post, index) => (
                <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                  <article className="related-post-card" data-id="{{post.id}}">
                    {post.frontmatter.featuredImage && (
                      <Link to={post.fields.slug} className="post-img-wrap">
                        <GatsbyImage
                          image={getImage(post.frontmatter.featuredImage)}
                          alt={post.frontmatter.title}
                        />
                      </Link>
                    )}
                    {/* <a href="{{url}}" className="post-img-wrap">
                    <img className="post-img" loading="lazy"
                        srcset="{{img_url feature_image size="xs"}} 250w,
                                {{img_url feature_image size="s"}} 400w,
                                {{img_url feature_image size="m"}} 600w,
                                {{img_url feature_image size="l"}} 1000w,"
                        sizes="(max-width: 432px) 400px, (max-width: 575px) 600px, (max-width: 628px) 250px, 400px"
                        src="{{img_url feature_image size="s"}}" alt="{{title}}">
                </a> */}
                    <div className="post-info-wrap">
                      <h2 className="h5 post-title">
                        <Link to={post.fields.slug}>
                          {post.frontmatter.title}
                        </Link>
                      </h2>
                      <div className="post-meta">
                        <time
                          className="post-date"
                          dateTime="{post.frontmatter.data}"
                        >
                          {post.frontmatter.dateFormatted}
                        </time>
                        <span className="read-time">
                          {post.timeToRead} min read
                        </span>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RelatedPosts
