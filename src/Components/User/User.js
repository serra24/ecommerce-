import axios from 'axios';
import { useFormik } from 'formik';
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import * as Yuo from "yup"

export default function User() {

    const userDataa = JSON.parse(localStorage.getItem("user"));
    console.log(userDataa);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    let [messagesUpdate, setMessagesUpdate] = useState("")
    let [messagesPass, setMessagesPass] = useState("")

    let [inputType, setInputType] = useState("password")

    function updatePassss(values) {
        axios.put("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword", values, {
            headers: {
                token: localStorage.getItem("token")
            }
        }).then(({ data }) => {
            console.log(data);
            if (data.message == "success") {
                toast.success("Change your password successfully")
                localStorage.removeItem("token");
                localStorage.setItem("token", data.token)
                handleClose();
            }
        }).catch(err => {
            console.log(err);
            setMessagesPass(err.response.data.errors.msg)

        })
    }
    function topass() {
        if (inputType == 'text')
            setInputType('password')
        else
            setInputType('text')
    }
    function validationSchema() {
        let sechma = new Yuo.object({
            currentPassword: Yuo.string().matches(/^[A-Z][A-Za-z0-9]{6,}$/, "password must be matches Like => {Name123456}").required(),
            password: Yuo.string().matches(/^[A-Z][A-Za-z0-9]{6,}$/, "password must be matches Like => {Name123456}").required(),
            rePassword: Yuo.string().oneOf([Yuo.ref("password")], "Password and repassword Not Match").required(),

        })
        return sechma;
    }

    let passwordUpdate = useFormik({
        initialValues: {
            currentPassword: '',
            password: '',
            rePassword: '',
        },
        validationSchema,
        onSubmit: (val) => {
            updatePassss(val)
        }
    })





    function updateDataa(values) {
        axios.put("https://ecommerce.routemisr.com/api/v1/users/updateMe", values, {
            headers: {
                token: localStorage.getItem("token")
            }
        }).then(({ data }) => {
            console.log(data);
            if (data.message == "success") {
                toast.success("Change Your Data Success");
                localStorage.removeItem("user");
                localStorage.setItem("user", JSON.stringify(data.user))
                handleClose2()
            }
        }).catch(err => {
            console.log(err);
            setMessagesUpdate(err.response.data.errors.msg)
        })
    }


    function validationSchema2() {
        let sechma = new Yuo.object({
            name: Yuo.string().min(5).max(10).required(),
            email: Yuo.string().email().required("Email is Requiredss"),

        })
        return sechma;
    }

    let dataUpdate = useFormik({
        initialValues: {
            name: '',
            email: '',
        },
        validationSchema: validationSchema2,
        onSubmit: (val) => {
            updateDataa(val);
        }
    })



    try {
        return (
            <>
                <Modal keyboard={false} size='lg' centered backdrop="static" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Your Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <label htmlFor="currentPassword" >currentPassword</label>
                        <div className="in   mb-3 pb-3 border-2 border-black border-bottom d-flex  justify-content-between align-items-center ">
                            <input onChange={passwordUpdate.handleChange} placeholder='currentPassword...' onBlur={passwordUpdate.handleBlur} type={inputType} id='currentPassword' name='currentPassword' className={`      form-control ${passwordUpdate.errors.currentPassword && passwordUpdate.touched.currentPassword ? "is-invalid" : ""}  `} />
                            <i onClick={topass} className='fa-solid ms-2 cursor-pointer fs-5 fa-eye ' ></i>
                        </div>
                        {passwordUpdate.errors.currentPassword && passwordUpdate.touched.currentPassword ? <div className="alert alert-danger">{passwordUpdate.errors.password}</div> : ""}

                        <label htmlFor="password" >Password</label>
                        <div className="in   d-flex  justify-content-between align-items-center ">
                            <input onChange={passwordUpdate.handleChange} placeholder='Password...' onBlur={passwordUpdate.handleBlur} type={inputType} id='password' name='password' className={`   form-control ${passwordUpdate.errors.password && passwordUpdate.touched.password ? "is-invalid" : ""}  `} />
                            <i onClick={topass} className='fa-solid ms-2 cursor-pointer fs-5 fa-eye ' ></i>
                        </div>
                        {passwordUpdate.errors.password && passwordUpdate.touched.password ? <div className="alert alert-danger">{passwordUpdate.errors.password}</div> : ""}

                        <label className='' htmlFor="rePassword" >rePassword</label>
                        <div className="in   d-flex  justify-content-between align-items-center ">
                            <input onChange={passwordUpdate.handleChange} placeholder='rePassword...' onBlur={passwordUpdate.handleBlur} type={inputType} id='rePassword' name='rePassword' className={`   form-control ${passwordUpdate.errors.rePassword && passwordUpdate.touched.rePassword ? "is-invalid" : ""}  `} />
                            <i onClick={topass} className='fa-solid ms-2 cursor-pointer fs-5 fa-eye ' ></i>
                        </div>
                        {passwordUpdate.errors.rePassword && passwordUpdate.touched.rePassword ? <div className="alert alert-danger">{passwordUpdate.errors.rePassword}</div> : ""}
                        {messagesPass ? <div className="alert alert-danger my-3">{messagesPass}</div> : ""}

                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="primary" onClick={passwordUpdate.handleSubmit}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal keyboard={false} size='lg' centered backdrop="static" show={show2} onHide={handleClose2}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update User Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={dataUpdate.handleSubmit}>
                            <label htmlFor="Name" >Name</label>
                            <input onClick={() => setMessagesUpdate("")} onBlur={dataUpdate.handleBlur} onChange={dataUpdate.handleChange} placeholder='Name...' type="text" id='name' name='name' className={` mb-4 form-control ${dataUpdate.errors.name && dataUpdate.touched.name ? "is-invalid" : ""} `} />
                            {dataUpdate.errors.name && dataUpdate.touched.name ? <div className='valis alert alert-danger mt-2' >{dataUpdate.errors.name}</div> : ''}

                            <label htmlFor="email" >Email</label>
                            <input onClick={() => setMessagesUpdate("")} onChange={dataUpdate.handleChange} placeholder='Email...' onBlur={dataUpdate.handleBlur} type="email" id='email' name='email' className={`  mb-4 form-control ${dataUpdate.errors.email && dataUpdate.touched.email ? "is-invalid" : ""}  `} />
                            {dataUpdate.errors.email && dataUpdate.touched.email ? <div className="alert alert-danger">{dataUpdate.errors.email}</div> : ""}

                            {messagesUpdate ? <div className="alert alert-danger my-3">{messagesUpdate}</div> : ""}
                        </form>

                    </Modal.Body>
                    <Modal.Footer>

                        <Button className='btn bg-main text-white my-3 fw-bold' variant="primary" onClick={dataUpdate.handleSubmit}>
                            Update Ueser Data
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className='container py-5'>
                    <h2 className='my-2 fs-3 fw-bold text-main bg-body-secondary p-4 ' >Welcome : {userDataa.name}</h2>
                    <h2 className='my-2 fs-3 fw-bold text-main bg-body-secondary p-4 ' >Your Email Is  : {userDataa.email}</h2>
                    <h2 className='my-2 fs-3 fw-bold text-main bg-body-secondary p-4 ' >Your Role Is  : {userDataa.role}</h2>
                    <button onClick={handleShow} className='btn text-white bg-main fw-bold m-4 p-2'   >Chagne Your Password</button>
                    <button onClick={handleShow2} className='btn text-white bg-main fw-bold m-4 p-2'   >Chagne Your User Data</button>
                </div>
            </>
        )
    } catch (error) {
        toast.error("Check your Network")
    }
}
