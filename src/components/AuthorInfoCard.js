import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { User } from "../icons"

const AuthorInfoCard = ({ author }) => {
  const { name } = author

  return (
    <div className="about-author flex">
      <div className="avatar-wrap">
        <Link to={`/author${author.fields.slug}`} title="{name}">
          {author.profilePicture !== null ? (
            <GatsbyImage
              image={getImage(author.profilePicture)}
              alt={author.name}
            />
          ) : (
            <div className="avatar no-image">
              <User />
            </div>
          )}
        </Link>
      </div>
      <div className="author-info">
        <h3 className="name h5">
          <Link to={`/author${author.fields.slug}`} className="author-name">
            {name}
          </Link>
        </h3>
        {author.description && <div className="bio">{author.description}</div>}
      </div>
    </div>
  )
}

export default AuthorInfoCard
