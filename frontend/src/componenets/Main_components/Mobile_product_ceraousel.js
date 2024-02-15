import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useCart } from '@/app/cartContext'
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
SwiperCore.use([Navigation, Pagination, Autoplay]);

import image1 from "../../../public/product_image/samsung-galaxy-j2.jpg"
import image2 from "../../../public/product_image/oppoF1.webp"
import image3 from "../../../public/product_image/huawei-p9.webp"
import image4 from "../../../public/product_image/samsung-galaxy-j7-prime.webp"
import image5 from "../../../public/product_image/honor-8.webp"
import image6 from "../../../public/product_image/oppo-f3.webp"
import image7 from "../../../public/product_image/redmi-note-5-pro.webp"

function Mobile_product_ceraousel() {
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

    const MobileData = [
        {
            "_id": "65890f971a85ad35a46517b4",
            "Product_name": "SAMSUNG Galaxy J2 ",
            "link": "https://www.flipkart.com/samsung-galaxy-j2-white-8-gb/p/itmedwngmgzgf56v?pid=MOBEBFQE4WFKV2TF",
            "product_image":image1.src,
            "Product_price": "₹ 6799",
            "Qty":1
        },
        {
            "_id": "65890f971a85ad35a46517c3",
            "Product_name": "OPPO F1 Plus ",
            "link": "https://www.flipkart.com/oppo-f1-plus-gold-64-gb/p/itmehzhgq9rsyyzb?pid=MOBEHZHGVQQZBBGC",
            "product_image":image2.src,
            "Product_price": "₹ 27500",
            "Qty":1
        },
        {
            "_id": "65890f971a85ad35a46517cf",
            "Product_name": "Huawei P9 ",
            "link": "https://www.flipkart.com/huawei-p9-prestige-gold-32-gb/p/itmeuyd96fpkjnyb?pid=MOBEKQHYZTPZ6FZ5",
            "product_image":image3.src,
            "Product_price": "₹ 39999",
            "Qty":1
        },
        {
            "_id": "65890f971a85ad35a46517d4",
            "Product_name": "SAMSUNG Galaxy J5 Prime ",
            "link": "https://www.flipkart.com/samsung-galaxy-j5-prime-gold-16-gb/p/itmeshs24q297qsm?pid=MOBEMNHGABKEKCJR",
            "product_image": image4.src,
            "Product_price": "₹ 14500",
            "Qty":1
        },
        {
            "_id": "65890f971a85ad35a46517d0",
            "Product_name": "Honor 8 ",
            "link": "https://www.flipkart.com/honor-8/p/itmeuydakfewgvk3?pid=MOBEM38EGGJRGNHR",
            "product_image": image5.src,
            "Product_price": "₹ 29999",
            "Qty":1
        },
        {
            "_id": "65890f971a85ad35a46517e9",
            "Product_name": "OPPO F3  ",
            "link": "https://www.flipkart.com/oppo-f3-gold-64-gb/p/itmff5gpyrsu2prw?pid=MOBETGZ5QQVZF6YC",
            "product_image": image6.src,
            "Product_price": "₹ 18000",
            "Qty":1
        },
        {
            "_id": "65890f971a85ad35a465183b",
            "Product_name": "Redmi Note 5 Pro ",
            "link": "https://www.flipkart.com/redmi-note-5-pro-gold-64-gb/p/itmf2fc3bknfqpkj?pid=MOBF28FTVG9GMYQM",
            "product_image": image7.src,
            "Product_price": "₹ 16999",
            "Qty":1
        },

    ]

    return (
        <section id="billboard" className="position-relative overflow-hidden">
            <div id="mobile-products">
            <div className='container'>
                <div className="display-header text-uppercase text-dark text-center pb-3">
                    <h2 className="display-7">Mobile Products </h2>
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
                            MobileData.map((image, index) => {
                                return (
                                    <SwiperSlide key={index} className="swiper-slide" style={{ maxWidth: "310px" }}>
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
        </div>
        </section>

    )
}

export default Mobile_product_ceraousel