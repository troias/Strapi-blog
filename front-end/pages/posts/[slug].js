
import { getPostBySlug, getAllPosts } from '../../helper/strapiApi'
import { formatImgUrl } from '../../helper/helperFunctions'
import Image from 'next/image'
import { useRouter } from 'next/router'

const PostDetail = ({ post }) => {

    // const { query } = useRouter()

    const deleteHandler = async () => {
        try {
            const req = await fetch(`http://localhost:1337/posts/${post.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const res = await req.json()
            console.log(res)
            window.location.href = '/posts'
        } catch (error) {
            console.log(error)
        }
    }
 
    return (
        <div>
            {post.description}
            {post.title}
            {post.likes}
            {/* {post.author.email} */}
            {post.createdAt}
            {post.updatedAt}
            {post.id}
            {post.slug}
            <Image src={formatImgUrl(post.image[0].url)} width={200} height={200} />
            {post.image.url}
            <button type="button" onClick={deleteHandler}>Delete</button>
        </div>
    )
}

export const getStaticPaths = async (props) => {
    const posts = await getAllPosts()
    const paths = posts.map(post => ({
        params: { slug: post.slug }
    }))
   
    return {
        
        paths: paths, fallback: false


    }
}


export const getStaticProps = async ({ params }) => {
    let post = []
  
    try {
        post = await getPostBySlug(params.slug)
    } catch (error) {
        
    }
   
 
 

    return {

        props: {
            post: {
                ...post[0]

            }
        }
    }
}
export default PostDetail
