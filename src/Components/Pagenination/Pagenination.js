import React from 'react'

export default function Pagenination({ currentPerPage, tP,currentPage ,setCurrentPage }) {
    let page = []
    for (let i = 1; i < Math.ceil(tP / currentPerPage); i++) {
        page.push(i)
    }
    return (
        <>
            {page.map((val, id) => {
                return <button onClick={()=>setCurrentPage(val)} key={id} className={`btn fw-bold  mx-2 ${currentPage == val ? "bg-main text-white": ""}`} >{val}</button>
            })}
        </>
    )
}
