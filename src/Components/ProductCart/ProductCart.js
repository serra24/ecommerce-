import React, { useContext, useState } from 'react'
import { conText } from '../Context/Context';
import { toast } from 'react-toastify';

export default function ProductCart({ val , removes , addMin ,btnLoading }) {

 
    return (
        <>
            <div key={val._id} className="row my-2  p-2 bg-body-secondary">
                <div className='col-md-2'><img src={val.product.imageCover} className='w-100' alt="" /></div>
                <div className="col-md-10 d-flex justify-content-between align-items-center">
                    <div className="detales">
                        <h3 className=' fw-bold'>{val.product.title}</h3>
                        <h6 className='text-success my-3 fw-bold'>Price : {val.price}</h6>
                        <button onClick={() => removes(val.product.id)} className='btn text-success  fw-bold ' >Delet Item <i className="fa-regular  fa-trash-can"></i></button>
                    </div>
                    <div className="quantity">
                        <button onClick={() => addMin(++val.count, val.product.id)} className='btn rounded-2 border-black border-2 fw-bold' >{btnLoading ? "wait" : "+"}</button>
                        <span className='p-3 fw-bold' >{val.count}</span>
                        <button onClick={() => addMin(--val.count, val.product.id)} disabled={val.count == 1} className='btn rounded-2 border-black border-2 fw-bold' >{btnLoading ? "wait" : "-"}</button>
                    </div>
                </div>
            </div>
        </>
    )
}
