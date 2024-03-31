import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Loading from '../Loading/Loading';
import { conText } from '../../Context/Context';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';

export default function Categories() {
    let { getCategory } = useContext(conText)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let [dataCatgorie, setDataCatgorie] = useState(null)
    let [dataSpecificCatgorie, setDataSpecificCatgorie] = useState(null)
    let [loading, setLoading] = useState(false)
    const [loadingBtn, setLoadingBtn] = useState(false);


    async function getCatgories() {
        setLoading(true)
        let data = await getCategory();
        console.log("getCatgories", data);
        setDataCatgorie(data);
        setLoading(false)
    }

    function getSpecificCatgories(id) {
        setLoadingBtn(true)
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`).then(({ data }) => {
            console.log("getSpecificCatgories", data);
            setDataSpecificCatgorie(data)
            handleShow()
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoadingBtn(false)
        })
    }
    useEffect(() => {
        getCatgories();
    }, [])
    if (loading) return <Loading />
    try {
        return (
            <>
                <Helmet title={"Categories"} />

                <Modal size="lg" show={show} onHide={handleClose} className='w-100'>
                    <Modal.Header closeButton>
                        <Modal.Title className='fw-bold'>Subcategories</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {dataSpecificCatgorie?.data.length ? "" : <h2 className='fw-bold text-center'>No Subcategories</h2>}
                        <div className="container-fluid py-2">
                            <div className="row row-gap-3">
                                {
                                    dataSpecificCatgorie?.data.map(val => {
                                        return <div key={val._id} className="col-md-12">
                                            <div className='card cards p-2'>
                                                <h2>{val.name}</h2>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
                <div className='container'>
                    <div className="row row-gap-3 py-4 my-2">
                        <h1 className='text-main fw-bold'>All Catgories : </h1>

                        {
                            dataCatgorie?.data?.map(val => {
                                return <div key={val._id} className="col-md-4  ">
                                    <div onClick={() => getSpecificCatgories(val._id)} className="div card  cards">
                                        <img src={val.image} className='w-100' height={300} alt="" />
                                        <div className="foot card-footer   text-center  py-4">

                                            {loadingBtn ? <i className="fa-solid fa-scroll fs-1 fa-flip" style={{ faFlipX: 1, faFlipY: 0 }} /> : <h4 className='text-main fw-bold  '>{val.name}</h4>}
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </>
        )

    } catch (error) {
        console.log(error);
        toast.error("Check your Networksss")
    }
}
