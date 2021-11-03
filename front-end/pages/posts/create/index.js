
import { useFormik } from 'formik';

import * as Yup from 'yup';

const addPostHandler = async (postObj) => {

    const req = await fetch(`/api/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postObj)
    })

    const res = await req.json()
    console.log("addPostHandler", res)


};

const SignupSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Title Too Short!')
        .max(50, 'Title Too Long!')
        .required(' Title Required'),
    description: Yup.string()
        .min(2, 'Description Too Short!')
        .max(50, 'Description Too Long!')
        .required('Description required'),
});

const AddPostForm = () => {


    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
        },
        validationSchema: SignupSchema,
        onSubmit: async values => {
            await addPostHandler(values)
        }, 

        
    })


    // console.log("formik", Object.keys(formik.errors))
  

    return (
        <form onSubmit={formik.handleSubmit}>
            
            <label htmlFor="title">Title</label>
         
            <input id="title" placeholder="Title" type="text" onChange={formik.handleChange} value={formik.values.title} />
            <label htmlFor="description">Description</label>
            <input id="description" placeholder="Description" type="text" onChange={formik.handleChange} value={formik.values.description} />
            <button type="submit">Submit</button>
            <p> {formik.errors.title && formik.touched.title ? <div>{formik.errors.title}</div> : null} </p>
            <p>{formik.errors.description && formik.touched.description ? <div>{`${formik.errors.description}`}</div> : null } </p>
        </form>
    )

}



const CreatePost = () => {







    return (
        <div>
            <AddPostForm />
        </div>
    )
}


export default CreatePost