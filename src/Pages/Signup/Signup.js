import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import * as Yuo from "yup"


export default function Signup() {

    let [load, setLoad] = useState(false)
    let [messages, setMessages] = useState("")
    let go = useNavigate()

    function check(values) {
        setLoad(true)
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).then(({ data }) => {
            if (data.message == "success") {
                go('/Signin')
            }
            console.log(data);
        }).catch(err => {
            console.log(err);
            setMessages(err.response.data.message)
            setLoad(false)
        })
    }

    let [inputType, setInputType] = useState("password")

    function topass() {
        if (inputType == 'text')
            setInputType('password')
        else
            setInputType('text')
    }
    function validationSchema() {
        let sechma = new Yuo.object({
            name: Yuo.string().min(5).max(10).required(),
            email: Yuo.string().email().required("Email is Requiredss"),
            password: Yuo.string().matches(/^[A-Z][A-Za-z0-9!@#$%^&*]{6,}$/, "password must be matches Like => {Name123456}").required(),
            rePassword: Yuo.string().oneOf([Yuo.ref("password")], "Password and repassword Not Match").required(),

        })
        return sechma;
    }

    let register = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
        },
        validationSchema,
        onSubmit: (val) => {
            check(val);
        }
    })
    console.log(register.errors);

    return (
        <div>
            <Helmet title={"SignUp"} />

            <div className="w-75 m-auto">
                <h1 className='my-3 text-center' >Register </h1>
                <form onSubmit={register.handleSubmit}>
                    <label htmlFor="Name" >Username</label>
                    <input onClick={()=>setMessages("")} onBlur={register.handleBlur} onChange={register.handleChange} placeholder='Name...' type="text" id='name' name='name' className={` mb-4 form-control ${register.errors.name && register.touched.name ? "is-invalid" : ""} `} />
                    {register.errors.name && register.touched.name ? <div className='valis alert alert-danger mt-2' >{register.errors.name}</div> : ''}

                    <label htmlFor="email" >Email</label>
                    <input onClick={()=>setMessages("")} onChange={register.handleChange} placeholder='Email...' onBlur={register.handleBlur} type="email" id='email' name='email' className={`  mb-4 form-control ${register.errors.email && register.touched.email ? "is-invalid" : ""}  `} />
                    {register.errors.email && register.touched.email ? <div className="alert alert-danger">{register.errors.email}</div> : ""}

                    <label htmlFor="password" >Password</label>
                    <div className="in  rounded-pill d-flex   justify-content-between align-items-center ">
                        <input onClick={()=>setMessages("")} onChange={register.handleChange} placeholder='Password...' onBlur={register.handleBlur} type={inputType} id='password' name='password' className={`   form-control ${register.errors.password && register.touched.password ? "is-invalid" : ""}  `} />
                        <i onClick={topass} className='fa-solid ms-2 cursor-pointer fs-5 fa-eye ' ></i>
                    </div>
                    {register.errors.password && register.touched.password ? <div className="alert alert-danger">{register.errors.password}</div> : ""}

                    <label className='mt-4' htmlFor="rePassword" >Confirm Password</label>
                    <div className="in  rounded-pill d-flex  justify-content-between align-items-center ">
                        <input onClick={()=>setMessages("")} onChange={register.handleChange} placeholder='rePassword...' onBlur={register.handleBlur} type={inputType} id='rePassword' name='rePassword' className={`   form-control ${register.errors.rePassword && register.touched.rePassword ? "is-invalid" : ""}  `} />
                        <i onClick={topass} className='fa-solid ms-2 cursor-pointer fs-5 fa-eye ' ></i>
                    </div>
                    {register.errors.rePassword && register.touched.rePassword ? <div className="alert alert-danger">{register.errors.rePassword}</div> : ""}

                    {messages ? <div className="alert alert-danger">{messages}</div> : ""}
                    <button disabled={!(register.dirty && register.isValid)} type="submit" className='btn bg-main text-white my-3 fw-bold'>{load ? <i className='fa fa-spinner fa-spin' ></i> : "Submit"}</button>
                </form>
            </div>
        </div>
    )
}
