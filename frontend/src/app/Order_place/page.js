"use client";
import Header from "@/componenets/Header/Header";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  Card,
  Button,
  Container,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "@/componenets/footer/Footer";
import "@/app/globals.css";
import Cookies from "js-cookie";
import {
  faAward,
  faBell,
  faCheck,
  faL,
  faStar,
  faTruck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API } from "../page";
import Swal from "sweetalert2";
import { useCart } from "@/app/cartContext";
import Gpay from "../../../public/gpay.svg";
import phonepay from "../../../public/phonepay.svg";
import paypal from "../../../public/PayPal.svg.png";

const Order_place = () => {
  const { dispatch } = useCart();
  const Countries = [
    { name: "Afghanistan", code: "AF" },
    { name: "land Islands", code: "AX" },
    { name: "Albania", code: "AL" },
    { name: "Algeria", code: "DZ" },
    { name: "American Samoa", code: "AS" },
    { name: "AndorrA", code: "AD" },
    { name: "Angola", code: "AO" },
    { name: "Anguilla", code: "AI" },
    { name: "Antarctica", code: "AQ" },
    { name: "Antigua and Barbuda", code: "AG" },
    { name: "Argentina", code: "AR" },
    { name: "Armenia", code: "AM" },
    { name: "Aruba", code: "AW" },
    { name: "Australia", code: "AU" },
    { name: "Austria", code: "AT" },
    { name: "Azerbaijan", code: "AZ" },
    { name: "Bahamas", code: "BS" },
    { name: "Bahrain", code: "BH" },
    { name: "Bangladesh", code: "BD" },
    { name: "Barbados", code: "BB" },
    { name: "Belarus", code: "BY" },
    { name: "Belgium", code: "BE" },
    { name: "Belize", code: "BZ" },
    { name: "Benin", code: "BJ" },
    { name: "Bermuda", code: "BM" },
    { name: "Bhutan", code: "BT" },
    { name: "Bolivia", code: "BO" },
    { name: "Bosnia and Herzegovina", code: "BA" },
    { name: "Botswana", code: "BW" },
    { name: "Bouvet Island", code: "BV" },
    { name: "Brazil", code: "BR" },
    { name: "British Indian Ocean Territory", code: "IO" },
    { name: "Brunei Darussalam", code: "BN" },
    { name: "Bulgaria", code: "BG" },
    { name: "Burkina Faso", code: "BF" },
    { name: "Burundi", code: "BI" },
    { name: "Cambodia", code: "KH" },
    { name: "Cameroon", code: "CM" },
    { name: "Canada", code: "CA" },
    { name: "Cape Verde", code: "CV" },
    { name: "Cayman Islands", code: "KY" },
    { name: "Central African Republic", code: "CF" },
    { name: "Chad", code: "TD" },
    { name: "Chile", code: "CL" },
    { name: "China", code: "CN" },
    { name: "Christmas Island", code: "CX" },
    { name: "Cocos (Keeling) Islands", code: "CC" },
    { name: "Colombia", code: "CO" },
    { name: "Comoros", code: "KM" },
    { name: "Congo", code: "CG" },
    { name: "Congo, The Democratic Republic of the", code: "CD" },
    { name: "Cook Islands", code: "CK" },
    { name: "Costa Rica", code: "CR" },
    { name: 'Cote D"Ivoire', code: "CI" },
    { name: "Croatia", code: "HR" },
    { name: "Cuba", code: "CU" },
    { name: "Cyprus", code: "CY" },
    { name: "Czech Republic", code: "CZ" },
    { name: "Denmark", code: "DK" },
    { name: "Djibouti", code: "DJ" },
    { name: "Dominica", code: "DM" },
    { name: "Dominican Republic", code: "DO" },
    { name: "Ecuador", code: "EC" },
    { name: "Egypt", code: "EG" },
    { name: "El Salvador", code: "SV" },
    { name: "Equatorial Guinea", code: "GQ" },
    { name: "Eritrea", code: "ER" },
    { name: "Estonia", code: "EE" },
    { name: "Ethiopia", code: "ET" },
    { name: "Falkland Islands (Malvinas)", code: "FK" },
    { name: "Faroe Islands", code: "FO" },
    { name: "Fiji", code: "FJ" },
    { name: "Finland", code: "FI" },
    { name: "France", code: "FR" },
    { name: "French Guiana", code: "GF" },
    { name: "French Polynesia", code: "PF" },
    { name: "French Southern Territories", code: "TF" },
    { name: "Gabon", code: "GA" },
    { name: "Gambia", code: "GM" },
    { name: "Georgia", code: "GE" },
    { name: "Germany", code: "DE" },
    { name: "Ghana", code: "GH" },
    { name: "Gibraltar", code: "GI" },
    { name: "Greece", code: "GR" },
    { name: "Greenland", code: "GL" },
    { name: "Grenada", code: "GD" },
    { name: "Guadeloupe", code: "GP" },
    { name: "Guam", code: "GU" },
    { name: "Guatemala", code: "GT" },
    { name: "Guernsey", code: "GG" },
    { name: "Guinea", code: "GN" },
    { name: "Guinea-Bissau", code: "GW" },
    { name: "Guyana", code: "GY" },
    { name: "Haiti", code: "HT" },
    { name: "Heard Island and Mcdonald Islands", code: "HM" },
    { name: "Holy See (Vatican City State)", code: "VA" },
    { name: "Honduras", code: "HN" },
    { name: "Hong Kong", code: "HK" },
    { name: "Hungary", code: "HU" },
    { name: "Iceland", code: "IS" },
    { name: "India", code: "IN" },
    { name: "Indonesia", code: "ID" },
    { name: "Iran, Islamic Republic Of", code: "IR" },
    { name: "Iraq", code: "IQ" },
    { name: "Ireland", code: "IE" },
    { name: "Isle of Man", code: "IM" },
    { name: "Israel", code: "IL" },
    { name: "Italy", code: "IT" },
    { name: "Jamaica", code: "JM" },
    { name: "Japan", code: "JP" },
    { name: "Jersey", code: "JE" },
    { name: "Jordan", code: "JO" },
    { name: "Kazakhstan", code: "KZ" },
    { name: "Kenya", code: "KE" },
    { name: "Kiribati", code: "KI" },
    { name: 'Korea, Democratic People"S Republic of', code: "KP" },
    { name: "Korea, Republic of", code: "KR" },
    { name: "Kuwait", code: "KW" },
    { name: "Kyrgyzstan", code: "KG" },
    { name: 'Lao People"S Democratic Republic', code: "LA" },
    { name: "Latvia", code: "LV" },
    { name: "Lebanon", code: "LB" },
    { name: "Lesotho", code: "LS" },
    { name: "Liberia", code: "LR" },
    { name: "Libyan Arab Jamahiriya", code: "LY" },
    { name: "Liechtenstein", code: "LI" },
    { name: "Lithuania", code: "LT" },
    { name: "Luxembourg", code: "LU" },
    { name: "Macao", code: "MO" },
    { name: "Macedonia, The Former Yugoslav Republic of", code: "MK" },
    { name: "Madagascar", code: "MG" },
    { name: "Malawi", code: "MW" },
    { name: "Malaysia", code: "MY" },
    { name: "Maldives", code: "MV" },
    { name: "Mali", code: "ML" },
    { name: "Malta", code: "MT" },
    { name: "Marshall Islands", code: "MH" },
    { name: "Martinique", code: "MQ" },
    { name: "Mauritania", code: "MR" },
    { name: "Mauritius", code: "MU" },
    { name: "Mayotte", code: "YT" },
    { name: "Mexico", code: "MX" },
    { name: "Micronesia, Federated States of", code: "FM" },
    { name: "Moldova, Republic of", code: "MD" },
    { name: "Monaco", code: "MC" },
    { name: "Mongolia", code: "MN" },
    { name: "Montenegro", code: "ME" },
    { name: "Montserrat", code: "MS" },
    { name: "Morocco", code: "MA" },
    { name: "Mozambique", code: "MZ" },
    { name: "Myanmar", code: "MM" },
    { name: "Namibia", code: "NA" },
    { name: "Nauru", code: "NR" },
    { name: "Nepal", code: "NP" },
    { name: "Netherlands", code: "NL" },
    { name: "Netherlands Antilles", code: "AN" },
    { name: "New Caledonia", code: "NC" },
    { name: "New Zealand", code: "NZ" },
    { name: "Nicaragua", code: "NI" },
    { name: "Niger", code: "NE" },
    { name: "Nigeria", code: "NG" },
    { name: "Niue", code: "NU" },
    { name: "Norfolk Island", code: "NF" },
    { name: "Northern Mariana Islands", code: "MP" },
    { name: "Norway", code: "NO" },
    { name: "Oman", code: "OM" },
    { name: "Pakistan", code: "PK" },
    { name: "Palau", code: "PW" },
    { name: "Palestinian Territory, Occupied", code: "PS" },
    { name: "Panama", code: "PA" },
    { name: "Papua New Guinea", code: "PG" },
    { name: "Paraguay", code: "PY" },
    { name: "Peru", code: "PE" },
    { name: "Philippines", code: "PH" },
    { name: "Pitcairn", code: "PN" },
    { name: "Poland", code: "PL" },
    { name: "Portugal", code: "PT" },
    { name: "Puerto Rico", code: "PR" },
    { name: "Qatar", code: "QA" },
    { name: "Reunion", code: "RE" },
    { name: "Romania", code: "RO" },
    { name: "Russian Federation", code: "RU" },
    { name: "RWANDA", code: "RW" },
    { name: "Saint Helena", code: "SH" },
    { name: "Saint Kitts and Nevis", code: "KN" },
    { name: "Saint Lucia", code: "LC" },
    { name: "Saint Pierre and Miquelon", code: "PM" },
    { name: "Saint Vincent and the Grenadines", code: "VC" },
    { name: "Samoa", code: "WS" },
    { name: "San Marino", code: "SM" },
    { name: "Sao Tome and Principe", code: "ST" },
    { name: "Saudi Arabia", code: "SA" },
    { name: "Senegal", code: "SN" },
    { name: "Serbia", code: "RS" },
    { name: "Seychelles", code: "SC" },
    { name: "Sierra Leone", code: "SL" },
    { name: "Singapore", code: "SG" },
    { name: "Slovakia", code: "SK" },
    { name: "Slovenia", code: "SI" },
    { name: "Solomon Islands", code: "SB" },
    { name: "Somalia", code: "SO" },
    { name: "South Africa", code: "ZA" },
    { name: "South Georgia and the South Sandwich Islands", code: "GS" },
    { name: "Spain", code: "ES" },
    { name: "Sri Lanka", code: "LK" },
    { name: "Sudan", code: "SD" },
    { name: "Suriname", code: "SR" },
    { name: "Svalbard and Jan Mayen", code: "SJ" },
    { name: "Swaziland", code: "SZ" },
    { name: "Sweden", code: "SE" },
    { name: "Switzerland", code: "CH" },
    { name: "Syrian Arab Republic", code: "SY" },
    { name: "Taiwan, Province of China", code: "TW" },
    { name: "Tajikistan", code: "TJ" },
    { name: "Tanzania, United Republic of", code: "TZ" },
    { name: "Thailand", code: "TH" },
    { name: "Timor-Leste", code: "TL" },
    { name: "Togo", code: "TG" },
    { name: "Tokelau", code: "TK" },
    { name: "Tonga", code: "TO" },
    { name: "Trinidad and Tobago", code: "TT" },
    { name: "Tunisia", code: "TN" },
    { name: "Turkey", code: "TR" },
    { name: "Turkmenistan", code: "TM" },
    { name: "Turks and Caicos Islands", code: "TC" },
    { name: "Tuvalu", code: "TV" },
    { name: "Uganda", code: "UG" },
    { name: "Ukraine", code: "UA" },
    { name: "United Arab Emirates", code: "AE" },
    { name: "United Kingdom", code: "GB" },
    { name: "United States", code: "US" },
    { name: "United States Minor Outlying Islands", code: "UM" },
    { name: "Uruguay", code: "UY" },
    { name: "Uzbekistan", code: "UZ" },
    { name: "Vanuatu", code: "VU" },
    { name: "Venezuela", code: "VE" },
    { name: "Viet Nam", code: "VN" },
    { name: "Virgin Islands, British", code: "VG" },
    { name: "Virgin Islands, U.S.", code: "VI" },
    { name: "Wallis and Futuna", code: "WF" },
    { name: "Western Sahara", code: "EH" },
    { name: "Yemen", code: "YE" },
    { name: "Zambia", code: "ZM" },
    { name: "Zimbabwe", code: "ZW" },
  ];
  const token = Cookies.get("fmljwt");
  const navigate = useRouter();
  const [section1Expanded, setSection1Expanded] = useState(
    token == undefined ? true : false
  );
  const [section2Expanded, setSection2Expanded] = useState(
    token !== undefined ? true : false
  );
  const [section3Expanded, setSection3Expanded] = useState(false);
  const [section4Expanded, setSection4Expanded] = useState(false);
  const [section5Expanded, setSection5Expanded] = useState(false);
  const [section6Expanded, setSection6Expanded] = useState(false);
  const [section7Expanded, setSection7Expanded] = useState(false);
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
  const [cartItem, setCartItems] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState("Google Pay");
  const [Delivery_address, setDelivery_address] = useState({
    name: "",
    street_no: "",
    contry_name: "",
    city_name: "",
    state: "",
    pinCode: 0,
    Mobile_no: 0,
  });

  const [Final_Order_Product, setOrder_Product] = useState({
    order_id: [],
    Address: {},
    Total_price: 0,
  });

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
      Cookies.set("fmljwt", result.data.data.auth, {
        expires: new Date(Date.now() + 30 * 60 * 1000),
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: result.data.data.response_message,
        showConfirmButton: false,
        timer: 1500,
      });
      localStorage.setItem("name", result.data.data.data.name);
      navigate.push("/");
    } else {
      setvalidated(true);
    }
  };

  const handleAccordionButtonClick = (section) => {
    if (section === "UPI") {
      setSection5Expanded(true);
      setSection6Expanded(false);
      setSection7Expanded(false);
    } else if (section === "payPal") {
      setSection5Expanded(false);
      setSection6Expanded(true);
      setSection7Expanded(false);
    } else if (section === "cashOnDelivery") {
      setSection5Expanded(false);
      setSection6Expanded(false);
      setSection7Expanded(true);
    }
  };

  const deliveryAddhendler = (e) => {
    setDelivery_address({
      ...Delivery_address,
      [e.target.name]: e.target.value,
    });
  };

  const DeliveryAddress = () => {
    if (
      Delivery_address.name !== "" ||
      Delivery_address.street_no !== "" ||
      Delivery_address.contry_name !== "" ||
      Delivery_address.city_name !== "" ||
      Delivery_address.state !== "" ||
      Delivery_address.pinCode !== 0 ||
      Delivery_address.Mobile_no !== 0
    ) {
      setSection2Expanded(false);
      setSection3Expanded(true);
    } else {
      setvalidated(true);
    }
  };

  const Order_summary = () => {
    setSection3Expanded(false);
    setSection4Expanded(true);
    setSection5Expanded(true);
    setSection6Expanded(false);
    setSection7Expanded(false);
  };

  const handleQuantityChange = (index, operation) => {
    const updatedCart = [...cartItem];
    const item = updatedCart[index];

    if (operation === "add") {
      item.quantity = Math.min((item.quantity || 1) + 1, 10);
    } else if (operation === "subtract") {
      item.quantity = Math.max(item.quantity - 1, 1);
    }

    item.Qty = item.quantity;
    setCartItems(updatedCart);
    localStorage.setItem("AddTocart", JSON.stringify(updatedCart));
  };

  let totalProductPrice;
  const updateFinalTotal = (item) => {
    const allProducts = JSON.parse(localStorage.getItem("AddTocart"));
    if (!allProducts || allProducts.length === 0) {
      console.log("No products in the cart");
      return;
    }

    totalProductPrice = allProducts.reduce((acc, val) => {
      const price = parseFloat(
        val.Product_price.replace("₹", "").replace(",", "")
      );
      return acc + price * val.Qty;
    }, 0);
  };

  const calculateTotalPrice = (item) => {
    const price = parseFloat(
      item.Product_price.replace("₹", "").replace(",", "")
    );
    const quantity = item.quantity || 1;
    updateFinalTotal((price * quantity).toFixed(2));
    return (price * quantity).toFixed(2);
  };

  const removeItem = (productId) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { id: productId },
    });

    // Update localStorage
    const updatedCart = cartItem.filter((item) => item._id !== productId);
    localStorage.setItem("AddTocart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  let OrderID = [];
  const PlcaeOrder = (payment_method) => {
    if (payment_method === "cashOnDelivery") {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success ",
          cancelButton: "btn me-2 btn-danger",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: "Confirm Cash on Delivery Order ",
          text: "pay Via Cash/UPI or ATM card when you receive Your Order",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Confirm Order",
          cancelButtonText: "cancel",
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
              title: "Order Confirm",
              icon: "success",
            });
            console.log("order recevied.....");
          }
          const allProducts = JSON.parse(localStorage.getItem("AddTocart"));
          OrderID = [];
          allProducts.map((val) => {
            OrderID.push(val._id);
          });

          const Form = new FormData();
          Form.append("orderID", localStorage.getItem("AddTocart"));
          Form.append("Address", JSON.stringify(Delivery_address));
          Form.append("Final_price", totalProductPrice);
          const response = await API.post(
            "http://localhost:2023/api/products/order/place/products",
            Form,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (response.data.status == true) {
            localStorage.setItem("AddTocart", JSON.stringify([]));
            navigate.push("/");
          }
        });
    }
  };

  const phonepayhandle = async (amaount) => {
    const Form = new FormData();
    Form.append("MUID", "MUID" + Date.now());
    Form.append("transactionId", "T" + Date.now());
    Form.append("amount", amaount);
    const response = await API.post(
      "http://localhost:2023/api/products/order/payment",
      Form,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    navigate.push(response.data);
    localStorage.setItem("AddTocart", JSON.stringify([]));
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("email") || "";
    const storedRemeber = localStorage.getItem("remeber") === "true";
    setEmail(storedEmail);
    setRemeber(storedRemeber);
    const storedCartItems = JSON.parse(localStorage.getItem("AddTocart")) || [];
    setCartItems(storedCartItems);
  }, []);

  return (
    <>
      <Header />
      <section style={{ marginTop: "100px" }}>
        <Container>
          <Card style={{ border: "none" }}>
            <Card.Body className="order-place w-100 d-flex justify-content-between gap-5">
              <div
                className="accordion"
                style={{ width: "100%" }}
                id="myAccordion"
              >
                <div className="accordion-item">
                  <h2 className="accordion-header" id="section1Header">
                    <button
                      className={`accordion-button ${
                        section1Expanded ? "" : "collapsed"
                      }`}
                      type="button"
                      disabled={token !== undefined ? true : false}
                      // onClick={() => handleAccordionButtonClick("login")}
                      aria-expanded={section1Expanded}
                      aria-controls="login"
                    >
                      <span>
                        {token !== undefined ? (
                          <FontAwesomeIcon
                            icon={faCheck}
                            style={{ color: "green" }}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faXmark}
                            style={{ color: "red" }}
                          />
                        )}
                      </span>
                      <span className="ms-2">LOGIN OR SIGNUP</span>
                    </button>
                  </h2>
                  <div
                    id="section1"
                    className={`accordion-collapse collapse ${
                      section1Expanded ? "show" : ""
                    }`}
                    aria-labelledby="section1Header"
                    data-bs-parent="#myAccordion"
                  >
                    <div className="accordion-body">
                      <Link href={"/register"}>Register now ?</Link>
                      <Form
                        className="row g-3 needs-validation"
                        noValidate
                        validated={validated}
                      >
                        <div>
                          <Form.Group className="mt-3 ">
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
                        <div>
                          <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              type="password"
                              className="my-2 w-100"
                              placeholder="Enter Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
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
                      </Form>
                      <div>
                        <Form.Group
                          className="mb-1"
                          controlId="formBasicCheckbox"
                        >
                          <Form.Check
                            type="checkbox"
                            className="mt-3"
                            label="Remember Me"
                            checked={remeber == true ? true : false}
                            onChange={(e) => Remeber(e)}
                            required
                          />
                        </Form.Group>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end align-items-center p-2">
                      <Button
                        variant="primary"
                        type="button"
                        onClick={LoginData}
                      >
                        Sign In
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="section2Header">
                    <button
                      className={`accordion-button ${
                        section2Expanded ? "" : "collapsed"
                      }`}
                      type="button"
                      // onClick={() => handleAccordionButtonClick("Delivery")}
                      aria-expanded={section2Expanded}
                      aria-controls="Delivery"
                      disabled={token !== undefined ? false : true}
                    >
                      DELIVERY ADDRESS
                    </button>
                  </h2>
                  <div
                    id="Delivery"
                    className={`accordion-collapse collapse ${
                      section2Expanded ? "show" : ""
                    }`}
                    aria-labelledby="section2Header"
                    data-bs-parent="#myAccordion"
                  >
                    <div className="accordion-body">
                      <Form
                        className="row g-3 needs-validation"
                        noValidate
                        validated={validated}
                      >
                        <Row>
                          <Col xs={12}>
                            <Form.Group className="mt-3 ">
                              <Form.Control
                                type="text"
                                name="name"
                                className="my-2 w-100"
                                placeholder="Full name (First and Last name)"
                                required
                                onChange={deliveryAddhendler}
                              />
                              <Form.Control.Feedback type="invalid">
                                Name Is Required.
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col xs={12}>
                            <Form.Group className="mt-3 ">
                              <Form.Control
                                type="text"
                                name="street_no"
                                className="my-2 w-100"
                                placeholder="Street number"
                                required
                                onChange={deliveryAddhendler}
                              />
                              <Form.Control.Feedback type="invalid">
                                street_no Is Required.
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col xs={12}>
                            <Form.Group className="mt-3 ">
                              <Form.Select
                                onChange={deliveryAddhendler}
                                name="contry_name"
                                required
                              >
                                <option value="">Select Country</option>
                                {Countries.map((val, i) => {
                                  return (
                                    <option key={i} value={val.name}>
                                      {val.name}
                                    </option>
                                  );
                                })}
                              </Form.Select>
                              <Form.Control.Feedback type="invalid">
                                contry_name Is Required.
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col xs={12}>
                            <Form.Group className="mt-3 ">
                              <Form.Control
                                type="text"
                                name="city_name"
                                className="my-2 w-100"
                                placeholder="City"
                                required
                                onChange={deliveryAddhendler}
                              />
                              <Form.Control.Feedback type="invalid">
                                city_name Is Required.
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col xs={12}>
                            <Form.Group className="mt-3 ">
                              <Form.Control
                                type="text"
                                name="state"
                                className="my-2 w-100"
                                placeholder="State / Province / Region"
                                required
                                onChange={deliveryAddhendler}
                              />
                              <Form.Control.Feedback type="invalid">
                                State / Province / Region Is Required.
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col xs={12}>
                            <Form.Group className="mt-3 ">
                              <Form.Control
                                type="number"
                                name="pinCode"
                                className="my-2 w-100"
                                placeholder="PIN Code"
                                required
                                onChange={deliveryAddhendler}
                              />
                              <Form.Control.Feedback type="invalid">
                                PIN Code Is Required.
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col xs={12}>
                            <Form.Group className="mt-3 ">
                              <Form.Control
                                type="number"
                                name="Mobile_no"
                                className="my-2 w-100"
                                placeholder="Phone number"
                                required
                                onChange={deliveryAddhendler}
                              />
                              <Form.Control.Feedback type="invalid">
                                Mobile_no Is Required.
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                    <div className="d-flex justify-content-end align-items-center p-3">
                      <Button onClick={DeliveryAddress}>Contiune</Button>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="section2Header">
                    <button
                      className={`accordion-button ${
                        section3Expanded ? "" : "collapsed"
                      }`}
                      type="button"
                      onClick={() => handleAccordionButtonClick("Ordersummary")}
                      aria-expanded={section3Expanded}
                      aria-controls="Ordersummary"
                      disabled={token !== undefined ? false : true}
                    >
                      ORDER SUMMARY
                    </button>
                  </h2>
                  <div
                    id="Ordersummary"
                    className={`accordion-collapse collapse ${
                      section3Expanded ? "show" : ""
                    }`}
                    aria-labelledby="section2Header"
                    data-bs-parent="#myAccordion"
                  >
                    <div className="accordion-body">
                      <div>
                        <span>Deliver To: {Delivery_address.name}</span>
                        <p>
                          {Delivery_address.street_no} {Delivery_address.city}{" "}
                          {Delivery_address.state} {Delivery_address.pinCode}{" "}
                          {Delivery_address.contry_name}
                        </p>
                        <p>{Delivery_address.Mobile_no}</p>
                        <p>
                          <Button
                            onClick={() => {
                              setSection2Expanded(true);
                              setSection3Expanded(false);
                            }}
                          >
                            Change Address
                          </Button>
                        </p>
                      </div>
                      {cartItem.map((val, i) => {
                        return (
                          <div className="border p-2 d-flex justify-content-between m-1">
                            <div>
                              <p>Name: {val.Product_name}</p>
                              <p>Quantity: {val.quantity}</p>
                              <p>Price: {val.Product_price}</p>
                              <div>
                                <p className="text-success">
                                  Total : {`₹ ${calculateTotalPrice(val)}`}
                                </p>
                                <Button
                                  variant="danger"
                                  onClick={() => removeItem(val._id)}
                                >
                                  Cancel Order
                                </Button>
                              </div>
                            </div>
                            <div>
                              <img
                                src={val.product_image}
                                width={90}
                                height={90}
                              />
                              <div className="mt-1">
                                <Button
                                  onClick={() =>
                                    handleQuantityChange(i, "subtract")
                                  }
                                  style={{ width: "30px", textAlign: "center" }}
                                >
                                  -
                                </Button>
                                <input
                                  type="text"
                                  style={{
                                    width: "40px",
                                    margin: "3px",
                                    textAlign: "center",
                                  }}
                                  value={val.quantity || 1}
                                  readOnly
                                />
                                <Button
                                  onClick={(e) =>
                                    handleQuantityChange(i, "add")
                                  }
                                  style={{ width: "30px", textAlign: "center" }}
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="d-flex justify-content-end align-items-center p-3">
                      <Button onClick={() => Order_summary()}>Contiune</Button>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="section2Header">
                    <button
                      className={`accordion-button ${
                        section4Expanded ? "" : "collapsed"
                      }`}
                      type="button"
                      // onClick={() => handleAccordionButtonClick("PaymentOrder")}
                      aria-expanded={section4Expanded}
                      aria-controls="PaymentOrder"
                      disabled={token !== undefined ? false : true}
                    >
                      PAYMENT OPTION (100% Secure)
                    </button>
                  </h2>
                  <div
                    id="PaymentOrder"
                    className={`accordion-collapse collapse ${
                      section4Expanded ? "show" : ""
                    }`}
                    aria-labelledby="section2Header"
                    data-bs-parent="#myAccordion"
                  >
                    <div className="accordion-body">
                      <div className="d-flex justify-content-between">
                        <span>Total Amount : ₹{totalProductPrice}</span>
                        <Button
                          onClick={() => {
                            setSection4Expanded(false);
                            setSection3Expanded(true);
                          }}
                        >
                          View Summary
                        </Button>
                      </div>
                      <div>
                        <div
                          className="accordion"
                          style={{ width: "100%" }}
                          id="myAccordion"
                        >
                          <div className="accordion-item m-1">
                            <h4
                              className="accordion-header"
                              id="section5Header"
                            >
                              <button
                                className={`accordion-button ${
                                  section5Expanded ? "" : "collapsed"
                                }`}
                                type="button"
                                onClick={() =>
                                  handleAccordionButtonClick("UPI")
                                }
                                aria-expanded={section5Expanded}
                                aria-controls="UPI"
                              >
                                UPI
                              </button>
                            </h4>
                            <div
                              id="UPI"
                              className={`accordion-collapse collapse ${
                                section5Expanded ? "show" : ""
                              }`}
                              aria-labelledby="section5Header"
                              data-bs-parent="#myAccordion"
                            >
                              <div className="accordion-body">
                                <div className="border p-3 mb-2">
                                  <div className="d-flex justify-content-between">
                                    <div className="d-flex gap-3">
                                      <Form.Check
                                        type="radio"
                                        value="Google Pay"
                                        checked={
                                          selectedPayment === "Google Pay"
                                        }
                                        onChange={handlePaymentChange}
                                      />
                                      <span>Google Pay</span>
                                    </div>
                                    <img
                                      src={Gpay.src}
                                      width={40}
                                      height={30}
                                      alt="gpay"
                                    />
                                  </div>
                                  {selectedPayment === "Google Pay" && (
                                    <div className="text-center">
                                      <Button variant="warning">
                                        Pay ₹{totalProductPrice}
                                      </Button>
                                    </div>
                                  )}
                                </div>
                                <div className="border p-3">
                                  <div className="d-flex justify-content-between">
                                    <div className="d-flex gap-3">
                                      <Form.Check
                                        type="radio"
                                        value="Phone Pay"
                                        checked={
                                          selectedPayment === "Phone Pay"
                                        }
                                        onChange={handlePaymentChange}
                                      />
                                      <span>Phone Pay</span>
                                    </div>
                                    <img
                                      src={phonepay.src}
                                      width={40}
                                      height={30}
                                      alt="phone pay"
                                    />
                                  </div>
                                  {selectedPayment === "Phone Pay" && (
                                    <div className="text-center">
                                      <Button
                                        variant="warning"
                                        onClick={() =>
                                          phonepayhandle(totalProductPrice)
                                        }
                                      >
                                        Pay ₹{totalProductPrice}
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="accordion"
                          style={{ width: "100%" }}
                          id="myAccordion"
                        >
                          <div className="accordion-item m-1">
                            <h6
                              className="accordion-header"
                              id="section6Header"
                            >
                              <button
                                className={`accordion-button ${
                                  section6Expanded ? "" : "collapsed"
                                }`}
                                type="button"
                                onClick={() =>
                                  handleAccordionButtonClick("payPal")
                                }
                                aria-expanded={section6Expanded}
                                aria-controls="payPal"
                              >
                                Pay Pal
                              </button>
                            </h6>
                            <div
                              id="payPal"
                              className={`accordion-collapse collapse ${
                                section6Expanded ? "show" : ""
                              }`}
                              aria-labelledby="section6Header"
                              data-bs-parent="#myAccordion"
                            >
                              <div className="accordion-body">
                                Your Total Pay pal{" "}
                                <span className="text-success">
                                  ₹{totalProductPrice}
                                </span>
                                <div>
                                  <Button
                                    variant="outline-ligth"
                                    className="border mt-2"
                                  >
                                    <img
                                      src={paypal.src}
                                      width={140}
                                      height={30}
                                      alt="paypal"
                                    />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="accordion"
                          style={{ width: "100%" }}
                          id="myAccordion"
                        >
                          <div className="accordion-item">
                            <h4
                              className="accordion-header"
                              id="section7Header"
                            >
                              <button
                                className={`accordion-button ${
                                  section7Expanded ? "" : "collapsed"
                                }`}
                                type="button"
                                onClick={() =>
                                  handleAccordionButtonClick("cashOnDelivery")
                                }
                                aria-expanded={section7Expanded}
                                aria-controls="cashOnDelivery"
                              >
                                Cash on Delivery
                              </button>
                            </h4>
                            <div
                              id="cashOnDelivery"
                              className={`accordion-collapse collapse ${
                                section7Expanded ? "show" : ""
                              }`}
                              aria-labelledby="section7Header"
                              data-bs-parent="#myAccordion"
                            >
                              <div className="accordion-body">
                                Your Total Pay{" "}
                                <span className="text-success">
                                  ₹{totalProductPrice}
                                </span>{" "}
                                Due to handling cost, a nominal fee ₹5 will be
                                charged.
                                <div className="text-center mt-2">
                                  <Button
                                    variant="warning"
                                    onClick={() => PlcaeOrder("cashOnDelivery")}
                                  >
                                    Place Order
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
              <div
                className="accordion"
                style={{ width: "100%" }}
                id="myAccordion"
              >
                <FontAwesomeIcon icon={faAward} className="fs-2 mt-4 me-3" />
                <p className="mt-3">
                  Safe and Secure Payments. Easy returns. 100% Authentic
                  products.
                </p>
                <p>
                  <FontAwesomeIcon icon={faTruck} className="fs-4 mt-4 me-3" />
                  Easily Track Orders, Hassle free Returns
                </p>
                <p>
                  <FontAwesomeIcon icon={faBell} className="fs-4 mt-4 me-3" />
                  Get Relevant Alerts and Recommendation
                </p>
                <p>
                  <FontAwesomeIcon icon={faStar} className="fs-4 mt-4 me-3" />
                  Wishlist, Reviews, Ratings and more.
                </p>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </section>
    </>
  );
};

export default Order_place;
