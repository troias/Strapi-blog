

import {formatImgUrl } from '../../helper/helperFunctions'
import classes from '../../components/posts/posts'
import Image from 'next/image'
import Link from 'next/link'
const Posts = ({posts}) => { 

    console.log(process.env.NEXT_PUBLIC_STRAPI_API_URL)
    return (
        <div>
            
            {
                posts.map(post => {
                    { console.log("Image", formatImgUrl(post.image[0].url) )}
                    return (
                        <div key={post.id}>
                            <h1>{post.title}</h1>
                            <div className={classes.postImage}>
                          <Link href={`/posts/${post.slug}`}>
                         
                         
                         <a>{post.title}</a>
                         
                         
                         </Link> 
                                <Image src={formatImgUrl(post.image[0].url)} alt="logo" width={post.image[0].width} height={post.image[0].height} />
                            </div>
                            <p>{post.description}</p>
                        </div>
                    )
                })
            }

        </div >
    )


}

export default Posts