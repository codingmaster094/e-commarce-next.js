"use client";
import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form, ToastContainer } from "react-bootstrap";
import style from "@/app/login.module.css";
import { useRouter } from "next/navigation";
import { API } from "../page";
import Cookies from "js-cookie";
import Link from "next/link";
import Swal from "sweetalert2";

function Login() {
  const navigate = useRouter();
  const [eye, setEye] = useState(true);
  const [eyetype, setEyetype] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remeber, setRemeber] = useState(false);
  const [emailErrors, setemailErrors] = useState("");
  const [emailErrorsnotmatch, setemailErrorsnotmatch] = useState("");
  const [passwordErrors, setpasswordErrors] = useState("");
  const [passwordErrorsnotmatch, setpasswordErrorsnotmatch] = useState("");
  const [validated, setvalidated] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email") || "";
    const storedRemeber = localStorage.getItem("remeber") === "true";
    setEmail(storedEmail);
    setRemeber(storedRemeber);
  }, []);

  const Remeber = (e) => {
    setEmail(email);
    setPassword(password);
    setRemeber(e.target.checked);
  };

  const Eye = () => {
    if (eyetype == "password") {
      setEyetype("text");
      setEye(false);
      //   settype(true);
    } else {
      setEyetype("password");
      setEye(true);
      //   settype(false);
    }
  };

  const LoginData = async (e) => {
    if (remeber === false) {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    } else { 
      localStorage.setItem("email", email);
      // localStorage.setItem("AddTocart", JSON.stringify([]));
      // localStorage.setItem("AddToFav", JSON.stringify([]));
      localStorage.setItem("remeber", remeber);
    }

    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);
    const result = await API.post(
      "http://localhost:2023/api/user/login/user",
      formdata
    );
    const response_message = result.data.data.response_message;
    setemailErrors(response_message.emailError);
    setemailErrorsnotmatch(response_message.emailNotMatch);
    setpasswordErrors(result.data.data.response_message.passwordError);
    setpasswordErrorsnotmatch(
      result.data.data.response_message.passwordNotMatch
    );
    if (result.data.data.response_code === 200) {
      Cookies.set("fmljwt", result.data.data.auth,
      // {
      //   expires: new Date(Date.now() + 30 * 60 * 1000),
      // }
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: result.data.data.response_message,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate.push("/");
      localStorage.setItem("name", result.data.data.data.name);
    } else {
      setvalidated(true);
    }
  };
  return (
    <div className={style.position_relative}>
      <div className={style.auth}>
        <div className={style.auth_box}>
          <Container>
            <div className={style.auth}>
              <div className={style.auth_box}>
                <Card>
                  <div className={`${style.auth_logo}`}>
                    <img
                      src="/user.png"
                      className={style.logo_mini}
                      alt="user"
                    />
                  </div>
                  <Card.Body className={style.mt_3}>
                    <Form
                      className="row g-3 needs-validation"
                      noValidate
                      validated={validated}
                    >
                      <h1 className={style.auth_title}>Sign in</h1>
                      <div className={style.input_style}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            className="my-2 w-100"
                            placeholder="Enter Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </Form.Group>
                        <div className="text-danger">
                          {email !== ""
                            ? null
                            : emailErrors !== ""
                            ? emailErrors
                            : ""}
                          {emailErrorsnotmatch !== ""
                            ? emailErrorsnotmatch
                            : ""}
                        </div>
                      </div>
                      <div className={style.input_style}>
                        <Form.Group className={style.input_prefix}>
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type={eye ? "password" : "text"}
                            className="my-2 w-100"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <i
                            onClick={Eye}
                            className={`bx ${eye ? "bx-hide" : "bx-show"}`}
                          ></i>
                        </Form.Group>
                        <div className="text-danger">
                          {password !== ""
                            ? null
                            : passwordErrors !== ""
                            ? passwordErrors
                            : ""}
                          {passwordErrorsnotmatch !== ""
                            ? passwordErrorsnotmatch
                            : ""}
                        </div>
                      </div>
                      <Form.Group
                        className="mb-4"
                        controlId="formBasicCheckbox"
                      >
                        <Form.Check
                          type="checkbox"
                          label="Remember Me"
                          checked={remeber == true ? true : false}
                          onChange={(e) => Remeber(e)}
                          required
                        />
                      </Form.Group>
                      <Link href={"/forgetpassword"}>forget password</Link>
                      <Button
                        variant="primary"
                        type="button"
                        className="w-100"
                        onClick={LoginData}
                      >
                        Sign In
                      </Button>
                      <Link href={"/register"}>
                        <Button
                          variant="warning"
                          type="button"
                          className="w-100 mt-2"
                        >
                          Register
                        </Button>
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
  );
}

export default Login;
