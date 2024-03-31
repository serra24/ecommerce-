import React, { useContext, useEffect, useState } from 'react'
import Product from '../Product/Product';
import Loading from '../../Components/Loading/Loading';
import { useQuery } from 'react-query';
import { conText } from '../../Context/Context';
import { Helmet } from 'react-helmet';
import Pagenination from '../../Components/Pagenination/Pagenination';
import Loader from '../../Components/Loader/Loader';
import { toast } from 'react-toastify';

export default function Products() {
    const [currentPage, setCurrentPage] = useState(1)
    const [currentPerPage, setCurrentPerPage] = useState(8)

    let { getData, getUserWishlist, setDataWList } = useContext(conText)
    let { data, isLoading } = useQuery("getData", getData)

    console.log("data", data);
    async function getUWList() {
        let data = await getUserWishlist();
        console.log("frm pro", data);
        if (data.status == "success") {
            setDataWList(data.data)
        }
    }
    useEffect(() => {
        getUWList()
    }, [])



    const lastPostPage = currentPage * currentPerPage;
    const firstPostPage = lastPostPage - currentPerPage;
    const curnet = data?.data?.data.slice(firstPostPage, lastPostPage);
    if (isLoading) return <Loading />
    try {
        return (
            <>
                <Helmet title={"Products"} />
                <div className='container  py-2 my-2 '>
                    <div className="row row-gap-3 py-4">
                        {curnet?.map((val => {
                            return isLoading ? <Loader /> : <Product key={val._id} items={val} isLoading={isLoading} />
                            // return <Loader />
                        }))}
                    </div>
                    <div className=" fitConte m-auto ">
    
                        <Pagenination tP={data?.data.data.length} currentPage={currentPage} setCurrentPage={setCurrentPage} currentPerPage={currentPerPage} />
                    </div>
                </div>
            </>
        )
    } catch (error) {
        toast.error("Check your Network")
    }
}
