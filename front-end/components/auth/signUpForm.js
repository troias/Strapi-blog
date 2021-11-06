import { useFormik } from "formik";
import { useState, useContext, useEffect } from 'react';
import {useRouter} from 'next/router'
import * as Yup from "yup";
import { AuthContext } from "../../context/authContext";

const SignUpForm = () => {

    const router = useRouter()
    const {user, setUser} = useContext(AuthContext);
    const [error, setError] = useState(null)

  

    useEffect(() => {
        if(error) {
            setTimeout(() => {
                setError(null)
            }, 3000)
        }
    }, [error])

    useEffect(() => { 
        if(user) {
            router.push('/')
        }
    }, [user])



    const formik = useFormik({
        initialValues: {
            email: "",  // email: "",
            password: "", // password: "",
        },

        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email("Invalid email")
                .required("Required"),
            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Required"),
        }),
        onSubmit: async (values) => {
            try {
                const req = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/local/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: values.email,
                        email: values.email,
                        password: values.password,
                    }),
                });
                if (!req.ok) {
                    const error = await req.json();
                 
                    setError(error.message[0].messages[0].message);
                    
                } else {
                    const data  = await req.json();
                    setUser(data);
                   
                    localStorage.setItem("token", data.token);
                    router.push('/')
                }

            } catch (error) {
                
            }
           
        },
        });
      
    return (
        <>
        {error && <p>{error}</p>}
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
            />
       
            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
            <label htmlFor="password">Password</label>
            <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            {formik.errors.password ? <div>{formik.errors.password}</div> : null}
            <button type="submit">Submit</button>
        </form>
        </>
    )

}

export default SignUpForm;