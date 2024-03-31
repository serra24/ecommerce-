import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import * as Yuo from "yup"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function ForgetPassword() {
    let nave = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let [mesg, setMesg] = useState("");
    let [resetmesg, setResetmesg] = useState("");


    function check(values) {
        setMesg("")
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values).then(({ data }) => {
            console.log(data);
            if (data.statusMsg == "success") {
                handleShow()
            }
        }).catch(err => {
            console.log(err);
            setMesg(err.response.data.message)
        })
    }
    function ResetPass(values) {
        setMesg("")
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values).then(({ data }) => {
            console.log(data);
            if (data.status == "Success") {
                toast.success(data.status)
                nave("/ResetPass")
            }
        }).catch(err => {
            console.log(err);
            setResetmesg(err.response.data.message)
        })
    }

    function validationSchema() {
        let sechma = new Yuo.object({
            email: Yuo.string().email().required("Email is Requiredss"),
        })
        return sechma;
    }

    let register = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit: (val) => {
            console.log(val);
            check(val)
        }
    })
    let reset = useFormik({
        initialValues: {
            resetCode: '',
        },
        onSubmit: (val) => {
            ResetPass(val)
        }
    })
    return (
        <>
            <Modal backdrop="static" keyboard={false} size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Write Code In Your Email !!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <form  >
                            <input onClick={()=>setResetmesg("")} type="text" name='resetCode' onChange={reset.handleChange} onBlur={reset.handleBlur} className='form-control' placeholder='Code To Reser Password ...' />
                            {resetmesg ? <div className="alert alert-danger  my-2">{resetmesg}</div> : ""}

                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={reset.handleSubmit} >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <div>
                <div className="w-75 m-auto">
                    <h1 className='my-3' >Forget Password:</h1>
                    <form onSubmit={register.handleSubmit}>
                        <label htmlFor="email" >Email</label>
                        <input onClick={() => setMesg("")} onChange={register.handleChange} placeholder='Email...' onBlur={register.handleBlur} type="email" id='email' name='email' className={` mt-3 mb-4 form-control ${register.errors.email && register.touched.email ? "is-invalid" : ""}  `} />
                        {register.errors.email && register.touched.email ? <div className="alert alert-danger  my-2">{register.errors.email}</div> : ""}
                        {mesg ? <div className="alert alert-danger  my-2">{mesg}</div> : ""}
                        <button disabled={!(register.dirty && register.isValid)} type="submit" className='btn bg-main text-white my-3 fw-bold'>Send</button>
                    </form>
                </div>
            </div>
        </>
    )
}
