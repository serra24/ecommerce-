import { jwtDecode } from 'jwt-decode';
import React, { useContext, useEffect, useState } from 'react'
import { conText } from '../../Context/Context';
import Loading from '../Loading/Loading';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';

export default function Allorders() {
    let [data, setData] = useState(null)
    const { getUserOrders } = useContext(conText);
    const token = localStorage.getItem("token")
    const decode = jwtDecode(token);
    async function gUO(ids) {
        let data = await getUserOrders(ids);
        console.log("gUO", data);
        if (data) {
            setData(data);
        }
    }
    useEffect(() => {
        gUO(decode.id);
    }, [])

    if (!data) return <Loading />
    try {
        return (
            <div className='container py-2 my-2'>
                <Helmet title={"All User Order"} />

                <h1 className='fw-bold text-main'>All User Order : </h1>
                <h1 className={`fw-bold text-main text-center ${data.length ? "d-none" : ""}`}>No Order  </h1>
                {data?.map(val => {
                    return <div key={val._id} className="row my-3 py-4  px-3 rounded-3  row-gap-3 bg-body-secondary"  >
                        <div className="times d-flex justify-content-between">
                            <h4>Client : {val.user.name}</h4>
                            <h3>Date  : {val.updatedAt}</h3>
                            <h4>Total Price : {val.totalOrderPrice}</h4>
                        </div>
                        {
                            val?.cartItems?.map(val2 => {
                                return <div key={val2._id} className="col-md-3">
                                    <div className='card cards p-2'>
                                        <img src={val2.product.imageCover} className='w-100' alt="" />
                                        <p className='text-main fw-bold'>Name : {val2.product.category.name}</p>
                                        <p className='text-main  fw-bold'>Price : {val2.price}</p>
                                    </div>
                                </div>
                            })
                        }

                    </div>
                })}
            </div>
        )
    } catch (error) {
        console.log(error);
        toast.error("Check Network")
    }
}
