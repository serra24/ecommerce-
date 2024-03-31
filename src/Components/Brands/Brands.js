import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
export default function Brands() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loaidng, setLoading] = useState(false);
    const [cardLoaidng, setCardLoading] = useState(false);
    const [data, setData] = useState(null)
    const [dataBrand, setDataBrand] = useState(null)


    async function getSpecificBrands(id) {
        setCardLoading(true)
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`).then(({ data }) => {
            console.log("getSpecificBrands", data);
            setDataBrand(data)
            handleShow()
        }).catch(err => err).finally(() => {
            setCardLoading(false)
        })
    }
    function getBrands() {
        setLoading(true)
        axios.get("https://ecommerce.routemisr.com/api/v1/brands").then(({ data }) => {
            console.log("Brands", data);
            setData(data);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        getBrands();
    }, [])
    if (loaidng) return <Loading />
    try {
        return (
            <>
                <Helmet title={"Brands"} />
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body className='my-4'>
                        <div className="BrandsCard border overflow-hidden text-center position-relative py-5">
                            <h4 className='text-center py-5 text-main fw-bold'  >{dataBrand?.data.name}</h4>
                            <img src={dataBrand?.data.image} className='w-75 m-auto position-absolute    ' alt="" />
                        </div>
                    </Modal.Body>

                </Modal>

                <div className='container py-4'>
                    <h1 className='text-main text-center  my-4' >All Brandas</h1>
                    <div className="row row-gap-3 my-2 ">
                        {data?.data.map(val => {
                            return <div key={val._id} className="col-md-3 ">
                                <div className=''>
                                    <Card onClick={() => getSpecificBrands(val._id)} className='cards' >
                                        <Card.Body>
                                            <Card.Text>
                                                <img src={val.image} className='w-100' alt="" />
                                            </Card.Text>
                                            <Card.Title className='text-center fw-bold'>{cardLoaidng ? <i className="fa-solid fa-scroll fs-1 fa-flip" style={{ faFlipX: 1, faFlipY: 0 }} /> : val.name}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </>
        )
    } catch (error) {
        toast.error("Check your Network")

    }
}
