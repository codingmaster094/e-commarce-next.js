import React, { useRef } from 'react'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Image } from 'react-bootstrap';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import imageBanner from "../../../public/logo.png"
import image1 from "../../../public/Carousel/banner-image.png"
import image2 from "../../../public/Carousel/woman-cloth.png"
import image3 from "../../../public/Carousel/man-cloth.png"
import image4 from "../../../public/Carousel/WONAM-ASSESIES.png"
import image5 from "../../../public/Carousel/Pefume_HD.png"
import image6 from "../../../public/Carousel/Smart-phone.png"
import Link from 'next/link';

SwiperCore.use([Navigation, Pagination, Autoplay]);
function Main_careousel() {
    const swiperRef = useRef(null);

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

    const SliderData = [
        { image: image1, title: "Luxury Watches for Men & Women." , Path:"Men_woman_products/Smart%20Watches/658910fb5b9958a1aef5c48a" },
        { image: image2, title: "STARTING ₹ 1500 TRENDY STYLES." , Path:"Men_woman_products/SPECIAL%20PRICES/6583d9429dbf65896e936ea0"},
        { image: image3, title: "END OF SEASON SALE STARTING ₹2000." , Path:"Men_woman_products/SHIRTS/6583d81c24b66c53bb63fc68" },
        { image: image4, title: "SHOE CARE & ACCESSORIES WOMAN." , Path:"Men_woman_products/ACCESSORIES_JEWELLERY/6583d9429dbf65896e936e90"},
        { image: image5, title: "PROVIDES A LASTING IMPRESSUION." , Path:"Men_woman_products/PERFUMES/6583d81c24b66c53bb63fc66"},
        { image: image6, title: "YOU NEED IN YOUR SMART PHONER." , Path:"Men_woman_products/Smart%20Phone/65890b115b9958a1aef5c489"},
    ]

    return (
        <section id="billboard" className="position-relative overflow-hidden bg-light-blue">
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
                        SliderData.map((val, index) => {
                            return (
                                <SwiperSlide className="swiper-slide" key={index}>
                                    <div className='container'>
                                        <div className="row d-flex align-items-center">
                                            <div className="col-md-6">
                                                <div className="banner-content">
                                                    {/* <Image src={imageBanner.src} alt="My Image" width={100} height={50} className="object-fit-cover" /> */}
                                                    <h1 className="display-2 text-uppercase text-dark pb-5">{val.title}</h1>
                                                    <Link href={val.Path} className="btn btn-medium btn-dark text-uppercase btn-rounded-none">Shop Product</Link>
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="image-holder">
                                                    <img src={val.image.src} alt="banner" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }
                </div>
            </Swiper>
            <div className="swiper-icon swiper-arrow swiper-arrow-prev" onClick={handlePrev}>
                <FontAwesomeIcon className="chevron-left" icon={faChevronLeft} />
            </div>
            <div className="swiper-icon swiper-arrow swiper-arrow-next" onClick={handleNext}>
                <FontAwesomeIcon className="chevron-right" icon={faChevronRight} />
            </div>
        </section>
    )
}

export default Main_careousel