import React, { useContext, useState } from 'react'
import { conText } from '../../Context/Context'
import { useQuery } from 'react-query'
import Loading from '../Loading/Loading'
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
export default function Start() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let { getData } = useContext(conText)
    let { data, isLoading } = useQuery("getData", getData)
    if (isLoading) return <Loading />
    return (

        <>
            <Modal
                size='lg'
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header >
                    <Modal.Title>SignUp First</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="div my-5 px-3 text-center">
                        <Link className='btn bg-main text-white fw-bold mx-2 w-25' to={"/SignIn"} >SignIn</Link>
                        <Link className='btn bg-main text-white fw-bold mx-2 w-25' to={"/Signup"} >Signup</Link>
                    </div>
                </Modal.Body>
            </Modal>
            <div className='container'>
                <div className="row row-gap-5 py-5">
                    {
                        data.data.data.map((val, id) => (
                            <div key={val._id} className="col-md-3">
                                <div onClick={handleShow
                                } className='card rounded-2 cursor-pointer cards product p-2'>
                                    <div  >
                                        <img className='w-100 card-img' loading='lazy' src={val.imageCover} alt="" />
                                        <h6 className='text-main my-2' >{val.category.name}</h6>
                                        <h5 className='' >{val.title.split(" ").slice(0, 2).join(" ")}</h5>
                                        <div className='d-flex justify-content-between py-2'>
                                            <span>{val.price}EGB</span>
                                            <span><i style={{ color: "#ffc908" }} className="fa-solid fa-star"></i>{val.ratingsAverage}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}
