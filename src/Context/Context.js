import axios from 'axios';
import React, { createContext, useState } from 'react'

export let conText = createContext(0);

async function addToCart(productId) {
    return axios.post("https://ecommerce.routemisr.com/api/v1/cart", { productId }, {
        headers: {
            token: localStorage.getItem("token")
        },
    }).then(({ data }) => data).catch(err => err);

}
async function addWhichList(productId) {
    return axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", { productId }, {
        headers: {
            token: localStorage.getItem("token")
        },
    }).then(({ data }) => data).catch(err => err);

}
async function delets(productId) {
    return axios.delete("https://ecommerce.routemisr.com/api/v1/cart/" + productId, {
        headers: {
            token: localStorage.getItem("token")
        },
    }).then(({ data }) => data).catch(err => err);

}
async function deletsWhichList(productId) {
    return axios.delete("https://ecommerce.routemisr.com/api/v1/wishlist/" + productId, {
        headers: {
            token: localStorage.getItem("token")
        },
    }).then(({ data }) => data).catch(err => err);

}
async function pay(shippingAddress, productId) {
    return axios.post("https://ecommerce.routemisr.com/api/v1/orders/checkout-session/" + productId, { shippingAddress }, {
        headers: {
            token: localStorage.getItem("token")
        },
    }).then(({ data }) => data).catch(err => err);

}
async function getUserOrders(id) {
    return axios.get("https://ecommerce.routemisr.com/api/v1/orders/user/" + id).then(({ data }) => data).catch(err => err);

}
async function ubdte(count, productId) {
    return axios.put("https://ecommerce.routemisr.com/api/v1/cart/" + productId, { count }, {
        headers: {
            token: localStorage.getItem("token")
        },
    }).then(({ data }) => data).catch(err => err);

}

async function ShowDataCart() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
            token: localStorage.getItem("token")
        },
    }).then(({ data }) => data).catch(err => err);

}

async function getUserWishlist() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
            token: localStorage.getItem("token")
        },
    }).then(({ data }) => data).catch(err => err);

}

async function getCategory() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories", {
        headers: {
            token: localStorage.getItem("token")
        },
    }).then(({ data }) => data).catch(err => err);

}


function getData() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
}
export default function Context({ children }) {

    const [offli, setOffli] = useState(false);
    const [counter, setCounter] = useState(0);
    const [counterWList, setCounterWList] = useState(0);
    const [dataWList, setDataWList] = useState([]);
    const [idW, setIdW] = useState([]);
    const [idCart, setIdCart] = useState([]);
    return (
        <conText.Provider value={{idCart, setIdCart , offli, getData, setOffli , idW, setIdW, getCategory, dataWList, deletsWhichList, setDataWList, addWhichList, counterWList, setCounterWList, getUserWishlist, counter, setCounter, addToCart, ShowDataCart, ubdte, delets, pay, getUserOrders }}>
            {children}
        </conText.Provider>
    )
}
