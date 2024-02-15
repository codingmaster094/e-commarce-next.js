'use client'
import { API } from '@/app/page'
import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Main_careousel from '../Main_components/Main_careousel'
import Mobile_product_ceraousel from '../Main_components/Mobile_product_ceraousel'
import Watches_product_ceraousel from '../Main_components/Watches_product_ceraousel'
import Reting from '../Main_components/Reting'
import Service from '../Main_components/Service'
import Sale_Post from '../Main_components/Sale_Post'
import Subcribe_Shop from '../Main_components/Subcribe_Shop'

export const Main = () => {
    const [cart, setCart] = useState([]);
    const handleAddToCart = (product) => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: product,
        });

        const updatedCart = [...cart, product];
        setCart(updatedCart);
        localStorage.setItem('AddTocart', JSON.stringify(updatedCart));
    };

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('AddTocart'));
        if (storedCart) {
            setCart(storedCart);
        }
    }, []);

    return (
        <>
        <Main_careousel />
        <Service />
        <Mobile_product_ceraousel />
        <Watches_product_ceraousel />
        <Sale_Post />
        <Reting />
        <Subcribe_Shop />    
        </>
    )
}
