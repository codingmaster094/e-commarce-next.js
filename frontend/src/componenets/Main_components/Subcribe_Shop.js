import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import image1 from "../../../public/product_image/shop-Insta.jpg"
import image2 from "../../../public/product_image/shop-Insta1.jpg"
import image3 from "../../../public/product_image/shop-Insta2.jpg"
import image4 from "../../../public/product_image/shop-Insta3.jpg"

function Subcribe_Fotter() {
    const ShopData = [
        { image: image1.src},
        { image: image2.src},
        { image: image3.src},
        { image: image4.src},
    ]
    return (
        <div>
            <section id="subscribe" className="container-grid padding-large position-relative overflow-hidden">
                <div className="container">
                    <div className="row">
                        <div className="subscribe-content bg-dark d-flex flex-wrap justify-content-center align-items-center padding-medium">
                            <div className="col-md-6 col-sm-12">
                                <div className="display-header pe-3">
                                    <h2 className="display-7 text-uppercase text-light">Subscribe Us Now</h2>
                                    <p>Get latest news, updates and deals directly mailed to your inbox.</p>
                                </div>
                            </div>
                            <div className="col-md-5 col-sm-12">
                                <form className="subscription-form validate">
                                    <div className="input-group flex-wrap">
                                        <input className="form-control btn-rounded-none" type="email" name="EMAIL" placeholder="Your email address here" required="" />
                                        <button className="btn btn-medium btn-primary text-uppercase btn-rounded-none" type="submit" name="subscribe">Subscribe</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="instagram" >
                <div className="container">
                    <div className="row">
                        <div className="display-header text-uppercase text-dark text-center pb-3">
                            <h2 className="display-7">Shop Our Insta </h2>
                        </div>
                        <div className="d-flex flex-wrap col">
                            {ShopData.map((image, index) => {
                                return (
                                    <div key={index} className="instagram-item pe-4">
                                        <a href="https://templatesjungle.com/" className="image-link position-relative">
                                            <img key={index} src={image.image} className="object-fit-contain insta-image" width={300} height={200} alt={`Image ${index + 1}`} />
                                            <div className="icon-overlay position-absolute d-flex justify-content-center">
                                                <FontAwesomeIcon
                                                    icon={faInstagram}
                                                    style={{
                                                        cursor: "pointer",
                                                        position: 'absolute',
                                                        bottom: '25px',
                                                        right: '135px',
                                                        fontSize: "45px",
                                                        color:"black"
                                                    }}
                                                    className={image.like ? 'text-danger' : 'text-ligth'}
                                                    onClick={() => handleAddFav(image, index)}
                                                />
                                            </div>
                                        </a>
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

export default Subcribe_Fotter