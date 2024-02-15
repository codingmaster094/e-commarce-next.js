'use client'
import { API } from '@/app/page'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap'
import Swal from 'sweetalert2'
const Mainpage = () => {
    const [Data, setData] = useState([])
    const GetData = async () => {
        const result = await API.post("http://localhost:2023/api/products/get/products")
        setData(result.data.data)
    }

    useEffect(() => {
        GetData()
    }, [])

    const product_delete = async (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger me-2"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                const Form = new FormData()
                Form.append('id', id)
                await API.post('http://localhost:2023/api/products/delete/products', Form)
                GetData()
                swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    icon: "error"
                });
            }
        });
    }

    return (
        <div>
            <Container className='mt-5'>
                <div className='mb-3'>
                    <Link href={"/products/product_add"}>
                        <Button variant='outline-primary'>Add product</Button>
                    </Link>
                </div>
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Product Name</th>
                                            <th>Product Price</th>
                                            <th>Product Qty</th>
                                            <th>Category</th>
                                            <th>products Image</th>
                                            <th>Description</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Data.map((val, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{val.Product_name}</td>
                                                        <td>{val.Product_price}</td>
                                                        <td>{val.Product_qty}</td>
                                                        <td>{val.category.category_name}</td>
                                                        <td><img src={val.product_image} height={60} width={80} alt='product_image' /></td>
                                                        <td>{val.description}</td>
                                                        <td>
                                                            <Link href={`/products/product_view/${val._id}`}>
                                                                <Button variant='outline-warning' className='me-2'>view</Button>
                                                            </Link>
                                                            <Button variant='outline-danger' onClick={() => product_delete(val._id)}>Delete</Button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Mainpage