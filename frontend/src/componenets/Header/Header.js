"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "@/app/Header.module.css";
import {
  Button,
  Col,
  Container,
  Dropdown,
  Modal,
  Nav,
  NavDropdown,
  Navbar,
  Row,
  Table,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { API } from "@/app/page";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";
import Image from "next/image";
import ImgeUrl from "../../../public/logo.png";
import { useCart } from "@/app/cartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faShoppingCart,
  faTrash,
  faHeart,
  faTip,
  faBars,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import DataNotFound from "../DataNotFound";
import "@/app/globals.css";

function Header() {
  const token = Cookies.get("fmljwt");
  const navigate = useRouter();
  const { state, dispatch } = useCart();
  const [show, setShow] = useState(false);
  const [ViewCart, setViewCart] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const ViewhandleClose = () => setViewCart(false);
  const handleShow = () => {
    setShow(true);
  };

  const handleShowViewCart = () => {
    setViewCart(true);
    handleClose()
  };

  const [Man_cat, setMan_cat] = useState([]);
  const [Woman_cat, setWoman_cat] = useState([]);
  const [Electroninc_category, setElectroninc_category] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  // Side Menu ****************
  const [isMenuVisible, setMenuVisible] = useState(false);

  const handleMenuBarClick = () => {
    setMenuVisible(!isMenuVisible);
  };

  const handleMenuToggleClick = () => {
    setMenuVisible(false);
  };

  // ******************* Category Dropdown **********************************
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNestedDropdown, setShowNestedDropdown] = useState(false);
  const [showNestedDropdown1, setShowNestedDropdown1] = useState(false);
  const [showNestedDropdown2, setShowNestedDropdown2] = useState(false);
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showNestedDropdown3, setShowNestedDropdown3] = useState(false);
  const [showNestedDropdown4, setShowNestedDropdown4] = useState(false);
  const [showNestedDropdown5, setShowNestedDropdown5] = useState(false);

  const dropdownRef = useRef(null);
  const nestedDropdownRef = useRef(null);
  const dropdownRef1 = useRef(null);
  const nestedDropdownRef1 = useRef(null);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleNestedDropdownToggle = () => {
    setShowNestedDropdown(!showNestedDropdown);
  };

  const handleNestedDropdownToggle1 = () => {
    setShowNestedDropdown1(!showNestedDropdown1);
  };
  const handleNestedDropdownToggle2 = () => {
    setShowNestedDropdown2(!showNestedDropdown2);
  };

  const handleDropdownToggle1 = () => {
    setShowDropdown1(!showDropdown1);
  };

  const handleNestedDropdownToggle3 = () => {
    setShowNestedDropdown3(!showNestedDropdown3);
  };

  const handleNestedDropdownToggle4 = () => {
    setShowNestedDropdown4(!showNestedDropdown4);
  };
  const handleNestedDropdownToggle5 = () => {
    setShowNestedDropdown5(!showNestedDropdown5);
  };

  const logoutFunc = async () => {
    if (token) {
      const response = await API.post(
        "http://localhost:2023/api/user/account/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status == 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.data.response_message,
          showConfirmButton: false,
          timer: 1500,
        });
        Cookies.remove("fmljwt");
        navigate.push("/");
      } else {
        navigate.push("/home");
      }
    }
  };

  const Man_category_get = async () => {
    try {
      const response = await API.post(
        "http://localhost:2023/api/products/man/get/category",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMan_cat(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const WOMan_category_get = async () => {
    try {
      const response = await API.post(
        "http://localhost:2023/api/products/WOman/get/category",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWoman_cat(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const Electroninc_category_category_get = async () => {
    const response = await API.post(
      "http://localhost:2023/api/products/Electroninc/get/category",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setElectroninc_category(response.data.data);
  };

  const categoryID = async (id, product) => {
    navigate.push(`/Men_woman_products/${product}/${id}`);
  };

  const handleQuantityChange = (index, operation) => {
    const updatedCart = [...cartItems];
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

  const removeItem = (productId) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { id: productId },
    });

    // Update localStorage
    const updatedCart = cartItems.filter((item) => item._id !== productId);
    localStorage.setItem("AddTocart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const calculateTotalPrice = (item) => {
    const price = parseFloat(
      item.Product_price.replace("₹", "").replace(",", "")
    );
    const quantity = item.quantity || 1;
    return (price * quantity).toFixed(2);
  };

  // const calculateTotalOrderPrice = () => {
  //   return cartItems
  //     .reduce((total, item) => {
  //       const itemPrice = parseFloat(
  //         item.Product_price.replace("₹", "").replace(",", "")
  //       );
  //       const itemQuantity = item.quantity || 1;
  //       return total + itemPrice * itemQuantity;
  //     }, 0)
  //     .toFixed(2);
  // };

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("AddTocart")) || [];
    setCartItems(storedCartItems);
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        nestedDropdownRef.current &&
        !nestedDropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
        setShowNestedDropdown(false);
        setShowNestedDropdown1(false);
      }
    };

    const handleClickOutside1 = (event) => {
      if (
        dropdownRef1.current &&
        !dropdownRef1.current.contains(event.target) &&
        nestedDropdownRef1.current &&
        !nestedDropdownRef1.current.contains(event.target)
      ) {
        setShowDropdown1(false);
        setShowNestedDropdown(false);
        setShowNestedDropdown1(false);
      }
    };
    Man_category_get();
    WOMan_category_get();
    Electroninc_category_category_get();

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutside1);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutside1);
    };
  }, [state.cartItems]);
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="navbar">
            <div className="logo">
              <a href="#">
                <Image
                  src={ImgeUrl}
                  alt="My Image"
                  width={150}
                  height={50}
                  className="object-fit-cover"
                />
              </a>
            </div>
            <div className="navbarinn">
              <ul className="nav-lists" id="menu-mobile-menu">
                <li className="menu-item current-menu-item list-unstyled">
                  <div className="dropdown" ref={dropdownRef}>
                    <Link
                      href="#"
                      className="nav-link"
                      onClick={handleDropdownToggle}
                      aria-expanded={showDropdown}
                    >
                      All Category
                    </Link>
                    <Dropdown.Menu
                      show={showDropdown}
                      aria-labelledby="dropdownMenu2"
                    >
                      <Dropdown.Item
                        className="text-dark"
                        type="button"
                        onClick={handleNestedDropdownToggle}
                        ref={nestedDropdownRef}
                      >
                        Man Category
                        <Dropdown.Menu show={showNestedDropdown}>
                          {Man_cat?.map((val, i) => {
                            return (
                              <Dropdown.Item
                                key={i}
                                className="text-dark"
                                type="button"
                                onClick={() =>
                                  categoryID(val._id, val.category_name)
                                }
                              >
                                {val.category_name}
                              </Dropdown.Item>
                            );
                          })}
                        </Dropdown.Menu>
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="text-dark"
                        type="button"
                        onClick={handleNestedDropdownToggle1}
                        ref={nestedDropdownRef}
                      >
                        Woman Category
                        <Dropdown.Menu show={showNestedDropdown1}>
                          {Woman_cat?.map((val, i) => {
                            return (
                              <Dropdown.Item
                                key={i}
                                className="text-dark"
                                type="button"
                                onClick={() =>
                                  categoryID(val._id, val.category_name)
                                }
                              >
                                {val.category_name}
                              </Dropdown.Item>
                            );
                          })}
                        </Dropdown.Menu>
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="text-dark"
                        type="button"
                        onClick={handleNestedDropdownToggle2}
                        ref={nestedDropdownRef}
                      >
                        Electroninc
                        <Dropdown.Menu show={showNestedDropdown2}>
                          {Electroninc_category?.map((val, i) => {
                            return (
                              <Dropdown.Item
                                key={i}
                                className="text-dark"
                                type="button"
                                onClick={() =>
                                  categoryID(val._id, val.category_name)
                                }
                              >
                                {val.category_name}
                              </Dropdown.Item>
                            );
                          })}
                        </Dropdown.Menu>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </div>
                </li>
                {token != undefined ? (
                  <li  className="list-unstyled menu-item">
                  <Link
                    href={`/MyOrder`}
                  >
                    My Order
                  </Link>
                  </li>
                ) : (
                  ""
                )}
                <li className="list-unstyled menu-item">
                <Link href="#mobile-products">
                  Product
                </Link>
                </li>
                <li
                  className="list-unstyled menu-item"
                >
                 <Link href="#company-services">
                  Services
                 </Link>
                </li>
                <li className="list-unstyled menu-item" >
                <Link href="#smart-watches">
                  Watches
                </Link>
                </li>
                <li className="list-unstyled menu-item">
                <Link href="#yearly-sale">
                  Sale
                </Link>
                </li>
                <li className="list-unstyled menu-item">
                <Link href="#latest-blog">
                  Blog
                </Link>
                </li>
                <li className="list-unstyled menu-item">
                <Link href={"#"}>
                  <FontAwesomeIcon
                    onClick={() => handleShow("show")}
                    icon={faShoppingCart}
                    size="lg"
                  />
                </Link>
                  {JSON.parse(localStorage.getItem("AddTocart")) != undefined
                    ? JSON.parse(localStorage.getItem("AddTocart")).length
                    : 0}
                </li>
              </ul>
              <div>
                <Link href="">
                  {token == undefined ? (
                    <Dropdown className="nav-link">
                      <Dropdown.Toggle id="dropdown-autoclose-true">
                        {<FontAwesomeIcon icon={faUser} size="lg" />}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <Link href={"/login"} className="nav-link">
                            login
                          </Link>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    ""
                  )}

                  {token != undefined ? (
                    <Dropdown className="nav-link">
                      <Dropdown.Toggle id="dropdown-autoclose-true">
                        {<FontAwesomeIcon icon={faUser} size="lg" />}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item disabled>
                          {token ? localStorage.getItem("name") : ""}
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link href="/passwordchange" className="text-danger">
                            Password Change
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="text-danger"
                          onClick={logoutFunc}
                        >
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    ""
                  )}
                </Link>
              </div>
            </div>
            <div className="menu-bar" onClick={handleMenuBarClick}>
              <button>Menu</button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`ml-auto ${
          isMenuVisible ? "vs-body-visible vs-menu-wrapper" : "vs-menu-wrapper"
        }`}
      >
        <div className="vs-menu-area bg-dark">
          <button className="vs-menu-toggle" onClick={handleMenuToggleClick}>
            X
          </button>
          <div className="mobile-logo text-center">
            <a
              href="#"
              className="custom-logo-link"
              rel="home"
              aria-current="page"
            >
              <Image
                src={ImgeUrl}
                alt="My Image"
                width={150}
                height={50}
                className="object-fit-cover"
              />
            </a>
          </div>
          <div className="vs-menu-inner-wrap mt-2">
            <nav id="mobile-header-nav" className="vs-mobile-menu">
              <ul className="nav-lists" id="menu-mobile-menu">
                <li className="menu-item current-menu-item list-unstyled">
                  <div className="dropdown" ref={dropdownRef1}>
                    <Link
                      href="#"
                      className="nav-link"
                      onClick={handleDropdownToggle1}
                      aria-expanded={showDropdown1}
                    >
                      All Category
                    </Link>
                    <Dropdown.Menu
                      show={showDropdown1}
                      aria-labelledby="dropdownMenu2"
                    >
                      <Dropdown.Item
                        className="text-dark"
                        type="button"
                        onClick={handleNestedDropdownToggle3}
                        ref={nestedDropdownRef1}
                      >
                        Man Category
                        <Dropdown.Menu show={showNestedDropdown3}>
                          {Man_cat?.map((val, i) => {
                            return (
                              <Dropdown.Item
                                key={i}
                                className="text-dark"
                                type="button"
                                onClick={() =>
                                  categoryID(val._id, val.category_name)
                                }
                              >
                                {val.category_name}
                              </Dropdown.Item>
                            );
                          })}
                        </Dropdown.Menu>
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="text-dark"
                        type="button"
                        onClick={handleNestedDropdownToggle4}
                        ref={nestedDropdownRef1}
                      >
                        Woman Category
                        <Dropdown.Menu show={showNestedDropdown4}>
                          {Woman_cat?.map((val, i) => {
                            return (
                              <Dropdown.Item
                                key={i}
                                className="text-dark"
                                type="button"
                                onClick={() =>
                                  categoryID(val._id, val.category_name)
                                }
                              >
                                {val.category_name}
                              </Dropdown.Item>
                            );
                          })}
                        </Dropdown.Menu>
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="text-dark"
                        type="button"
                        onClick={handleNestedDropdownToggle5}
                        ref={nestedDropdownRef1}
                      >
                        Electroninc
                        <Dropdown.Menu show={showNestedDropdown5}>
                          {Electroninc_category?.map((val, i) => {
                            return (
                              <Dropdown.Item
                                key={i}
                                className="text-dark"
                                type="button"
                                onClick={() =>
                                  categoryID(val._id, val.category_name)
                                }
                              >
                                {val.category_name}
                              </Dropdown.Item>
                            );
                          })}
                        </Dropdown.Menu>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </div>
                </li>
                {token != undefined ? (
                  <li  className="list-unstyled menu-item">
                  <Link
                    href={`/MyOrder`}
                  >
                    My Order
                  </Link>
                  </li> 
                ) : (
                  ""
                )}
                <li className="list-unstyled menu-item">
                <Link href="#mobile-products">
                  Product
                </Link>
                </li>
                <li
                  className="list-unstyled menu-item"
                >
                 <Link href="#company-services">
                  Services
                 </Link>
                </li>
                <li className="list-unstyled menu-item" >
                <Link href="#smart-watches">
                  Watches
                </Link>
                </li>
                <li className="list-unstyled menu-item">
                <Link href="#yearly-sale">
                  Sale
                </Link>
                </li>
                <li className="list-unstyled menu-item">
                <Link href="#latest-blog">
                  Blog
                </Link>
                </li>
                <li className="list-unstyled menu-item">
                  <FontAwesomeIcon
                    onClick={() => {handleShow("show"); handleMenuToggleClick()}}
                    icon={faShoppingCart}
                    size="lg"
                  />
                  {JSON.parse(localStorage.getItem("AddTocart")) != undefined
                    ? JSON.parse(localStorage.getItem("AddTocart")).length
                    : 0}
                </li>
              </ul>
              <div className="">
                <Link href="">
                  {token == undefined ? (
                    <Dropdown className="nav-link">
                      <Dropdown.Toggle id="dropdown-autoclose-true">
                        {<FontAwesomeIcon icon={faUser} size="lg" />}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <Link href={"/login"} className="nav-link">
                            login
                          </Link>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    ""
                  )}

                  {token != undefined ? (
                    <Dropdown className="nav-link">
                      <Dropdown.Toggle id="dropdown-autoclose-true">
                        {<FontAwesomeIcon icon={faUser} size="lg" />}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item disabled>
                          {token ? localStorage.getItem("name") : ""}
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link href="/passwordchange" className="text-danger">
                            Password Change
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="text-danger"
                          onClick={logoutFunc}
                        >
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    ""
                  )}
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <Modal
        style={{ marginTop: "100px" }}
        show={ViewCart}
        onHide={ViewhandleClose}
        backdrop="static"
        keyboard={false}
        size="xl"
      >
        <Modal.Header closeButton onClick={() =>  setShow(true)}>
          <Modal.Title>Cart Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table responsive>
            <thead>
              <tr className="text-center">
                <th>#</th>
                <th>Iamge</th>
                <th>Product</th>
                <th>price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((val, i) => {
                var desciptionLegnth = 50;
                var descriptionText = val.Product_name;
                if (descriptionText.length > desciptionLegnth) {
                  descriptionText =
                    descriptionText.slice(0, desciptionLegnth) + "...";
                }
                return (
                  <tr key={i} className="text-center">
                    <td>{i + 1}</td>
                    <td>
                      <img src={val.product_image} alt="product_img" width={60} height={60}/>
                    </td>
                    <td>{descriptionText}</td>
                    <td>{val.Product_price}</td>
                    <td>
                      <div className={styles.quantity_container}>
                        <Button
                          className={styles.quantity_button}
                          onClick={() => handleQuantityChange(i, "subtract")}
                        >
                          -
                        </Button>
                        <input
                          type="text"
                          className={styles.quantity_input}
                          value={val.quantity || 1}
                          readOnly
                        />
                        <Button
                          className={styles.quantity_button}
                          onClick={(e) => handleQuantityChange(i, "add")}
                        >
                          +
                        </Button>
                      </div>
                    </td>
                    <td>{`₹ ${calculateTotalPrice(val)}`}</td>
                  </tr>
                );
              })}
              <tr className="text-center">
                {cartItems.length == 0 && (
                  <p className="text-danger">Data Not Found..!</p>
                )}
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>

      <div className={`${styles.modal} ${show ? styles.open : ""}`}>
        <div className={styles.modalContent}>
          <div>
            <>
              <div
                className={`${styles.header_cart_title} ${styles.flex_sb_m} flex-w  p-b-8`}
              >
                <span className={`${styles.mtext_103} ${styles.cl2}`}>
                  Your Cart
                </span>
                <span className={styles.closeButton} onClick={handleClose}>
                  <FontAwesomeIcon icon={faTimes} size="lg" />
                </span>
              </div>
              <ul
                className={`${styles.header_cart_wrapitem} ${styles.w_full} ${styles.ul}`}
              >
                {cartItems.length != 0 &&
                  cartItems.map((val, i) => {
                    var desciptionLegnth = 50;
                    var descriptionText = val.Product_name;
                    if (descriptionText.length > desciptionLegnth) {
                      descriptionText =
                        descriptionText.slice(0, desciptionLegnth) + "...";
                    }
                    return (
                      <>
                        <li
                          key={i}
                          className={`${styles.flex_t} ${styles.li} m-b-12`}
                        >
                          <div className={styles.header_cart_item_img}>
                            <img
                              src={val.product_image}
                              className="me-2 object-fit-contain"
                              alt="IMG"
                              height={100}
                              width={100}
                            />
                          </div>

                          <div
                            className={`${styles.header_cart_item_txt} ${styles.p_t_8}`}
                          >
                            <Link
                              href={val.link ? val.link : ""}
                              className={`${styles.header_cart_item_name} ${styles.trans_04} m-b-18`}
                              target="_blank"
                            >
                              {descriptionText}
                            </Link>

                            <span className={styles.header_cart_item_info}>
                              {val.Qty} x {val.Product_price}
                            </span>
                          </div>
                          <FontAwesomeIcon
                            icon={faTrash}
                            style={{ cursor: "pointer" }}
                            className="text-danger"
                            size="m"
                            onClick={() => removeItem(val._id)}
                          />
                        </li>
                      </>
                    );
                  })}
              </ul>
              <div className={`${styles.header_cart_content}`}>
                {cartItems.length != 0 ? (
                  <>
                    <div
                      className={`${styles.header_cart_total} w-full p-tb-40`}
                    >
                      Total:{" "}
                      {` ₹ ${cartItems
                        .reduce((total, val) => {
                          const productPrice =
                            parseFloat(
                              val.Product_price.replace(/[^0-9.]/g, "")
                            ) || 0;
                          return total + val.Qty * productPrice;
                        }, 0)
                        .toFixed(2)}`}
                    </div>
                    <div
                      className={`${styles.header_cart_buttons} flex-w w-full`}
                    >
                      <button
                        href="shoping-cart.html"
                        className={styles.BTN}
                        onClick={handleShowViewCart}
                      >
                        View Cart
                      </button>
                        <Link href={"/Order_place"}>
                      <button
                        href="shoping-cart.html"
                        className={styles.BTN}
                      >
                        Check Out
                      </button>
                        </Link>
                    </div>
                  </>
                ) : (
                  <h3 className="text-danger">Data Not Found</h3>
                )}
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
