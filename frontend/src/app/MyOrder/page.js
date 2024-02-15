"use client";
import { API } from "@/app/page";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import Swal from "sweetalert2";
import Header from "@/componenets/Header/Header";
import Footer from "@/componenets/footer/Footer";
import Cookies from "js-cookie";
import { faEye, faFilter, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImgeUrl from "../../../public/logo.png";

function page(props) {
  const token = Cookies.get("fmljwt");
  const [Data, setData] = useState([]);
  const [FindProduct, setFindProduct] = useState([]);
  const [query, setquery] = useState({
    search: "",
  });
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  const GetData = async () => {
    const result = await API.post(
      `http://localhost:2023/api/products/My/order/products`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setData(result.data.data);
  };

  const ShowProductDetails = async (id) => {
    const result = await API.post(
      `http://localhost:2023/api/products/Get/My/order/products/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("result==>", result);
    setFindProduct(result.data.data);
    handleShow();
  };

  const Order_cancle = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger me-2",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Cancel it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const Form = new FormData();
          Form.append("id", id);
          const result = await API.post(
            `http://localhost:2023/api/products/cancle/order/products`,
            Form
          );
          GetData();
          swalWithBootstrapButtons.fire({
            title: "Order Cancelled!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Order No Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  const sreachProduct = async (search, name) => {
    const Form = new FormData();
    if (name == "search") {
      Form.append("product_name", name === "search" ? search : query.search);
    }
    const result = await API.post(
      `http://localhost:2023/api/products/Search/order/products`,
      Form
    );
    console.log("result==>", result);
    setData(result.data.data);
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <>
      <section>
        <Container>
          <div className="d-flex justify-content-between align-items-center border rounded-3 mt-2">
            <span>
              <img src={ImgeUrl.src} width={80} height={80} /> My Orders
            </span>
          </div>
          <div className="mt-3">
            <div className="d-flex justify-content-between align-items-center mb-3 pe-3">
              <Form.Control
                type="text"
                className="w-50"
                placeholder="Search Your Product Name."
                onChange={(e) => sreachProduct(e.target.value, "search")}
              />
            </div>
            <div>
              {Data?.map((val) => {
                const formattedDate = new Date(
                  val.orderID.Delivered_date
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                });
                return (
                  <div className="w-100">
                    <Row>
                      <Col>
                        <Card className=" mb-1">
                          <div className="p-2 card_innerside">
                            <div
                              className="d-flex justify-content-between cursor-pointer align-items-center w-75"
                              onClick={() =>
                                ShowProductDetails(val.orderID._id)
                              }
                            >
                              <img
                                src={val.orderID.product_image}
                                className="order_image me-2"
                              />
                              <div className="d-flex justify-content-between align-items-center w-100 card_innerside">
                                <div>
                                  <Card.Title>
                                    Deliverd On {formattedDate}
                                  </Card.Title>
                                  <Card.Text className="p">
                                    {val.orderID.Product_name}
                                  </Card.Text>
                                  <Card.Text className="p">
                                    {val.orderID.Product_price} X{" "}
                                    {val.orderID.Qty}
                                  </Card.Text>
                                  <Card.Text className="p">
                                    Total: ₹{" "}
                                    {val.orderID.Product_price.replace(
                                      "₹",
                                      ""
                                    ).replace(",", "") * val.orderID.Qty}
                                  </Card.Text>
                                </div>
                              </div>
                            </div>
                            <div>
                              <Button
                                variant="danger"
                                onClick={() => Order_cancle(val.orderID._id)}
                              >
                                Cancel Order
                              </Button>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <Modal
        style={{ marginTop: "100px" }}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {FindProduct?.map((val, i) => {
            return (
              <>
                <section className="root">
                  <figure>
                    <img src={val?.orderID?.product_image} />
                    <figcaption>
                      <p className=" flex-wrap p">
                        {val?.orderID?.Product_name}
                      </p>
                      <p className=" flex-wrap p">Order Number : {val._id}</p>
                    </figcaption>
                  </figure>
                  <div className="order-track">
                    <div className="order-track-step">
                      <div className="order-track-status">
                        <span className="order-track-status-dot"></span>
                        <span className="order-track-status-line"></span>
                      </div>
                      <div className="order-track-text">
                        <p className="order-track-text-stat package p">
                          Package
                        </p>
                        <span className="order-track-text-sub p">
                          {new Date(
                            val?.orderID?.Package_date
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="order-track-step">
                      <div className="order-track-status">
                        <span className="order-track-status-dot"></span>
                        <span className="order-track-status-line"></span>
                      </div>
                      <div className="order-track-text">
                        <p className="order-track-text-stat shipped p">
                          {" "}
                          Shipped{" "}
                        </p>
                        <span className="order-track-text-sub p">
                          {new Date(
                            val?.orderID?.Shipped_date
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="order-track-step">
                      <div className="order-track-status">
                        <span className="order-track-status-dot"></span>
                        <span className="order-track-status-line"></span>
                      </div>
                      <div className="order-track-text">
                        <p className="order-track-text-stat out-for-delivery p">
                          {" "}
                          Out for Delivery
                        </p>
                        <span className="order-track-text-sub p">
                          {new Date(
                            val?.orderID?.Out_for_Delivery_date
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="order-track-step">
                      <div className="order-track-status">
                        <span className="order-track-status-dot"></span>
                        <span className="order-track-status-line"></span>
                      </div>
                      <div className="order-track-text">
                        <p className="order-track-text-stat delivered p">
                          {" "}
                          Delivered
                        </p>
                        <span className="order-track-text-sub p">
                          {new Date(
                            val?.orderID?.Delivered_date
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            );
          })}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default page;
