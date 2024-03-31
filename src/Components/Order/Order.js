import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { conText } from '../../Context/Context';
export default function Order() {

    let { pay  } = useContext(conText);
    let navgate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(true)

    let { id } = useParams();
    localStorage.setItem("bhaId" , id);
    console.log(id);



    let adress = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: '',
        },
        onSubmit: (val) => {
            pays(val , id)
        }
    })

    async function pays(val, id) {
        setLoading(false);
        let data = await pay(val, id);
        console.log(" for address : ", data);
        setLoading(true);

        if (data.status == "success") {
            window.location.href = data.session.url;
        }

    }

    return (

        <div className='adress' >
            <div className="w-75 m-auto my-3">
                <h1 className='my-3' >adress </h1>
                <form onSubmit={adress.handleSubmit}>
                    <div className="inputsadress my-5">
                        <label className='my-1' htmlFor="details">Code</label>
                        <input onBlur={adress.handleBlur} placeholder='Code....' type="text" id='details' name='details' value={adress.values.email} onChange={adress.handleChange} className='form-control' />
                        {adress.errors.email ? <div className='valis alert alert-danger mt-2' >{adress.errors.email}</div> : ''}
                    </div>
                    <div className="inputsadress my-5">
                        <label className='my-1' htmlFor="phone">Phone</label>
                        <input type="text" className='form-control' placeholder='Phone...' name='phone' id='phone' onBlur={adress.handleBlur} onChange={adress.handleChange} />
                        {adress.errors.password ? <div className='valis alert alert-danger mt-2' >{adress.errors.password}</div> : ""}
                    </div>
                    <div className="inputsadress my-5">
                        <label className='my-1' htmlFor="city">City</label>
                        <input type="text" className='form-control' placeholder='City...' name='city' id='city' onBlur={adress.handleBlur} onChange={adress.handleChange} />
                        {adress.errors.password ? <div className='valis alert alert-danger mt-2' >{adress.errors.password}</div> : ""}
                    </div>
                    {errorMessage ? <div className='valis alert alert-danger mt-2' >{errorMessage}</div> : ''}
                    <button disabled={adress.dirty && adress.isValid ? false : true} type='submit' className='btn bg-main text-white my-3 fw-bold' >
                        {loading ? "Pay" : <i className='fa fa-spinner fa-spin' ></i>}
                    </button>
                </form>
            </div>
        </div>
    )
}
