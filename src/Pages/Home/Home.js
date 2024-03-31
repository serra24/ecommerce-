import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { conText } from '../../Context/Context';
import Loading from '../../Components/Loading/Loading';
import Product from '../Product/Product';
import HomeSlider from '../../Components/HomeSlider/HomeSlider';
import { Helmet } from 'react-helmet';
import Slider from 'react-slick';
import slide1 from '../../Assits/Imgs/images/slider-image-1.jpeg'
import slide2 from '../../Assits/Imgs/images/slider-image-2.jpeg'
import slide3 from '../../Assits/Imgs/images/slider-image-3.jpeg'
import img1 from '../../Assits/Imgs/images/1678303526206-cover.jpeg'
import img2 from '../../Assits/Imgs/images/1678305677165-cover.jpeg'
import Loader from '../../Components/Loader/Loader';
import { toast } from 'react-toastify';

export default function Home() {
    let { getData, getCategory, dataWList, getUserWishlist, setDataWList } = useContext(conText)
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
    };
    let dataWListId = dataWList?.map(val => val._id);
    let [dataCatgorie, setDataCatgorie] = useState(null)
    let [loading, setLoading] = useState(null)
    let { data, refetch } = useQuery("getData", getData)

    async function getCatgories() {
        setLoading(true)
        let data = await getCategory();
        setDataCatgorie(data);
        setLoading(false)
    }

    async function getUWList() {
        let data = await getUserWishlist();
        if (data.status == "success") {
            setDataWList(data.data)
        }
    }
    useEffect(() => {
        getUWList()
        getCatgories()
    }, [])
    // if (loading) return <Loading />
    try {
        return (
            <>
                <Helmet title={"Home"} />
                <div className='container  py-2 my-2 '>
                    <div className="head border p-2 rounded-2 d-flex align-items-center justify-content-between ">
                        <div className="slider w-75">
                            <Slider {...settings}>
                                <img src={slide1} height={500} alt="" />
                                <img src={slide2} height={500} alt="" />
                                <img src={slide3} height={500} alt="" />
                            </Slider>
                        </div>
                        <div className="imgs w-25">
                            <img src={img1} className='w-100' height={300} alt="" />
                            <img src={img2} className='w-100' height={300} alt="" />
                        </div>
                    </div>
                    <div className="slide border p-2 rounded-2 my-4">
                        <h3 className='py-2 fw-bold'>Show Popular Categories </h3>
                        <HomeSlider dataCatgorie={dataCatgorie} />
                    </div>
                    <div className="row row-gap-3 py-4">
                        {data?.data?.data?.map((val => {
                            return loading ? <Loader key={val._id} /> : <Product dataWListId={[...dataWListId]} refetch={refetch} key={val._id} items={val} />
                        }))}
                    </div>
                </div>
            </>
        )
    } catch (error) {
        console.log(error.message);
        toast.error("Check your Network")
    }
}
