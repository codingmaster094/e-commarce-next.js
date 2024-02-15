'use client'
import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import style from "@/app/login.module.css";
import { useRouter } from 'next/navigation';
import { API } from "../page";
import Link from "next/link";


function Register() { 
    const navigate = useRouter();
  const [eye, setEye] = useState(true);
  const [eyetype, setEyetype] = useState("password");
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setvalidated] = useState(false)
  const [nameErrors, setnameErrors] = useState("")
  const [emailErrors, setemailErrors] = useState("")
  const [passwordErrors, setpasswordErrors] = useState([])

  useEffect(() => {
    const storedName = localStorage.getItem('name') || '';
    const storedEmail = localStorage.getItem('email') || '';
    const storedPassword = localStorage.getItem('password') || '';

    setname(storedName);
    setEmail(storedEmail);
    setPassword(storedPassword);
  }, []);

  const passwordHendler = async(e) => {
    setPassword(e.target.value)
    const errors = []
    if (password.length === 0) {
      errors.push('Password is required.');
    }
    if (password.length < 8) {
      errors.push('Must contain at least 8 characters.');
    }
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
      errors.push('Must contain upper and lower case letters.');
    }
    if (!/\d/.test(password)) {
      errors.push('Must contain at least one number (0 to 9).');
    }
    if (!/[!?$§#]/.test(password)) {
      errors.push('Must contain a special character (!?$§#...).');
    }
    setpasswordErrors(errors);
  }

      const Eye = () => {
        if (eyetype == "password") {
          setEyetype("text");
          setEye(false);
        //   settype(true);
        }
        else {
          setEyetype("password");
          setEye(true);
        //   settype(false);
        }
      }

      const LoginData = async (e) => {
          const formdata = new FormData()
          formdata.append("name", name)
          formdata.append("email", email)
          formdata.append("password", password)
          const result = await API.post("http://localhost:2023/api/user/create/user", formdata)
          setnameErrors(result.data.response_message.nameError)
          setemailErrors(result.data.response_message.emailError)
          setpasswordErrors(result.data.response_message.passwordError)
          if (result.data.status == true) {
                navigate.push("/login")
            } else {
              setvalidated(true)
            }
      }


  return (
    <div className={style.position_relative}>
      {console.log(emailErrors , "jjjj")}
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
                                        <h1 className={style.auth_title}>create Account</h1>
                                        <h2 className={style.auth_subtitle}>Headbase It Solution</h2>
                                        <Link href={"/login"} >
                                        <span className={""}>You have Account ?</span>
                                        </Link>
                                        <div className={style.input_style}>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="text" className="my-2 w-100" placeholder="Enter Your Name" value={name} onChange={(e) => setname(e.target.value)}  required/>  
                                        </Form.Group>
                                        <div className="text-danger">
                                          {
                                            name !="" ? <></> : nameErrors
                                          }
                                        </div>
                                        </div>
                                        <div className={style.input_style}>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="email" className="my-2 w-100" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                        </Form.Group>
                                        <div className="text-danger">
                                          {
                                             emailErrors
                                          }
                                        </div>
                                        </div>
                                        <div className={style.input_style}>
                                        <Form.Group className={style.input_prefix}> 
                                            <Form.Control type={eye ? "password" : "text"} className="my-2 w-100" placeholder="Enter Password" value={password} onChange={(e) => passwordHendler(e)} required/>
                                            <i onClick={Eye} className={`bx ${eye ? "bx-hide" : "bx-show"}`}></i>
                                        </Form.Group>

                                        <div>
                                        {passwordErrors !== undefined ? (
                                            passwordErrors.map((val, index) => (
                                                <div key={index} className={'text-danger'}>
                                                {val}
                                              </div>
                                            ))
                                          ) : (
                                            ''
                                          )}
                                        </div>
                                        </div>
                                        <Button variant="primary" type="button" className="w-100" onClick={LoginData}>create</Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Register;
