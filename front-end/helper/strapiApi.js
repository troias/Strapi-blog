export const getPostBySlug = async (slug) => {

    const req = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/posts?slug=${slug}`)
    const res = await req.json()

    return res
 
}

export const getAllPosts  = async () => {
    
        const req = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/posts`)
        const res = await req.json()
    
        return res
    
}

export const addPost = async (post) => {
    
    const req = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/posts`, {
        method: 'POST',
        body: post
    })
    const res = await req.json()
    return res
}