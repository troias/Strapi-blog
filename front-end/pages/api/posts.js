import { addPost } from '../../helper/strapiApi'


const Handler = async (req, res) => {

    if (req.method === 'GET') {

    }

    if (req.method === 'POST') {

        const postData = req.body
        const addPostToStrapi = await addPost(postData)
        const response = await addPostToStrapi
        console.log("postApi", response)
        res.status(200).json(response)
        // await addPost(req.body)
        // .then(post => {
        //     res.status(201).json(post)
        // })
        // .catch(err => {
        //     res.status(500).json(err)
        // })
    }

    if (req.method === 'PATCH') {

    }

    if (req.method === 'DELETE') {

    }

}

export default Handler