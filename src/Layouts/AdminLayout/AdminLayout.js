import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import logo from '../../Assits/Imgs/images/freshcart-logo.svg'

export default function AdminLayout() {
    return (
        <>
            <nav className="navbar bg-body-secondary navbar-expand-lg py-3 ">
                <div className="container-fluid mx-2">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul className="navbar-nav  mb-lg-0">
                            <li className="nav-item ">
                                <NavLink className=" w-100 nav-link btn " to="Start">
                                    Start
                                </NavLink>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 gap-3 ms-auto mb-lg-0">

                            <li className="nav-item">
                                <NavLink className=" nav-link btn " to="Signup">
                                    Signup
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className=" nav-link btn " to="Signin">
                                    Signin
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
}
