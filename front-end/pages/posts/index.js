 import React from 'react'
 import Posts from '../../components/posts/posts'
 import styles from '../../styles/Home.module.css'

 const PostPage = ({posts}) => {
     return (
         <div className={styles.container}>
                <Posts posts={posts} />
         </div>
     )
 }
 

 
export const getStaticProps = async (ctx) => {

    const server = 'http://localhost:1337'
    const req = await fetch(`${server}/posts`)
    const res = await req.json()
  
    console.log(res)
  
    return {
      props: {
        posts: res
      }
    }
  }

 export default PostPage