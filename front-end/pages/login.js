import React, { useState, useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from '../context/authContext'
import { useRouter } from "next/router";

const Login = () => {

    const auth = useRouter()
    const [error, setError] = useState();
    const { user, setUser } = useContext(AuthContext)

    useEffect(() => {
        if (user) {
            auth.push('/')
        }
    }, [user])

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Email Required"),
            password: Yup.string()
                .required("No password provided.")
                .min(8, "Password is too short - should be 8 chars minimum.")
                .matches(/(?=.*[0-9])/, "Password must contain a number."),
        }),
        onSubmit: async (values) => {
            alert(JSON.stringify(values, null, 2));

            try {
                const req = await fetch(
                    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/local`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            identifier: values.email,
                            password: values.password,
                        }),
                    }
                );

                if (!req.ok) {
                    const error = await req.json();
                
                    setError(error.message[0].messages[0].message);
                    return;
                } else {
                    const data = await req.json();
                    setUser(data)
                    localStorage.setItem("token", data.jwt);
                    //   window.location.href = "/";
                }
            } catch (error) {
                setError("something went wrong" + error);

            }

        
        },
    });

  
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">Email Address</label>
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
            {error && <div>{error}</div>}
        </div>
    );
};

export default Login;
