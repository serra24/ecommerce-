import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yuo from "yup"

export default function ResetPass() {
    let [messages, setMessages] = useState("")
    let [load, setLoad] = useState(false)
    let go = useNavigate()

    function RsePass(values) {
        setLoad(true)
        
        axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values).then(({ data }) => {
            console.log(data);
            if (data.token) {
                go("/Signin")
            }
            setLoad(false)
        }).catch(err => {
            setMessages(err.response.data.message)
            console.log(err);
        })
        
        setLoad(false)
    }


    function validationSchema() {
        let sechma = new Yuo.object({
            email: Yuo.string().email().required("Email is Requiredss"),
            newPassword: Yuo.string().matches(/^[A-Z][A-Za-z0-9]{6,}$/, "password must be matches").required(),

        })
        return sechma;
    }

    let resetPassword = useFormik({
        initialValues: {
            email: '',
            newPassword: '',
        },
        validationSchema,
        onSubmit: (val) => {
            RsePass(val);
        }
    })
    return (
        <div>
            <div className="w-75 m-auto">
                <h1 className='my-3' >Reset Password:</h1>
                <form onSubmit={resetPassword.handleSubmit}>

                    <label htmlFor="email" >Email</label>
                    <input onClick={()=>setMessages("")} onChange={resetPassword.handleChange} placeholder='Email...' onBlur={resetPassword.handleBlur} type="email" id='email' name='email' className={`  mb-4 form-control ${resetPassword.errors.email && resetPassword.touched.email ? "is-invalid" : ""}  `} />
                    {resetPassword.errors.email && resetPassword.touched.email ? <div className="alert alert-danger">{resetPassword.errors.email}</div> : ""}

                    <label htmlFor="password" >New Password</label>
                    <input onClick={()=>setMessages("")} onChange={resetPassword.handleChange} placeholder='New Password...' onBlur={resetPassword.handleBlur} type="password" id='password' name='newPassword' className={`  mb-4 form-control ${resetPassword.errors.newPassword && resetPassword.touched.newPassword ? "is-invalid" : ""}  `} />
                    {resetPassword.errors.newPassword && resetPassword.touched.newPassword ? <div className="alert alert-danger">{resetPassword.errors.newPassword}</div> : ""}

                    {messages ? <div className="alert alert-danger">{messages}</div> : ""}

                    <button disabled={!(resetPassword.dirty && resetPassword.isValid)} type="submit" className='btn bg-main text-white my-3 fw-bold'>{load ? <i className='fa fa-spinner fa-spin' ></i> : "Supmit"}</button>
                </form>
            </div>
        </div>
    )
}
