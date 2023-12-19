import React from "react"
import { Link } from "gatsby"

const Tags = ({ tags }) => {
  return (
    <div className="tag-wrap">
      {tags.map(
        (tag, index) =>
          tag !== null && (
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
          )
      )}
    </div>
  )
}

export default Tags
