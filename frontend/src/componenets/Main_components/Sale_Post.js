import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import imageURL from "../../../public/product_image/new-year-sale.png"
import { Image } from 'react-bootstrap';
import image1 from "../../../public/product_image/FADED LEATHER EFFECT JACKET.jpg"
import image2 from "../../../public/product_image/OPEN KNIT CAPE.jpg"
import image3 from "../../../public/product_image/WOVEN FORMAL SHOES.jpg"
import image4 from "../../../public/product_image/STRAIGHT BLAZER.jpg"
import image5 from "../../../public/product_image/COTTON HOODIE.jpg"

function Sale_Post() {
    const latestPost = [
        {
            "Product_name": "FADED LEATHER EFFECT JACKET",
            "link": "https://www.zara.com/in/en/faded-leather-effect-jacket-p05070330.html",
            "product_image": image1.src,
            "Product_price": "₹ 7,590.00",
        },
        {
            "Product_name": "OPEN KNIT CAPE",
            "link": "https://www.zara.com/in/en/open-knit-cape-p02756102.html",
            "product_image": image2.src,
            "Product_price": "₹ 3,290.00",
        },
        {
            "Product_name": "WOVEN FORMAL SHOES",
            "link": "https://www.zara.com/in/en/woven-formal-shoes-p12425220.html",
            "product_image": image3.src,
            "Product_price": "₹ 5,590.00",
        },
        {
            "Product_name": "STRAIGHT BLAZER",
            "link": "https://www.zara.com/in/en/straight-blazer-p09929327.html",
            "product_image": image4.src,
            "Product_price": "₹ 4,990.00",
        },
        {
            "Product_name": "COTTON HOODIE",
            "link": "https://www.zara.com/in/en/cotton-hoodie-p00761331.html",
            "product_image": image5.src,
            "Product_price": "₹ 3,990.00",
        },
    ]
    return (
        <div>
            <section id="yearly-sale" className="position-relative overflow-hidden bg-light-blue">
                <div className="container">
                    <div className="row d-flex align-items-center">
                        <div className="col-md-6">
                            <div className="banner-content">
                                <h3>10% off</h3>
                                <h2 className="display-2 pb-5 text-uppercase text-dark">New year sale</h2>
                                <Link href="Men_woman_products/Smart%20Phone/65890b115b9958a1aef5c489" className="btn btn-medium btn-dark text-uppercase btn-rounded-none">Shop Sale</Link>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="image-holder">
                                <Image src={imageURL.src} alt="banner" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="latest-blog" >
                <div className="container padding-large">
                    <div className="row">
                        <div className="display-header text-uppercase text-dark text-center pb-3">
                            <h2 className="display-7">LATEST POSTS </h2>
                        </div>
                        <div className="d-flex  justify-content-center flex-wrap col" >
                            {latestPost.map((image, index) => {
                                return (
                                    <div key={index} className="instagram-item  pe-4">
                                        <Link href={image.link} className="image-link position-relative" target='_blank'>
                                            <img key={index} src={image.product_image} style={{ maxWidth: "230px" }} className="object-fit-contain insta-image" width={300} height={200} alt={`Image ${index + 1}`} />
                                            <div className="icon-overlay position-absolute d-flex justify-content-center">
                                                <FontAwesomeIcon
                                                    icon={faInstagram}
                                                    style={{
                                                        cursor: "pointer",
                                                        position: 'absolute',
                                                        bottom: '25px',
                                                        right: '100px',
                                                        fontSize: "45px",
                                                        color:"black"
                                                    }}
                                                />
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Sale_Post