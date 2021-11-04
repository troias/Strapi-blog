
import { getPostBySlug, getAllPosts } from '../../helper/strapiApi'
import { formatImgUrl } from '../../helper/helperFunctions'
import Image from 'next/image'
import { useRouter } from 'next/router'

const PostDetail = ({ post }) => {

    // const { query } = useRouter()
 
    return (
        <div>
            {post.description}
            {post.title}
            {post.likes}
            {post.author.email}
            {post.createdAt}
            {post.updatedAt}
            {post.id}
            {post.slug}
            <Image src={formatImgUrl(post.image[0].url)} width={200} height={200} />
            {post.image.url}
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

 
    const post = await getPostBySlug(params.slug)
    const test = await getStaticPaths(params.slug)
 

    return {

        props: {
            post: {
                ...post[0]

            }
        }
    }
}
export default PostDetail
