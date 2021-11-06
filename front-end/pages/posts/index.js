import React from 'react'
import Posts from '../../components/posts/posts'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'

const PostPage = ({ posts }) => {
  return (
    <div className={styles.container}>
      <p>
        <Link href='/posts/create'> create </Link>
      </p>
      <Posts posts={posts} />
    </div>
  )
}



export const getStaticProps = async (ctx) => {

  const server = 'http://localhost:1337'
  const req = await fetch(`${server}/posts`)
  const res = await req.json()


  return {
    props: {
      posts: res
    }
  }
}

export default PostPage