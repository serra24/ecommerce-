import React, { useContext, useEffect, useState } from 'react'
import logo from '../../Assits/Imgs/images/freshcart-logo.svg'
import { Link, NavLink } from 'react-router-dom'
import { conText } from '../../Context/Context';
export default function Nav() {
    let {  setIdCart , setDataWList, setIdW, counterWList, setCounterWList, getUserWishlist, counter, setCounter, ShowDataCart } = useContext(conText);

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
    useEffect(() => {
        (async () => {
            let dataWL = await getUserWishlist();
            let data = await ShowDataCart();
            if (data.status || dataWL.status == "success") {
                setIdW(dataWL.data.map(val => {
                    return val._id
                }))
                setCounter(data.numOfCartItems)
                setCounterWList(dataWL.count)
                setDataWList(dataWL.data)
                setIdCart(data?.data?.products.map(val=>val?.product._id))
            }
        })();
    }, [])
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-secondary py-3 ">
                <div className="container-fluid mx-2">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul className="navbar-nav  me-auto gap-3 mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link " aria-current="page" to="/Home">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/Products">Products</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/Categories">Categories</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/Brands">Brands</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/allorders">All Orders</NavLink>
                            </li>
                        </ul>
                        <ul className="navbar-nav   ms-auto mb-2 gap-3 ms-auto mb-lg-0">
                            
                            <li className="nav-item">
                                <NavLink className=" nav-link fs-5   position-relative" to="/Cart">
                                    Cart<i className={`fa-solid ms-1 fa-cart-arrow-down tex  ${counter ? "text-warning" : ""} `}></i>
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                                        {counter ? counter : ""}
                                    </span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className=" nav-link   fs-5   position-relative" to="/WhichList">
                                    WhichList<i className={`fa-solid ms-1   btnWhichList    fa-heart ${counterWList ? "btnWhichListRed" : ""} `}></i>
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                                        {counterWList ? counterWList : ""}

                                    </span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className=" nav-link fs-5   position-relative" to="/User">User<i className="fa-solid fa-user-pen"></i></NavLink>
                            </li>
                            <li className="nav-item">
                                <Link onClick={logout} className=" nav-link  fs-5    position-relative" to="/Signin">
                                    Logout<i className="fa-solid ms-1 fa-arrow-right-from-bracket"></i>
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
        </>
    )
}
