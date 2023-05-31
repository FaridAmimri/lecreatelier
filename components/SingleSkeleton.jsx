/** @format */

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SingleSkeleton = ({ styles, posts }) => {
  return Array(posts)
    .fill(0)
    .map((post, index) => (
      <div className={styles.single} key={index}>
        <div className={styles.content}>
          <div className={styles.illustration}>
            <Skeleton width={700} height={300} />
          </div>

          <div className={styles.user}>
            <Skeleton circle width={50} height={50} />

            <div className={styles.info}>
              <Skeleton width={100} />
              <Skeleton width={130} />
            </div>
            <div className={styles.edit}>
              <Skeleton width={20} height={20} />
              <Skeleton width={20} height={20} />
            </div>
          </div>

          <div className={styles.message}>
            <h1>
              <Skeleton />
            </h1>
            <article>
              <Skeleton count={6} />
            </article>
          </div>
        </div>

        <div className={styles.menu}>
          <h1>
            <Skeleton />
          </h1>
          <div className={styles.post} key={post._id}>
            <Skeleton width={280} height={200} />
            <h2>
              <Skeleton />
            </h2>
            <div className={styles.button}>
              <Skeleton />
            </div>
          </div>
        </div>
      </div>
    ))
}

export default SingleSkeleton
