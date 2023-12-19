import React from 'react'
import NextPost from './NextPost'
import PrevPost from './PrevPost'

const PrevNextPosts = ({ prev, next }) => {
  return (
    <div className="prev-nex-wrap">
      <div className="row">
        <div className="col-md-6">
          {next &&
            <NextPost post={next} />
          }
        </div>
        <div className="col-md-6">
          {prev &&
            <PrevPost post={prev} />
          }
        </div>
      </div>
    </div>
  )
}

export default PrevNextPosts