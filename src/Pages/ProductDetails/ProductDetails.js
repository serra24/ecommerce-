import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { conText } from '../../Context/Context';
import { toast } from 'react-toastify';
import Slider from 'react-slick';
import Loading from '../../Components/Loading/Loading';

export default function ProductDetails() {
    let { setCounter, setIdCart, addToCart } = useContext(conText);
    const [loading, setLoading] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [datas, setDates] = useState([])
    let { id } = useParams();
    const settings = {
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    async function addCart(id) {
        setBtnLoading(true);
        let data = await addToCart(id);
        console.log("addCart ", data);
        if (data.status == "success") {
            toast.success("Add to cart successfully ")
            setCounter(data.numOfCartItems)
            setBtnLoading(false);
            setIdCart(data?.data.products.map(val=>val.product))

        }
    }

    async function details() {
        setLoading(true);
        let { data } = await axios("https://ecommerce.routemisr.com/api/v1/products/" + id)
        console.log("details", data.data)
        setDates(data.data)
        setLoading(false);

    }

    useEffect(() => {
        details();
    }, [])
    if (loading) return <Loading />
    return (
        <>
            <div className="container">
                <div className="row pt-5">
                    <div className="col-md-4">
                        <div className='slider-container  p-2'>
                            {
                                <Slider {...settings}>
                                    {datas?.images?.map((val, id) => {
                                        return <img key={id} src={val} alt="" />
                                    })}
                                </Slider>
                            }
                        </div>
                    </div>
                    <div className="col-md-8 pt-5">
                        <div className=' pt-5'>
                            <h2>{datas.title}</h2>
                            <h6 className='py-4'>{datas.description}</h6>
                            <div className='d-flex justify-content-between py-2'>
                                <span>{datas.price}EGB</span>
                                <span><i className="fa-solid fa-star"></i>{datas.ratingsAverage}</span>
                            </div>
                            <button disabled={btnLoading} onClick={() => { addCart(id) }} className='btn bg-main w-100 text-white fw-bold'  >{btnLoading ? <i className="fa-solid fa-cog fa-spin fa-spin-reverse"></i> : "Add Cart !"} </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
