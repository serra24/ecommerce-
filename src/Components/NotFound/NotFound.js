import React from 'react'
import not from '../../Assits/Imgs/images/pngegg.png'
import { Helmet } from 'react-helmet'
export default function NotFound() {
    return (
        <div className='text-center '>
            <Helmet title={"Not Found Page"}/>
            <img src={not} alt="" className='w-100' />
        </div>
    )
}
