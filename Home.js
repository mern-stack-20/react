import React, { Component } from 'react';
import '../assest/style.css';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Navbar from '../Components/Navbar';

import bannerimg from '../assest/images/New-slider-BG.png';
// import about from '../assest/images/aboutbanner.png';
import productbanner from '../assest/images/BANNER IMAGE .png'
import customerCentric from '../assest/images1/We Practice Integrity.png'
import efsgimg from '../assest/images/EF-SG-12-2T.png';
import smoke from '../assest/images/smoked-veneer-500x500.png';
import feb from '../assest/images/feb33676e9fd0e261cc602d62fd7e1fe.png';
import redwood from '../assest/images/redwood-burl-veneer-sheets-500x500.png';
import whiteWood from '../assest/images/white-wood.jpg';
import path9 from '../assest/images/path _9.png'
import professional from '../assest/images1/professional.jpeg'
import interior from '../assest/images1/interior.png'
import engineer from '../assest/images1/construction-worker.png'
import architect from '../assest/images1/architect.png'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { BASE_URL } from '../Constants'
import RightSticky from '../Components/RightSticky';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TopArrow from '../Components/TopArrow';
import Qiuck from '../Components/Qiuck';
import CopyRight from '../Components/CopyRight';


var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SliderData: [],
            TestimonialData: [],
            CategoriesData: [],
            sliderloader: false

        };
    }


    componentDidMount() {
        this.setState({ sliderloader: true })
        //console.log('mounted');
        axios.get(`${BASE_URL}/get-teaque-slider-images`, {
            headers: headers
        })
            .then((response) => {
                // handle success
                console.log(response);
                this.setState({ SliderData: response.data.result, sliderloader: false })
            })
            .catch((error) => {
                // handle error
                console.log(error);
                this.setState({ sliderloader: false })
            })

        axios.get(`${BASE_URL}/get-teaque-testimonial`, {
            headers: headers
        })
            .then((response) => {
                console.log(response);
                this.setState({ TestimonialData: response.data.result })
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get(`${BASE_URL}/get-item-categories`, {
            headers: headers
        })
            .then((response) => {
                // handle success
                console.log(response);
                this.setState({ CategoriesData: response.data.result })
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
    }

    render() {
        //console.log(this.state)
        var sliderImages = this.state.SliderData
        var testContent = this.state.TestimonialData
        var category = this.state.CategoriesData
        var sliderloader = this.state.sliderloader
        console.log(category)
        return (
            <>
                <div className="bg-img" style={{}}>
                    <div className="fixed-top">
                        <div className="container-fluid">
                            <Header />
                        </div>

                        <section className="second">
                            <div className="">
                                <Navbar />
                            </div>
                        </section>
                    </div>
                    <div className="padding-top"></div>
                    <RightSticky />

                    <section className="homeSlider">
                        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                {sliderloader ? <div class="loader">Loading...</div> : sliderImages.map((ele, ind) => {
                                    return <div className={ind == 0 ? "active carousel-item" : "carousel-item"}>
                                        <div className="slideimg d-flex">
                                            <img className="d-block w-100" src={ele.image_url} alt="banner-image" className="img-fluid banner" />

                                            {/* <div className="overlay">
                                                <img src={path9} alt="banner-image" className="img-fluid" />
                                            </div> */}
                                        </div>
                                    </div>
                                })}
                                {/* <div className="carousel-item active">
                                <img className="d-block w-100" src={bannerimg} alt="banner-image" className="img-fluid banner" />
                                <div className="overlay">
                                    <img src={path9} alt="banner-image" className="img-fluid" />
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src={about} className="img-fluid banner" />
                                <div className="overlay">
                                    <img src={path9} alt="banner-image" className="img-fluid" />
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src={productbanner} alt="Third slide" className="img-fluid banner" />
                                <div className="overlay">
                                    <img src={path9} alt="banner-image" className="img-fluid" />
                                </div>
                            </div> */}
                            </div>
                            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </section>



                    <section className="category">
                        <div className="">
                            <h1 className=" test text-center heading-text-color m-4 heading">Our Values</h1>
                            <div className=" d-flex banner ">
                                <img src={customerCentric} alt="banner-image" className="img-fluid d-block w-100" />
                            </div>
                            <div className=" container product">
                                <h1 className=" test text-center heading-text-color mt-4 heading">Our Products</h1>
                                <div className="row">
                                    {category.map((ele, ind) => {
                                        return ele.image != "" ? <div className="col-md-6 mt-4">
                                            <div className="product-box position-relative">

                                                <Link to="products">
                                                    <img src={ele.image} alt="banner-image" className="productImg img-fluid"/>
                                                </Link>
                                                <div className="overlay product-text text-center py-2">
                                                    <div className="bottom-left">{ele.value}</div>
                                                </div>
                                            </div>

                                        </div> : null
                                    })}
                                    {/* <div className="col-md-6">
                                    <div className="product-box">
                                        <Link to="product">
                                            <img src={feb} alt="banner-image" className=" img-fluid" />
                                        </Link>
                                        <div className="overlay product-text text-center py-2">
                                            <div className="bottom-left">Natural Veneer</div>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-md-6">
                                    <div className="product-box">
                                        <Link to="product">
                                            <img src={smoke} alt="banner-image" className="img-fluid" />
                                        </Link>
                                        <div className="overlay product-text text-center py-2">
                                            <div className="bottom-left">Smoke Veneer</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="product-box">
                                        <Link to="product">
                                            <img src={efsgimg} alt="banner-image" className="img-fluid" />
                                        </Link>
                                        <div className="overlay product-text text-center py-2">
                                            <div className="bottom-left">Metallic Veneer</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="product-box">
                                        <Link to="product">
                                            <img src={redwood} alt="banner-image" className="img-fluid" />
                                        </Link>
                                        <div className="overlay product-text text-center py-2">
                                            <div className="bottom-left">blur Veneer</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="product-box">
                                        <Link to="product">
                                            <img src={feb} alt="banner-image" className="img-fluid" />
                                        </Link>
                                        <div className="overlay product-text text-center py-2">
                                            <div className="bottom-left">Natural Veneer</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="product-box">
                                        <Link to="product">
                                            <img src={smoke} alt="banner-image" className="img-fluid" />
                                        </Link>
                                        <div className="overlay product-text text-center py-2">
                                            <div className="bottom-left">Smoke Veneer</div>
                                        </div>
                                    </div>
                                </div> */}
                                </div>
                            </div>
                        </div>
                    </section>


                    <section className="grid">
                        <div className="banner">
                            <h1 class="text-center heading-text-color heading m-4">Teaque For Professionals</h1>
                            <div className="bg-img p-2" style={{
                                backgroundImage: `url(${professional})`,
                                backgroundSize: "cover",
                                backgroundSize: "cover",

                            }}>
                                <div id="best-features" class="text-center py-2">

                                    <div class="d-flex justify-content-center">
                                        <div class="col-md-8 mt-4">
                                            <p class="grey-text">Can't figure out which veneer fits your space/ work area?<br />Leave your query and we'll get back to you.
                                            </p>
                                        </div>
                                    </div>



                                    <div class="d-flex flex-wrap">
                                        <div class="cards col-md-4 col-sm-12 col-12 mb-1 px-2">
                                            <img className="img-card img-fluid" src={interior} alt="Card image cap" />
                                            <p class="grey-text mt-2 text-center">If you are an interior designer and looking <br />for support enquire here.</p>
                                            <Link to="/contact">
                                                <button type="button" class="btn btn-secondary">Enquire Now</button>
                                            </Link>
                                        </div>



                                        <div class="cards col-md-4 col-sm-12 col-12 mb-1 px-2">
                                            <img className="img-card img-fluid" src={engineer} alt="Card image cap" />
                                            <p class="grey-text mt-2 text-center">If you are a builder/contractor and looking <br />for support enquire here.</p>
                                            <Link to="/contact">
                                                <button type="button" class="btn btn-secondary">Enquire Now</button>
                                            </Link>
                                        </div>



                                        <div class="cards col-md-4 col-sm-12 col-12 mb-1 px-2">
                                            <img className="img-card img-fluid" src={architect} alt="Card image cap" />
                                            <p class="grey-text mt-2 center">If you are an architect and looking <br />for support enquire here.</p>
                                            <Link to="/contact">
                                                <button type="button" class="btn btn-secondary">Enquire Now</button>
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>







                    <section className="testimonials">
                        <div className="container">
                            <h1 className=" heading-text-color text-center m-4 heading">Testimonials</h1>
                            <Slider {...settings}>
                                {testContent.map((ele, ind) => {
                                    return <div className={ind == 0 ? "active carousel-item" : "carousel-item"}>
                                        <div className="testimonial d-flex mt-2 border border-warning py-3 bg-light">
                                            <div className="row px-3">
                                                <div className="col-md-4 col-sm-12 col-12">
                                                    <div className="">
                                                        <img className="img-fluid" src={ele.testimonial_image} alt="First slide" />
                                                    </div>
                                                </div>
                                                <div className="col-md-8 col-sm-12 col-12 pl-3 mt-2">

                                                    <p>{ele.testimonial_text}</p>
                                                    <p className="d-flex justify-content-end mt-1 font-weight-bold">- john & jane</p>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                })}
                            </Slider>
                            {/* <div className="jumbotron bgjumbo">
                            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner"> */}
                            {/* {testContent.map((ele, ind) => {
                                        return <div className={ind == 0 ? "active carousel-item" : "carousel-item"}>
                                            <div className="row">
                                                <div className="col-md-3 col-sm-12">
                                                    <div className="testimg">
                                                        <img className="img-fluid" src={ele.testimonial_image} alt="First slide" />
                                                    </div>
                                                </div>
                                                <div className="col-md-7 col-sm-12 pl-5 mt-4">
                                                    
                                                    <p>{ele.testimonial_text}</p>

                                                </div>
                                                <div className="col-md-2 col-sm-12 text-center">
                                                    <h2 className="arrowright m-5 p-5 font-weight-bold"><i className="fas fa-chevron-right"></i></h2>
                                                </div>
                                            </div>
                                        </div>
                                    })} */}
                            {/* <div className="carousel-item active">

                                        <div className="row">
                                            <div className="col-md-3 col-sm-12  rounded-circle">
                                                <img className="rounded-circle img-fluid " src={demo} alt="First slide" />
                                            </div>
                                            <div className="col-md-6 col-sm-12 pl-5">
                                                <h2>Lorem ipsum </h2>
                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex earum optio, tempora repudiandae ea eos perspiciatis in pariatur tempore excepturi enim voluptates quisquam numquam, ullam ipsum et. Est, quasi natus!
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta amet eaque quod ullam officiis totam a, error illum voluptate provident earum quasi cum deleniti non suscipit temporibus ad ipsam obcaecati.
                                            </p>
                                            </div>
                                            <div className="col-md-2 col-sm-12  text-center mt-4 mx-4">
                                                <h2 className=" arrowright m-5 p-5 font-weight-bold"><i className="fas fa-chevron-right"></i></h2>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="carousel-item">
                                        <div className="row">
                                            <div className="col-md-3 col-sm-12 rounded-circle mx-4">
                                                <img className="rounded-circle img-fluid" src={demo} alt="Second slide" />
                                            </div>
                                            <div className="col-md-6 col-sm-12 px-5 ">
                                                <h2>Lorem ipsum </h2>
                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex earum optio, tempora repudiandae ea eos perspiciatis in pariatur tempore excepturi enim voluptates quisquam numquam, ullam ipsum et. Est, quasi natus!
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta amet eaque quod ullam officiis totam a, error illum voluptate provident earum quasi cum deleniti non suscipit temporibus ad ipsam obcaecati.
                                            </p>
                                            </div>
                                            <div className="col-md-2 col-sm-12 text-center">
                                                <h2 className="arrowright m-5 p-5 font-weight-bold"><i className="fas fa-chevron-right"></i></h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <div className="row">
                                            <div className="col-md-3 col-sm-12 rounded-circle mx-4">
                                                <img className="rounded-circle img-fluid" src={demo} alt="Third slide" />
                                            </div>
                                            <div className="col-md-6 col-sm-12">
                                                <h2>Lorem ipsum </h2>
                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex earum optio, tempora repudiandae ea eos perspiciatis in pariatur tempore excepturi enim voluptates quisquam numquam, ullam ipsum et. Est, quasi natus!
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta amet eaque quod ullam officiis totam a, error illum voluptate provident earum quasi cum deleniti non suscipit temporibus ad ipsam obcaecati.
                                            </p>
                                            </div>
                                            <div className="col-md-2  col-sm-12 text-center">
                                                <h2 className="arrowright m-5 p-5 font-weight-bold"><i className="fas fa-chevron-right"></i></h2>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                            {/* <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                        
                                        <span className="sr-only">Previous</span>
                                    </a>
                                    <a className="carousel-control-next " href="#carouselExampleControls" role="button" data-slide="next">
                                        
                                        <span className="sr-only">Next</span>
                                    </a>
                                </div>
                            </div>
                        </div> */}
                        </div>
                    </section>
                    <section className="last">
                        <div className="mt-5">
                            <Footer />
                        </div>
                    </section>
                    <div>
                        <TopArrow />
                        <Qiuck />
                        <CopyRight />
                    </div>

                    {/* homecomplete */}

                </div>
            </>
        )
    }
}
