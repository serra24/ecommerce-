import React from 'react'
import Nav from '../../Components/Nav/Nav'
import { Outlet } from 'react-router-dom'

export default function UserLayout() {
    return (
        <>
            <Nav />
            <Outlet />

        </>
    )
}
