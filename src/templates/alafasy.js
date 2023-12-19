import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import PostLoop from "../components/PostLoop"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import IconsMap from "../util/IconsMap"

const alafasy = ({ data }) => {
  const alafasy = data.alafasysJson
  const posts = data.allMarkdownRemark.nodes
  const totalPosts = data.allMarkdownRemark.totalCount
  const UserIcon = IconsMap["user"]

  return (
    <Layout>
      <Seo title={alafasy.name} />
      <div className="main">
        <div className="container">
          <div className="archive-cover">
            <div
              className={`archive-cover-inner cover-alafasy flex ${
                alafasy.coverImage !== null ? "has-image" : ""
              }`}
            >
              {alafasy.coverImage && (
                <GatsbyImage
                  className="cover-image"
                  image={getImage(alafasy.coverImage)}
                  alt={`${alafasy.name} cover image`}
                />
              )}
              <div className="cover-content-wrapper flex">
                <div className="avatar-wrap">
                  {alafasy.profilePicture !== null ? (
                    <GatsbyImage
                      image={getImage(alafasy.profilePicture)}
                      alt={alafasy.name}
                    />
                  ) : (
                    <div className="avatar no-image">
                      <UserIcon />
                    </div>
                  )}
                </div>
                <div className="alafasy-info">
                  <h2 className="name h4">{alafasy.name}</h2>
                  <div className="alafasy-meta">
                    {alafasy.location && (
                      <span className="alafasy-location">{alafasy.location}</span>
                    )}
                    <span className="post-count">
                      {` `}
                      {totalPosts > 1
                        ? `${totalPosts} posts`
                        : `${totalPosts} post`}
                    </span>
                  </div>

                  {alafasy.description && (
                    <div className="bio">{alafasy.description}</div>
                  )}
                  <div className="alafasy-social">
                    {alafasy.socialLinks &&
                      alafasy.socialLinks.map((item, index) => (
                        <a
                          key={index}
                          href={item.url}
                          target="_blanK"
                          rel="noreferrer"
                        >
                          {(() => {
                            const Icon =
                              IconsMap[item.platform.toLowerCase()] ||
                              IconsMap["default"]
                            return <Icon />
                          })()}
                        </a>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PostLoop posts={posts} />
      </div>
    </Layout>
  )
}

export default alafasy

