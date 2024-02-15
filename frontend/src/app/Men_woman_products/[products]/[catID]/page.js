'use client'
import { API } from '@/app/page'
import Header from '@/componenets/Header/Header'
import Footer from '@/componenets/footer/Footer'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Row, Range } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import DataNotFound from '@/componenets/DataNotFound'
import Link from 'next/link'
import { useCart } from '@/app/cartContext'
import style from "@/app/page.module.css"

function page(props) {
    const { dispatch } = useCart();
    const [Data, setData] = useState([])
    const [Brand_name, setBrand_name] = useState([])
    const [priceRange, setPriceRange] = useState({ min: 1000, max: 10000 })
    const [Range, setRange] = useState({
        min: priceRange.min,
        max:priceRange.max
    })
    const [query, setquery] = useState({
        search: "",
        range:0
      });

    const GetData = async () => {
        try {
            const result = await API.post(`http://localhost:2023/api/products/categoryId/products/${props.params.catID}`);
            setData(result.data.data);
            const brandGet = await API.post(`http://localhost:2023/api/products/get/products/brand/${props.params.catID}`)
            setBrand_name(brandGet.data.data)

            if (result.data.data[0]?.category.category_name === "Smart Phone") {
                setPriceRange({ min: 5000, max: 200000 });
                setRange({ min: 5000, max: 200000 });
            } else if (result.data.data[0]?.category.category_name === "Smart Watches") {
                setPriceRange({ min: 5000, max: 100000 });
                setRange({ min: 5000, max: 100000 });
            } else {
                setPriceRange({ min: 500, max: 10000 });
                setRange({ min: 500, max: 10000 });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }



    const search_products = async (e , name) => {
        if (name === "search") {
            setquery({ ...query, [name]: e.target.value });
          }
        
          if (name === "range" && e.target.value !== 0) {
            setquery({ ...query, [name]: e.target.value });
          }
          const Form = new FormData();
          Form.append("main_id", props.params.catID);
          Form.append("product_name", name === "search" ? e.target.value : query.search);
        
          if (query.range !== 0) {
            Form.append("Product_range", name === "range" ? Range.min : query.range);
          }

        const result = await API.post(`http://localhost:2023/api/products/search/products`, Form)
        setData(result.data.data)
    }

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
        GetData()
    };

    useEffect(() => {
        GetData();
    }, []);


    return (
        <div>
            <Header/>
            <div className="search-section">
                <section>
                    <div className="overlay" style={{ display: "none" }}></div>
                    <div className="search-section">
                        <div className="container-fluid container-xl ">
                            <div className="row main-content ml-md-0">
                                <div className="sidebar col-md-3 px-0">
                                    <div className="sidebar__inner ">
                                        <div className="filter-body">
                                            <div>
                                                <h5 className="border-bottom filter-title mt-2">Search Product</h5>
                                                <div className="mb-3 filter-options">
                                                    <div className='mt-2 '>
                                                        <Form.Control type="text" className="form-control" placeholder='here....' id="UrunID" name='Product_name' onChange={(e) => search_products(e , "search")} />
                                                    </div>
                                                </div>

                                                <h5 className="font-xbold body-font border-bottom filter-title mb-2">Price Range</h5>
                                                <div className="mb-3 theme-clr xs2-font d-flex justify-content-between">
                                                    <span id="slider-range-value1">${Range.min}</span>
                                                    <span id="slider-range-value2">${Range.max}</span>
                                                </div>
                                                <div className="mb-30 filter-options">
                                                    <div>
                                                        <div id="slider-range">
                                                            <form>
                                                                <div className="form-group">
                                                                    <Form.Range
                                                                        type="range"
                                                                        min={priceRange.min}
                                                                        max={priceRange.max}
                                                                        value={Range.min}
                                                                        className="form-control-range"
                                                                        onChange={(e) =>{setRange( {max : Range.max , min: e.target.value}) ; search_products(e , "range")}  }
                                                                    />
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <h5 className="border-bottom filter-title mb-2">DISCOUNT</h5>
                                                <div className="mb-3 filter-options" id="services-options">
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" value={10} id="Breakfast" onChange={(e) => search_products(e , "reting")}/>
                                                        <label className="custom-control-label" for="Breakfast">10% or more</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" value={20} onChange={(e) => search_products(e , "reting")} />
                                                        <label className="custom-control-label" for="Lunch">20% or more</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" value={30} onChange={(e) => search_products(e , "reting")}/>
                                                        <label className="custom-control-label" for="Donner">30% or more</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" value={40}  onChange={(e) => search_products(e , "reting")}/>
                                                        <label className="custom-control-label" for="Cafe">40% or more</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" value={50}  onChange={(e) => search_products(e , "reting")}/>
                                                        <label className="custom-control-label" for="Brunch">50% or more</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" value={60}  onChange={(e) => search_products(e , "reting")}/>
                                                        <label className="custom-control-label" for="Brunch">60% or more</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" value={70}  onChange={(e) => search_products(e , "reting")}/>
                                                        <label className="custom-control-label" for="Brunch">70% or more</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" value={80}  onChange={(e) => search_products(e , "reting")}/>
                                                        <label className="custom-control-label" for="Brunch">80% or more</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input type="checkbox" className="custom-control-input" value={90}  onChange={(e) => search_products(e , "reting")}/>
                                                        <label className="custom-control-label" for="Brunch">90% or more</label>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-md-9 gap-5`} >
                                    <div className={`row row-grid g-3 vh-100 ${style.content}`}>
                                        {
                                            Data.length !== 0 ?
                                                Data.map((val, i) => {
                                                    var productName = 20
                                                    var Productnametext = val.Product_name
                                                    if (Productnametext.length > productName) {
                                                        Productnametext = Productnametext.slice(0, productName) + '...';
                                                    }

                                                    var desciptionLegnth = 40
                                                    var descriptionText = val.description
                                                    if (descriptionText.length > desciptionLegnth) {
                                                        descriptionText = descriptionText.slice(0, desciptionLegnth) + '...';
                                                    }
                                                    return (
                                                        val.link != undefined ?
                                                            <div className="col-md-6 col-lg-4 col-xl-4">
                                                                <Row>
                                                                    <Col>
                                                                        <Card className={style.card}>
                                                                            <div className={`${style.card_inner}`}>
                                                                                <div className={`${style.card_face}${style.front}`}>
                                                                                    <Link href={val.link} className='text-decoration-none text-dark' target='_blank'>
                                                                                        <Card.Img src={val.product_image} alt={descriptionText} className={style.img} />
                                                                                    </Link>
                                                                                </div>
                                                                                <div className={`${style.card_face}${style.back}`}>
                                                                                    <div className={style.card_details}>
                                                                                        <FontAwesomeIcon
                                                                                            icon={faHeart}
                                                                                            style={{
                                                                                                cursor: "pointer",
                                                                                                position: 'absolute',
                                                                                                top: '10px',
                                                                                                right: '10px',
                                                                                                fontSize: "25px",
                                                                                            }}
                                                                                            className={val.like ? 'text-danger' : 'text-ligth'}
                                                                                            onClick={() => handleAddFav(val, i)}
                                                                                        />
                                                                                        <Card.Title><h5>{Productnametext}</h5></Card.Title>
                                                                                        <Card.Text>Category:- {val.category.category_name}</Card.Text>
                                                                                        <Card.Text>Description:- {descriptionText}</Card.Text>
                                                                                        <Card.Text className='text-success'>offer :- {val.Product_offer} % Descount</Card.Text>
                                                                                        <Card.Title>Price: {val.Product_price}</Card.Title>
                                                                                        <Button variant="primary" onClick={() => handleAddToCart(val)}>Add To cart</Button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Card>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                            :
                                                            <div className="col-md-6 col-lg-4 col-xl-4">
                                                                <Row>
                                                                    <Col>
                                                                        <Card className={style.card}>
                                                                            <div className={`${style.card_inner}`}>
                                                                                <div className={`${style.card_face}${style.front}`}>
                                                                                    <Card.Img src={val.product_image} alt={descriptionText} className={style.img} />
                                                                                </div>
                                                                                <div className={`${style.card_face}${style.back}`}>
                                                                                    <div className={style.card_details}>
                                                                                        <FontAwesomeIcon
                                                                                            icon={faHeart}
                                                                                            style={{
                                                                                                cursor: "pointer",
                                                                                                position: 'absolute',
                                                                                                top: '10px',
                                                                                                right: '10px',
                                                                                                fontSize: "25px",
                                                                                            }}
                                                                                            className={val.like ? 'text-danger' : 'text-ligth'}
                                                                                            onClick={() => handleAddFav(val, i)}
                                                                                        />
                                                                                        <Card.Title><h5>{val.Product_name}</h5></Card.Title>
                                                                                        <Card.Text>Category:- {val.category.category_name}</Card.Text>
                                                                                        <Card.Text>Description:- {descriptionText}</Card.Text>
                                                                                        <Card.Text className='text-success'>offer :- {val.Product_offer} % Descount</Card.Text>
                                                                                        <Card.Title>Price: {val.Product_price}</Card.Title>
                                                                                        <Button variant="primary" onClick={() => handleAddToCart(val)}>Add To cart</Button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Card>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                    )
                                                })
                                                : <DataNotFound/>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default page