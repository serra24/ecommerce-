import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import * as Yuo from "yup"

export default function Signup() {

    let [load, setLoad] = useState(false)
    let [messages, setMessages] = useState("")
    let go = useNavigate()

    
    function check(values) {
        setLoad(true)
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values).then(({ data }) => {
            let useress = data.user;
            if (data.message == "success") {
                console.log(data);
                localStorage.setItem("token", data.token)
                localStorage.setItem("user", JSON.stringify(useress))
                go('/Home')
            }
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
            email: Yuo.string().email().required("Email is Requiredss"),
            password: Yuo.string().matches(/^[A-Z][A-Za-z0-9!@#$%^&*]{6,}$/, "password must be matches Like => {Name123456}").required(),

        })
        return sechma;
    }

    let register = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: (val) => {
            check(val);
        }
    })
    

    return (
        <div>
            <Helmet title={"SignIn"} />

            <div className="w-75 m-auto">
                <h1 className='my-3 text-center'>Login</h1>
                <form onSubmit={register.handleSubmit}>

                    <label htmlFor="email" >Email</label>
                    <input  onClick={()=>setMessages("")} onChange={register.handleChange} placeholder='Email...' onBlur={register.handleBlur} type="email" id='email' name='email' className={` mb-4  form-control ${register.errors.email && register.touched.email ? "is-invalid" : ""}  `} />
                    {register.errors.email && register.touched.email ? <div className="alert alert-danger">{register.errors.email}</div> : ""}

                    <label htmlFor="password" >Password</label>
                    <div className="in  rounded-pill d-flex  justify-content-between align-items-center ">
                        <input  onClick={()=>setMessages("")} onChange={register.handleChange} placeholder='Password...' onBlur={register.handleBlur} type={inputType} id='password' name='password' className={`  form-control ${register.errors.password && register.touched.password ? "is-invalid" : ""}  `} />
                        <i onClick={topass} className='fa-solid ms-2 cursor-pointer fs-5 fa-eye ' ></i>
                    </div>
                    {register.errors.password && register.touched.password ? <div className="alert alert-danger">{register.errors.password}</div> : ""}


                    {messages ? <div className="alert alert-danger">{messages}</div> : ""}
                    <div className="btns  d-flex px-2 justify-content-between">
                    <button disabled={!(register.dirty && register.isValid)} type="submit" className='btn bg-main text-white my-3 fw-bold'>{load ? <i className='fa fa-spinner fa-spin' ></i> : "Submit"}</button>
                    <Link to={"/ForgetPassword"} type="submit" className='btn   my-3 fw-bold'>Forget Password ?</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
