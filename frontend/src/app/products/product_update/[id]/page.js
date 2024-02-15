'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import style from "../../../product.module.css"
import { API } from '../../../page';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

function page(props) {
    const [validate, setvalidate] = useState(false)
    const navigate = useRouter()
    const [data, setdata] = useState({
        Product_ID: "",
        Product_name: "",
        Product_price: "",
        Product_offer: "",
        category: "",
        description: "",
        products_image: "",
    })

    const [product_image, setproduct_image] = useState([])
    const GetDataID = async () => {
        let Result = await API.post(`http://localhost:2023/api/products/get/id/products/${props.params.id}`)
        Result = Result.data.data[0]
        setdata({
            Product_ID: Result._id,
            Product_name: Result.Product_name,
            Product_price: Result.Product_price,
            Product_offer: Result.Product_offer,
            category: Result.category._id,
            description: Result.description,
            products_image: Result.product_image,
        })
        category_get()
    }

    const [category, setcategory] = useState([])
    const category_get = async () => {
        const Result = await API.post("http://localhost:2023/api/products/get/category")
        setcategory(Result.data.data)
    }


    useEffect(() => {
        GetDataID()
    }, [])

    const onchangeHendler = async(e)=>{
        setdata({...data ,[e.target.name] : e.target.value})
    }

    const update_product = async () => {
        if (data.Product_name == "" || data.Product_price == "" || data.Product_offer == "" || data.category == "" || data.description == "") {
            setvalidate(true)
        } else {
            const Form = new FormData()
            Form.append('Product_name', data.Product_name)
            Form.append('Product_price', data.Product_price)
            Form.append('Product_offer', data.Product_offer)
            Form.append('category', data.category)
            Form.append('description', data.description)
            Form.append('products_image', product_image)
            const Result = await API.post(`http://localhost:2023/api/products/update/products/${props.params.id}` , Form)
            if(Result.data.status == true){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: Result.data.response_message,
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate.push(`/products/product_view/${props.params.id}`)
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
                            <Form.Control type="text" className="form-control" id="UrunID" name='Product_name' aria-describedby="" required value={data.Product_name} onChange={onchangeHendler}/>
                            <Form.Control.Feedback type="invalid">
                            Product Name Field Is Require
                            </Form.Control.Feedback>
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="UrunAdi" className="form-label">Product Price</Form.Label>
                            <Form.Control type="number" className="form-control" id="UrunAdi" name='Product_price' required value={data.Product_price} onChange={onchangeHendler}/>
                            <Form.Control.Feedback type="invalid">
                            Product Price Field Is Require
                            </Form.Control.Feedback>
                        </div>
                        <div className="mb-3">
                            <Form.Label className="form-label" htmlFor="UrunMiktar">Product Offer</Form.Label>
                            <Form.Control type="number" className="form-control" id="UrunMiktar" name='Product_offer' required  value={data.Product_offer} onChange={onchangeHendler}/>
                            <Form.Control.Feedback type="invalid">
                            Product Quantity Field Is Require
                            </Form.Control.Feedback>
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor={style.Kategori} className="form-label">Product Category</Form.Label>
                            <select name="category" id={style.Kategori} className="ms-1 d-block w-100" value={data.category}  required onChange={onchangeHendler}>
                                <option value={""}>select category</option>
                                {
                                    category.map((val, i) => {
                                        return (
                                            <option key={i} selected={val._id == data.category._id} value={val._id}>{val.category_name}</option>
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
                            <Form.Control type="file" className="form-control" name="product_image" id="UrunImage" onChange={(e) =>  setproduct_image(e.target.files[0])}/>
                            <Form.Control.Feedback type="invalid">
                            Product Image Field Is Require
                            </Form.Control.Feedback>
                        </div>
                        <div>
                            <img src={data.products_image} height={100} width={100} alt='product Image'/>
                        </div>
                        <div className="mb-3">
                            <Form.Label className="form-label" htmlFor="UrunMiktar">Description</Form.Label>
                            <Form.Control type="text" name='description' className="form-control" id="UrunMiktar" value={data.description} required  onChange={onchangeHendler}/>
                            <Form.Control.Feedback type="invalid">
                            Description Field Is Require
                            </Form.Control.Feedback>
                        </div>
                        <div className="d-flex justify-content-center">
                            <Button type="button" className="btn btn-success text-white btn-outline-success w-50 m-3" onClick={update_product} id={style.ekleButton}>Add Stock</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
  )
}

export default page