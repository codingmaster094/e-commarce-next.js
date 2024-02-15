'use client'
import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import style from "../../../product.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { API } from '@/app/page';
import Link from 'next/link';

export default function page(props) {
    const [data, setdata] = useState({
        Product_ID: "",
        Product_name: "",
        Product_price: "",
        Product_qty: "",
        category: "",
        description: "",
        products_image: "",
    })

    const GetDataID = async () => {
        let Result = await API.post(`http://localhost:2023/api/products/get/id/products/${props.params.id}`)
        Result = Result.data.data[0]
        console.log('Result', Result.Product_name)
        setdata({
            Product_ID: Result._id,
            Product_name: Result.Product_name,
            Product_price: Result.Product_price,
            Product_qty: Result.Product_qty,
            category: Result.category,
            description: Result.description,
            products_image: Result.product_image,
        })
    }

    useEffect(() => {
        GetDataID()
    }, [])


    return (
        <div>
            {console.log('data', data)}
            <Card className="container w-100 h-100 border mt-5 " id={style.form}>
                <Card.Body>
                    <div className="mb-3">
                        <span className="mb-3">Product ID :</span>
                        <span>{data.Product_ID}</span>
                    </div>
                    <div className="mb-3">
                        <span className="mb-3">Product Name :</span>
                        <span>{data.Product_name}</span>
                    </div>
                    <div className="mb-3">
                        <span className="mb-3">Product Price :</span>
                        <span>{data.Product_price}</span>
                    </div>
                    <div className="mb-3">
                        <span className="mb-3">Product Qty :</span>
                        <span>{data.Product_qty}</span>
                    </div>
                    <div className="mb-3">
                        <span className="mb-3">Product Category :</span>
                        <span>{data.category?.category_name}</span>
                    </div>
                    <div className="mb-3">
                        <span className="mb-3">Product Description :</span>
                        <span>{data.description}</span>
                    </div>
                    <div className="mb-3">
                        <span className="mb-3">Product Image :</span>
                        <span><img src={data.products_image} height={80} width={60} /></span>
                    </div>
                    <Link href={`/products/product_update/${data.Product_ID}`}>
                        <div className="d-flex justify-content-center">
                            <Button type="button" className="btn btn-success text-white btn-outline-success w-50 m-3" id={style.ekleButton}>Update Product</Button>
                        </div>
                    </Link>
                    <Link href={"/home"}>
                        <div className="d-flex justify-content-center">
                            <Button type="button" className="btn btn-success text-white btn-outline-success w-50 m-3" id={style.ekleButton}>Back</Button>
                        </div>
                    </Link>
                </Card.Body>
            </Card>
        </div>
    )
}

