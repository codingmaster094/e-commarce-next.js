import React, { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight , faStar , faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
SwiperCore.use([Navigation, Pagination, Autoplay]);

function Reting() {
    const swiperRef = useRef(null);
    const handlePrevClick = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();
        }
    };
    const handleNextClick = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slidePrev();
        }
    };
    return (
        <section id="testimonials" className="position-relative">
            <div className="container">
                <div className="row">
                    <div className="review-content position-relative">
                        <div className="swiper-icon swiper-arrow swiper-arrow-prev position-absolute d-flex align-items-center" onClick={handlePrevClick}>
                            <svg className="chevron-left">
                                <FontAwesomeIcon icon={faChevronLeft} size='lg' className="instagram" />
                            </svg>
                        </div>
                        <div className="quotation text-center">
                            <svg className="quote">
                                <FontAwesomeIcon icon={faQuoteRight} size='lg' className="instagram" />
                            </svg>
                        </div>
                        <div className="swiper testimonial-swiper">
                            <Swiper
                                ref={swiperRef}
                                className="testimonial-swiper"
                                spaceBetween={30}
                                slidesPerView={1}
                            >
                                <div className="swiper-wrapper">
                                    <SwiperSlide>
                                        <div className="swiper-slide text-center d-flex justify-content-center">
                                            <div className="review-item col-md-10">
                                                <i className="icon icon-review"></i>
                                                <blockquote>“Tempus oncu enim pellen tesque este pretium in neque, elit morbi sagittis lorem habi mattis Pellen tesque pretium feugiat vel morbi suspen dise sagittis lorem habi tasse morbi.”</blockquote>
                                                <div className="rating">
                                                    <svg className="star star-fill">
                                                        <FontAwesomeIcon icon={faStar} size='lg' className="instagram" />
                                                    </svg>
                                                    <svg className="star star-fill">
                                                        <FontAwesomeIcon icon={faStar} size='lg' className="instagram" />
                                                    </svg>
                                                    <svg className="star star-fill">
                                                        <FontAwesomeIcon icon={faStar} size='lg' className="instagram" />
                                                    </svg>
                                                    <svg className="star star-half">
                                                        <FontAwesomeIcon icon={faStar} size='lg' className="instagram" />
                                                    </svg>
                                                    <svg className="star star-empty">
                                                        <FontAwesomeIcon icon={faStar} size='lg' className="instagram" />
                                                    </svg>
                                                </div>
                                                <div className="author-detail">
                                                    <div className="name text-dark text-uppercase pt-2">Emma Chamberlin</div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="swiper-slide text-center d-flex justify-content-center">
                                            <div className="review-item col-md-10">
                                                <i className="icon icon-review"></i>
                                                <blockquote>“A blog is a digital publication that can complement a website or exist independently. A blog may include articles, short posts, listicles, infographics, videos, and other digital content.”</blockquote>
                                                <div className="rating">
                                                    <svg className="star star-fill">
                                                        <use href="#star-fill"></use>
                                                    </svg>
                                                    <svg className="star star-fill">
                                                        <use href="#star-fill"></use>
                                                    </svg>
                                                    <svg className="star star-fill">
                                                        <use href="#star-fill"></use>
                                                    </svg>
                                                    <svg className="star star-half">
                                                        <use href="#star-half"></use>
                                                    </svg>
                                                    <svg className="star star-empty">
                                                        <use href="#star-empty"></use>
                                                    </svg>
                                                </div>
                                                <div className="author-detail">
                                                    <div className="name text-dark text-uppercase pt-2">Jennie Rose</div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </div>
                            </Swiper>
                        </div>
                        <div className="swiper-icon swiper-arrow swiper-arrow-next position-absolute d-flex align-items-center" onClick={handleNextClick}>
                            <svg className="chevron-right">
                                <FontAwesomeIcon icon={faChevronRight} size='lg' className="instagram" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Reting