/** @format */

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const PostSkeleton = ({ styles, posts }) => {
  return Array(posts)
    .fill(0)
    .map((post, index) => (
      <div className={styles.post} key={index}>
        <div className={styles.imageContainer}>
          <div className={styles.image}>
            <Skeleton height={400} />
          </div>
        </div>
        <div className={styles.content}>
          <h1>
            <Skeleton />
          </h1>
          <p>
            <Skeleton count={6} />
          </p>
          <div className={styles.button}>
            <Skeleton height={45} width={130} />
          </div>
        </div>
      </div>
    ))
}

export default PostSkeleton
