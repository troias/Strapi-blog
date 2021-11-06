import { useFormik } from "formik";
import { useRouter } from "next/router"
import { useState, useContext, useEffect } from 'react';
import * as Yup from "yup";
import { AuthContext } from '../../context/authContext';
import classes from "./createPostPage.module.css";

const CreatePostSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Title Too Short!')
        .max(50, 'Title Too Long!')
        .required(' Title Required'),
    description: Yup.string()
        .min(2, 'Description Too Short!')
        .max(50, 'Description Too Long!')
        .required('Description required'),
    file: Yup.mixed().required('Image is required')
});

const AddPostForm = () => {
     const router = useRouter();
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);
    console.log("user", user)


    useEffect(() => {
        if (!user) {
            setError("You must be logged in to create a post")
        }
    }, [user]);

    const addPostHandler = async (postObj) => {

        try {
            const req = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.jwt}`
                },
                body: postObj
            })

            const res = await req.json()
           
            if (res.error) {
                setError(res.error)
                return
            } 
            console.log("handlerObjResp", res);
        } catch (error) {
            console.log("error", error);
        }


    };

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            file: null, // this is the file object
        },
        validationSchema: CreatePostSchema,

        onSubmit: async (values) => {


            // console.log("data", data);
            const formData = new FormData()
            formData.append('data', JSON.stringify({ description: values.description, title: values.title, slug: values.title }))
            formData.append('files.image', values.file)

            await addPostHandler(formData);
            router.push("/posts")
        },
    });
    // console.log("formik", formik);
    return (
        <div className={classes.addPostContainer}>
            {error && <div className={classes.error}>{error}</div>}
            {user && <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        placeholder="Title"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input
                        id="description"
                        placeholder="Description"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />
                </div>
                <div>
                    <label htmlFor="image">Upload Image</label>
                    <input
                        type="file"
                        name="file"
                        placeholder="image"
                        onChange={(event) => {
                            formik.setFieldValue("file", event.currentTarget.files[0]);
                        }}
                    />
                </div>

                <div className={classes.formActions}>
                    <button type="submit">Submit</button>
                </div>

                <div>
                    {formik.errors.title && formik.touched.title ? (
                        <p>{formik.errors.title}</p>
                    ) : null}
                </div>
                <div>
                    {formik.errors.description && formik.touched.description ? (
                        <p>{`${formik.errors.description}`}</p>
                    ) : null}
                </div>
            </form>}

        </div>
    );
};

export default AddPostForm;
