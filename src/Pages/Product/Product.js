import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { conText } from '../../Context/Context';
import { toast } from 'react-toastify';

export default function Product({ items }) {
    let { addWhichList, setIdCart ,idCart, setIdW, delets, setCounterWList, setCounter, deletsWhichList, idW, addToCart } = useContext(conText);
    const [loading, setLoading] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);

    async function addCart(id) {
        setLoading(true);
        let data = await addToCart(id);
        console.log("addCart ", data);
        if (data.status == "success") {
            toast.success("Add to cart successfully ")
            setLoading(false);
            setCounter(data.numOfCartItems)
            setIdCart(data?.data.products.map(val=>val.product))

        }
    }
    async function addWl(id) {
        setBtnLoading(true);
        let data = await addWhichList(id);
        console.log("addWlist ", data);
        if (data.status == "success") {
            toast.success(data.message)
            setCounterWList(data.data.length)
            setIdW(data.data)
            setBtnLoading(false);
        }
    }

    async function removes(id) {
        setBtnLoading(true);
        let data = await deletsWhichList(id);
        console.log("Dellll", data);
        if (data.status == "success") {
            toast.success(data.message)
            setIdW(data.data)
            setCounterWList(data.data.length);
            toast.error(data.messagep)
        }
        setBtnLoading(false);
    }

    async function removesFromCart(id) {
        
        let data = await delets(id);
        console.log("Dellll", data);
        if (data.status == "success") {
            toast.error("Done")
            setCounter(data.numOfCartItems);
            setIdCart(data?.data.products.map(val=>val.product._id))

        }
    }

    return (
        <>
            <div className="col-md-3 bhaaa ">
                <div aria-hidden="true" className='card rounded-2 cursor-pointer cards product p-2'>
                    <Link to={"/ProductDetails/" + items._id} >
                        <img className='w-100 card-img' loading='lazy' src={items.imageCover} alt="" />
                        <h6 className='text-main my-2' >{items.category.name}</h6>
                        <h5 className='' >{items.title.split(" ").slice(0, 2).join(" ")}</h5>
                        <div className='d-flex justify-content-between py-2'>
                            <span>{items.price}EGB</span>
                            <span><i style={{ color: "#ffc908" }} className="fa-solid fa-star"></i>{items.ratingsAverage}</span>
                        </div>
                    </Link>
                    <div className="btns w-100 my-2 ">
                        {idCart?.includes(items._id)? <button onClick={()=>removesFromCart(items._id)} className='btn   text-white w-75 fw-bold  bg-danger'>Remove From Cart</button> : <button disabled={loading} onClick={() => { addCart(items._id) }} className={`btn text  text-white w-75 fw-bold  bg-main`}  >{loading ? <i className="fa-solid fa-cog fa-spin fa-spin-reverse"></i> : "Add Cart !"} </button> }
                        {btnLoading ? <i className="fa-solid ms-4  fa-heart fa-beat fs-3"></i> : idW.includes(items._id) ? <i onClick={() => { removes(items._id) }} className={`fa-solid fa-heart-circle-xmark  ms-4 btnWhichList   fs-3 btnWhichListRed `}></i> : <i onClick={() => { addWl(items._id) }} className={`fa-solid  ms-4 btnWhichList   fs-3 fa-heart `}></i>}
                    </div>
                </div>
            </div>
        </>
    )
}
