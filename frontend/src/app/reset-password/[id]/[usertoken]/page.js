'use client'
import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form, ToastContainer } from "react-bootstrap";
import style from "@/app/login.module.css";
import { useRouter } from 'next/navigation';
import { API } from "@/app/page";
import Cookies from "js-cookie";
import Link from "next/link";
import Swal from "sweetalert2";

function page(props) {
  const token = Cookies.get("fmljwt");
    const { id, usertoken } = props.params;
    const navigate = useRouter()
    const [newPassword, setnewPassword] = useState('');
    const [validated, setvalidated] = useState(false)
    const [errors, seterrors] = useState([])
    
    const sendLink = async()=>{

        const formdata = new FormData()
        formdata.append("password", newPassword)
        const result = await API.post(`http://localhost:2023/api/user/reset/password/${id}/${usertoken}`, formdata , { headers: { Authorization: `Bearer ${token}` } })
        console.log('result==>', result)

        if(result.data.status == true){
            Swal.fire({
                position: "center",
                icon: "success",
                title: result.data.response_message,
                showConfirmButton: false,
                timer: 1500
              });
              navigate.push("/")
        }else{
          if(Array.isArray(result.data.response_message)){
            seterrors(result.data.response_message)
          }else{
            Swal.fire({
                position: "center",
                icon: "error",
                title: result.data.response_message,
                showConfirmButton: false,
                timer: 1500
              });
          }
        }
      
    }
  return (
    <div className={style.position_relative}>
      <div className={style.auth}>
        <div className={style.auth_box}>
          <Container>
          <div className={style.auth}>
                        <div className={style.auth_box}>
                            <Card>
                                <div className={style.auth_logo}>
                                    <img src="/user.png" className={style.logo_mini} alt="Remote Control for All TV" />
                                </div>
                                <Card.Body className={style.mt_3}>
                                <Form className="row g-3 needs-validation" novalidate validated={validated}>
                                        <h1 className={style.auth_title}>Reset Password</h1>
                                        <h2 className={style.auth_subtitle}>Headbase It Solution</h2>
                                        <div className={style.input_style}>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="password" className="my-2 w-100" placeholder="Enter Your New password" value={newPassword} onChange={(e) => setnewPassword(e.target.value)} required/>
                                        </Form.Group>
                                        {errors && (
                                          <div className="text-danger">
                                            {errors.map((error, index) => (
                                              <div key={index}>
                                                <span>{error}</span>
                                              </div>
                                            ))}
                                          </div>
                                        )}
                                        </div>
                                            <Button variant="warning" type="button" className="w-100 mt-2" onClick={sendLink} >Reset Password</Button>
                                            <Link href={"/home"}>
                                            <Button variant="secondary" type="button" className="w-100 mt-2" >Back</Button>
                                            </Link>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
          </Container>
        </div>
      </div>
    </div>
  )
}

export default page