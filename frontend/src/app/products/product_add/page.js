'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import style from "../../product.module.css"
import { API } from '../../page';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function page() {
    const navigate = useRouter()
    const [data, setdata] = useState({
        Product_name: "",
        Product_price: "",
        Product_offer: "",
        category: "",
        description: ""
    })

    const [product_image, setproduct_image] = useState([])
    const [category, setcategory] = useState([])
    const [validate, setvalidate] = useState(false)
    const category_get = async () => {
        const Result = await API.post("http://localhost:2023/api/products/get/category")
        setcategory(Result.data.data)
    }

    useEffect(() => {
        category_get()
    }, [])

    const onchangeHendler = async(e)=>{
        setdata({...data ,[e.target.name] : e.target.value})
    }

    const add_product = async () => {
        if (data.Product_name == "" || data.Product_price == "" || data.Product_offer == "" || data.category == "" || data.description == "" || product_image.length == 0) {
            setvalidate(true)
        } else {
            const Form = new FormData()
            Form.append('Product_name', data.Product_name)
            Form.append('Product_price', data.Product_price)
            Form.append('Product_offer', data.Product_offer)
            Form.append('category', data.category)
            Form.append('description', data.description)
            Form.append('products_image', product_image)
            const Result = await API.post("http://localhost:2023/api/products/create/products" , Form)
            if(Result.data.status == true){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: Result.data.response_message,
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate.push("/home")
            }else{
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: Result.data.response_message,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
    }

    return (
        <div>
            <Card className="container w-50 border mt-5 " id={style.form}>
                <Card.Body>
                    <Form className="mt-5" noValidate validated={validate}>
                        <div className="mb-3">
                            <Form.Label htmlFor="UrunID" className="form-label">Product Name</Form.Label>
                            <Form.Control type="text" className="form-control" id="UrunID" name='Product_name' aria-describedby="" required  onChange={onchangeHendler}/>
                            <Form.Control.Feedback type="invalid">
                            Product Name Field Is Require
                            </Form.Control.Feedback>
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="UrunAdi" className="form-label">Product Price</Form.Label>
                            <Form.Control type="number" className="form-control" id="UrunAdi" name='Product_price' required  onChange={onchangeHendler}/>
                            <Form.Control.Feedback type="invalid">
                            Product Price Field Is Require
                            </Form.Control.Feedback>
                        </div>
                        <div className="mb-3">
                            <Form.Label className="form-label" htmlFor="UrunMiktar">Product Offer</Form.Label>
                            <Form.Control type="number" className="form-control" id="UrunMiktar" name='Product_offer' required  onChange={onchangeHendler}/>
                            <Form.Control.Feedback type="invalid">
                            Product Quantity Field Is Require
                            </Form.Control.Feedback>
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor={style.Kategori} className="form-label">Product Category</Form.Label>
                            <select name="category" id={style.Kategori} className="ms-1 d-block w-100" required onChange={onchangeHendler}>
                                <option value={""}>select category</option>
                                {
                                    category.map((val, i) => {
                                        return (
                                            <option key={i} value={val._id}>{val.category_name}</option>
                                        )
                                    })
                                }
                            </select>
                            <Form.Control.Feedback type="invalid">
                            category Field Is Require
                            </Form.Control.Feedback>
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="UrunImage" className="form-label">Product Image</Form.Label>
                            <Form.Control type="file" className="form-control" name="product_image" id="UrunImage" required onChange={(e) =>  setproduct_image(e.target.files[0])}/>
                            <Form.Control.Feedback type="invalid">
                            Product Image Field Is Require
                            </Form.Control.Feedback>
                        </div>
                        <div className="mb-3">
                            <Form.Label className="form-label" htmlFor="UrunMiktar">Description</Form.Label>
                            <Form.Control type="text" name='description' className="form-control" id="UrunMiktar" required  onChange={onchangeHendler}/>
                            <Form.Control.Feedback type="invalid">
                            Description Field Is Require
                            </Form.Control.Feedback>
                        </div>
                        <div className="d-flex justify-content-center">
                            <Button type="button" className="btn btn-success text-white btn-outline-success w-50 m-3" onClick={add_product} id={style.ekleButton}>Add Stock</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}
