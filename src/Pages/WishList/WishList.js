import React, { useContext, useEffect, useState } from 'react'
import { conText } from '../../Context/Context';
import { toast } from 'react-toastify';
import Loading from '../../Components/Loading/Loading';
import { Helmet } from 'react-helmet';

export default function  WishList() {
    let { counterWList , setIdCart ,setIdW, getUserWishlist, setCounter, deletsWhichList, addToCart, setCounterWList } = useContext(conText);
    let [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);
    async function getUWL() {
        setLoading(true);
        let data = await getUserWishlist();
        console.log("getUWL",data);
        if (data.status == "success") {
            setData(data?.data);
            setCounterWList(data?.count);
            setIdCart(data?.data.map(val=>val._id))

        }
        setLoading(false);
    }
    useEffect(() => {
        getUWL()

    }, [])

    async function removes(id) {
        let data = await deletsWhichList(id);
        console.log("Dellll", data);
        if (data.status == "success") {
            toast.error("Done")
            setCounterWList(data.data.length);
            getUWL();
            setIdW(data.data);
        }
    }

    async function addCart(id) {
        setLoadingBtn(true);
        let data = await addToCart(id);
        console.log("addCart ", data);
        if (data.status == "success") {
            toast.success("Add to cart successfully ")
            setLoadingBtn(false);
            setCounter(data.numOfCartItems)
        }
    }
    if (loading) return <Loading />
    try {
        return (
            <div className='container my-3 bg-main-light p-3 rounded-4 '>
                            <Helmet title={"Which List"} />
    
                <h1 className='text-main fw-bold py-2' > My Wish List</h1>
                { counterWList?  ""  : <h1  className='text-main text-center fw-bold py-2' > No Elements Wishlist </h1> }
    
                {data.map((val) => {
                    return <div key={val._id} className="row my-2  border-bottom border-black p-2 bg-body-secondary">
                        <div className='col-md-2'><img src={val?.imageCover} className='w-100' alt="" /></div>
                        <div className="col-md-10   d-flex justify-content-between align-items-center">
                            <div className="detales w-75">
                                <h3 className=' fw-bold'>{val?.title}</h3>
                                <h6 className='text-success my-3 fw-bold'>Price : {val.price}</h6>
                                <button onClick={() => removes(val._id)} className='btn text-success  fw-bold ' >Delet Item <i className="fa-regular  fa-trash-can"></i></button>
                            </div>
                            <div className="quantity w-25  ">
                                <button disabled={loadingBtn} onClick={() => addCart(val._id)} className='btn w-100  me-auto rounded-2 border-black border-2 fw-bold' >{loadingBtn ? <i className="fa-solid fa-cog fa-spin fa-spin-reverse"></i> : "Add To Cart !"}</button>
                            </div>
                        </div>
                    </div>
                })}
    
            </div>
        )
    } catch (error) {
        toast.error("Check your Network")
    }
}
