import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { useCart } from '@/app/cartContext'

import image1 from "../../../public/product_image/apply-watch.webp"
import image2 from "../../../public/product_image/fossil.webp"
import image3 from "../../../public/product_image/sumsumg-watch.webp"
import image4 from "../../../public/product_image/honnor-watch.webp"
import image5 from "../../../public/product_image/Octane-watch.webp"

SwiperCore.use([Navigation, Pagination, Autoplay]);
function Watches_product_ceraousel() {
    const swiperRef = useRef(null);
    const { dispatch } = useCart();
    const handleNext = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();
        }
    };

    const handlePrev = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    const handleAddToCart = (product) => {
        const updatedCart = [...JSON.parse(localStorage.getItem("AddTocart")), product];
        localStorage.setItem("AddTocart", JSON.stringify(updatedCart));
        dispatch({
            type: 'ADD_TO_CART',
            payload: product,
        });
    };

    const handleAddFav = async (product, index) => {
        dispatch({
            type: 'ADD_TO_FAV',
            payload: product,
        });

        const updatedFav = [product];
        console.log('updatedFav', updatedFav)
        updatedFav[index] = {
            ...product,
            like: !product.like,
        };

        try {
            await API.post(`http://localhost:2023/api/products/update/products/${product._id}`, updatedFav[index]);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };
    const WatchesData = [
        {

            "Product_name": "APPLE Watch Series 8 GPS ",
            "link":"https://www.flipkart.com/apple-watch-series-8-41mm-gps-ecg-app-temperature-sensor-ipx6-fall-crash-detection/p/itma65f44f338857?pid=SMWGHWZ2S3SDEPR3&lid=LSTSMWGHWZ2S3SDEPR3IGSXJG&marketplace=FLIPKART&q=APPLE+Watch+Series+8+GPS&store=ajy%2Fbuh&srno=s_1_5&otracker=search&otracker1=search&fm=Search&iid=2b8c39fa-ed28-4f96-ae40-7b133e24075b.SMWGHWZ2S3SDEPR3.SEARCH&ppt=sp&ppn=sp&ssid=9q0htum02o0000001704774458040&qH=c5068ed28a935f6a",
            "product_image": image1.src,
            "Product_price": "₹41,999",
            "_id": "6589119da56c16355a9ada8e",
            "Qty": 1
        },
        {

            "Product_name": "FOSSIL Gen 6 Smartwatch",
            "link":"https://www.flipkart.com/fossil-gen-6-smartwatch/p/itm655ae762e85ea?pid=SMWG7DNMPG4Z2PS3&lid=LSTSMWG7DNMPG4Z2PS3MCYGOD&marketplace=FLIPKART&q=FOSSIL+Gen+6+Smartwatch&store=ajy%2Fbuh&srno=s_1_3&otracker=search&otracker1=search&fm=Search&iid=193ef85c-25f1-4b37-9d28-03ae8132778b.SMWG7DNMPG4Z2PS3.SEARCH&ppt=sp&ppn=sp&ssid=uo2u6qleuo0000001704774397220&qH=4f18b14cf2ed92cd",
            "product_image": image2.src,
            "Product_price": "₹24,995",
            "_id": "6589119da56c16355a9ada98",
            "Qty": 1
        },
        {

            "Product_name": "SAMSUNG Galaxy Watch4 LTE",
            "link":"https://www.flipkart.com/samsung-watch-4-classic-42mm-super-amoled-lte-calling-body-composition-tracking/p/itm036ea34c9e64e?pid=SMWG664GHYJHBWRF&lid=LSTSMWG664GHYJHBWRFM5LBUV&marketplace=FLIPKART&q=SAMSUNG+Galaxy+Watch4+LTE&store=ajy%2Fbuh&srno=s_1_3&otracker=search&otracker1=search&fm=Search&iid=c01c0a70-c17f-45b4-9663-bcd4414b8cb8.SMWG664GHYJHBWRF.SEARCH&ppt=sp&ppn=sp&ssid=r8mlbeiuyo0000001704774463014&qH=bf019627a83bcd5c",
            "product_image": image3.src,
            "Product_price": "₹36,999",
            "_id": "6589119da56c16355a9ada96",
            "Qty": 1
        },
        {

            "Product_name": "Honor Magic Watch 2",
            "link":"https://www.flipkart.com/honor-magic-watch-2-46mm-smartwatch/p/itm43302c16e68a3?pid=SMWG36AJCNCCJTMN&lid=LSTSMWG36AJCNCCJTMNIOSVYY&marketplace=FLIPKART&q=Honor+Magic+Watch+2&store=ajy%2Fbuh&srno=s_1_3&otracker=search&otracker1=search&fm=Search&iid=d6efe346-45af-4af7-8261-d74bcbf6460e.SMWG36AJCNCCJTMN.SEARCH&ppt=sp&ppn=sp&ssid=wrwbpuqbo00000001704774533699&qH=4f1f0f2927e2ed02",
            "product_image": image4.src,
            "Product_price": "₹7,990",
            "_id": "6589119da56c16355a9ada9a",
            "Qty": 1
        },
        {

            "Product_name": "Octane upgrade Analog",
            "link":"https://www.flipkart.com/titan-octane-upgrade-analog-watch-men/p/itm53ab4b8561aae?pid=WATGG934X8QKHBZ9&lid=LSTWATGG934X8QKHBZ92PCWSZ&marketplace=FLIPKART&q=watches+upto+15000&store=r18%2Ff13&srno=s_1_23&otracker=search&otracker1=search&fm=Search&iid=2825ca7a-2075-4fef-9b2e-e4fa17a0f79d.WATGG934X8QKHBZ9.SEARCH&ppt=sp&ppn=sp&qH=9cf7f32f499e6b58",
            "product_image": image5.src,
            "Product_price": "₹10,545",
            "_id": "6589119da56c16355a9ada9c",
            "Qty": 1
        },
    ]
    return (
        <div id='smart-watches'>
            <section id="billboard" className="position-relative overflow-hidden padding-large">
                <div className='container' >
                    <div className="display-header text-uppercase text-dark text-center pb-3">
                        <h2 className="display-7">SMART WATCHES </h2>
                    </div>
                    <Swiper
                        className="swiper main-swiper"
                        ref={swiperRef}
             
                        navigation={{
                            nextEl: '.swiper-arrow-next',
                            prevEl: '.swiper-arrow-prev',
                        }}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 5000 }}
                    >
                        <div className="swiper-wrapper">
                            {
                                WatchesData.map((image, index) => {
                                    return (
                                        <SwiperSlide key={index} className="swiper-slide" style={{ maxWidth: "320px" }}>
                                            <div className="img">
                                                <div className="instagram-item pe-4">
                                                    <Link href={image.link} className="image-link position-relative">
                                                        <img src={image.product_image} className="object-fit-contain" width={300} height={200} alt={`Image ${index + 1}`} />
                                                    </Link>
                                                    <div className="icon-overlay position-absolute d-flex justify-content-center">
                                                        <Button size='xs' onClick={() => handleAddToCart(image)}>Add to Cart<FontAwesomeIcon icon={faShoppingCart} size="lg" className="cart-outline" /></Button>
                                                    </div>
                                                    <div className="icon-overlay position-absolute d-flex justify-content-center">
                                                        <FontAwesomeIcon
                                                            icon={faHeart}
                                                            style={{
                                                                cursor: "pointer",
                                                                position: 'absolute',
                                                                top: '10px',
                                                                right: '50px',
                                                                fontSize: "25px",
                                                            }}
                                                            className={image.like ? 'text-danger' : 'text-ligth'}
                                                            onClick={() => handleAddFav(image, index)}
                                                        />
                                                    </div>
                                                    <div className='d-flex justify-content-center mt-3'>
                                                        <h3 style={{ textDecoration: "none", fontSize: "20px", color: "black" }}>{image.Product_name}</h3>
                                                    </div>
                                                    <span className="d-flex justify-content-center">{image.Product_price}</span>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </div>
                    </Swiper>
                </div>
                <div className="swiper-icon swiper-arrow swiper-arrow-prev" onClick={handlePrev}>
                    <FontAwesomeIcon className="chevron-left" icon={faChevronLeft} />
                </div>
                <div className="swiper-icon swiper-arrow swiper-arrow-next" onClick={handleNext}>
                    <FontAwesomeIcon className="chevron-right" icon={faChevronRight} />
                </div>
            </section>
        </div>

    )
}

export default Watches_product_ceraousel