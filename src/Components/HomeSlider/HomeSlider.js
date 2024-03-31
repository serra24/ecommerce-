import React from 'react'
import Slider from "react-slick";

export default function HomeSlider({ dataCatgorie }) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
    };
    try {
        return (
            <Slider {...settings}>
                {dataCatgorie?.data.map((val, id) => {
                    return <img src={val.image} width={30} key={id} height={200} alt="" />
                })}

            </Slider>
        )
    } catch (error) {
        console.log(error);
    }
}
