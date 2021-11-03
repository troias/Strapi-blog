
import { getPostBySlug, getAllPosts } from '../../helper/strapiApi'
import { formatImgUrl } from '../../helper/helperFunctions'
import Image from 'next/image'
import { useRouter } from 'next/router'

const PostDetail = ({ post }) => {
    console.log("postProps", post)
    const { query } = useRouter()
    console.log("params", query)
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
    console.log("getStaticPaths", props)
    return {
        
        paths: paths, fallback: false


    }
}


export const getStaticProps = async ({ params }) => {

    console.log(params)
    const post = await getPostBySlug(params.slug)
    const test = await getStaticPaths(params.slug)
    console.log("getStaticPathstest", test )

    return {

        props: {
            post: {
                ...post[0]

            }
        }
    }
}
export default PostDetail
