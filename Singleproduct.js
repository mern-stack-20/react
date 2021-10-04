import React, { Component } from 'react'
import {
    Magnifier,
    GlassMagnifier,
    SideBySideMagnifier,
    PictureInPictureMagnifier,
    MOUSE_ACTIVATION,
    TOUCH_ACTIVATION
} from "react-image-magnifiers";

import '../assest/style.css';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Navbar from '../Components/Navbar';
import livingroom1 from '../assest/images/livingroom1.png';
import livingroom from '../assest/images/living-room.png';

import bgImage from '../assest/images/path_12.png';
import kitchen from '../assest/images/kitchen.png';
import office from '..//assest/images/office.png';
import bedroom from '..//assest/images/bedroom.png';
import CategoryJansathi from '../assest/images/Category-Jansathi.png';
import CategoryOptimaG from '../assest/images/Category-OptimaG.png';
import Plywoodshutterstock from '../assest/images/shutterstock_1520337956_(1).png';
import plywood from '../assest/images/Plywood-GreenClub_(1) (1).png';
import rectangle from '../assest/images/rectangle_35.png'
import comment from '../assest/images/comment.svg';
import user from '../assest/images/user.svg';
import phonecall from '../assest/images/phonecall.svg';
import axios from 'axios';
import { BASE_URL } from '../Constants'
import RightSticky from '../Components/RightSticky';
import TopArrow from '../Components/TopArrow';
import Qiuck from '../Components/Qiuck';
import CopyRight from '../Components/CopyRight';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

const notifyWarning = (tostText) => toast.warning(tostText);
const notifyDanger = (tostText) => toast.danger(tostText);

const regindiamobile  =   RegExp(/^[6-9]\d{9}$/);
const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};


export default class singleproduct extends Component {
    constructor(props) {
        super(props)
        //console.log(props)
        this.state = {
            sliderloader: false,
            singleproData: [],
            id: "",
            name:"",
            data:{
                mobile_number : "",
                email : "",
                enquiry_for : "",
                enquiry : "",
                name : "",
                state : "",
                city : "",
                item_id:props.match.params.productid
            },
            errors: {
                mobile_number: "",
                name: ""
            }

        }
    }
    resetEnquiryForm = () => {
        let item_id = this.state.id
        this.myFormRef.reset();
        this.setState({
            data:{
                mobile_number : "",
                email : "",
                enquiry_for : "",
                enquiry : "",
                name : "",
                state : "",
                city : "",
                item_id:item_id
            },
            errors: {
                mobile_number: "",
                name: ""
            }
           })
    }
    submit = (e) => {
        e.preventDefault()
        let item_id = this.state.id
        let formData = this.state.data
        let errors = this.state.errors;
        let IsValidFormdata = true

        if((formData.name == '') || ((formData.name.length) < 3)){
            errors.name = 'Username must be between 3 and 25 characters'
            IsValidFormdata = false
        }else{
            errors.name = ''
        }
        
        if((formData.mobile_number == '') || !regindiamobile.test(formData.mobile_number)){
            errors.mobile_number = 'Required 10 digits, please match requested format!'
            IsValidFormdata = false
        }else{
            errors.mobile_number = ''
        }
        
        this.setState({errors:errors})
        
        if (validateForm(this.state.errors) && IsValidFormdata) {
            console.error('valid Form')
            axios.post(`${BASE_URL}/add-teaque-enquiry`, { ...this.state.data }, {
                headers: headers
            })
                .then((response) => {
                    // handle success
                    //console.log(response.data.status);
                    if(response.data.status == "OK"){
                       this.setState({
                        data:{
                            mobile_number : "",
                            email : "",
                            enquiry_for : "",
                            enquiry : "",
                            name : "",
                            state : "",
                            city : "",
                            item_id:item_id
                        },
                        errors: {
                            mobile_number: "",
                            name: ""
                        }
                       })
                       this.myFormRef.reset();
                       notifyWarning('Enquiry Added!')
                    }else{
                        notifyDanger('Oops! Something went wrong.') 
                    }
                })
                .catch((error) => {
                    // handle error
                    //console.log(error);
                })
        } else {
            console.error('Invalid Form')
        }
    }
    handleInputChange = (value, name) => {
        let errors = this.state.errors;
        let formData = this.state.data;
        
        switch (name) {
            case 'name':
                errors.name =
                    value.length < 3
                        ? ' Username must be between 3 and 25 characters'
                        : '';
                break;
           case 'mobile_number':
                errors.mobile_number =
                    regindiamobile.test(value)
                        ? ''
                        : 'Required 10 digits, please match requested format!';
                break;

            default:
                break;
        }
        formData[name]=value
        this.setState({data:formData})
        //console.log(this.state.data)
    }

    static getDerivedStateFromProps(props, state) {
        return { id: props.match.params.productid }


    }
    
    componentDidMount() {
        this.setState({ sliderloader: true })
        //console.log('mounted');
        axios.get(`${BASE_URL}/get-teaque-item-by-id/${this.state.id}`, {
            headers: headers
        })
            .then((response) => {
                // handle success
                //console.log(response);
                this.setState({ singleproData: response.data.result[0], sliderloader: false })
            })
            .catch((error) => {
                // handle error
                console.log(error);
                this.setState({ sliderloader: false })
            })

            axios.get(`${BASE_URL}/get-teaque-item-by-name/${this.state.name}`, {
                headers: headers
            })
                .then((response) => {
                    // handle success
                    console.log(response);
                    this.setState({ singleproData: response.data.result[0], sliderloader: false })
                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                    this.setState({ sliderloader: false })
                })
    }
    render() {
        //console.log(this.props)
        let Product = this.state.singleproData
        var sliderloader = this.state.sliderloader
        const { errors } = this.state;

        return (
            <>
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


                <section className="third">
                    <div className="container">
                        <div className="bg-img" style={{
                            backgroundImage: `url(${bgImage})`,
                            backgroundSize: "cover"
                        }}>


                            <div className="product-heading text-center m-4">
                                <h2>Vintage Oak</h2>
                                <hr className=" product-heading-hr" />
                            </div>

                            <div className="singleproduct-img">
                                <div className="row">


                                    <div className="col-md-6 livingroom">
                                        {sliderloader ? <div class="loader">Loading...</div> :
                                            // <img src={Product.water_natural_white} alt="" className=" img-fluid" />
                                            <SideBySideMagnifier
                                                className="input-position"
                                                imageSrc={Product.water_natural_white}
                                                largeImageSrc={Product.water_natural_white}
                                                zoomPosition="left"
                                                fillAvailableSpace={false}
                                            />
                                        }
                                    </div>


                                    <div className="col-md-6 singleproduct-text">
                                        <div>
                                            <h2>{Product.item_name}</h2>
                                            <h6 className="mt-3">{Product.item_design}</h6>
                                            <div className="mt-2">
                                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis fuga ea dolorum, nulla suscipit animi! Explicabo, necessitatibus! Praesentium esse iusto, consequatur similique necessitatibus provident amet necessitatibus?
                                                <br /><br />
                                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere iste assumenda, animi est rerum labore harum ducimus hic itaque tempore voluptas ratione corrupti dicta excepturi vitae cumque ab quae quidem necessitatibus provident necessitatibus provident?
                                                <br /><br />
                                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non rerum veniam aliquid inventore repellendus deserunt corrupti adipisci voluptates soluta. Modi
                                                . Quo, odio.
                                                <br /><br />
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi asperiores aspernatur quibusdam laborum minus nihil nam, eius soluta earum repudiandae nemo pariatur delectus quae explicabo ullam beatae officiis! Rerum, consectetur.
                                                <br /><br />
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodiullam beatae officiis!ullam beatae officiis!
                                            </div>




                                        </div>

                                        <button type="button" data-toggle="modal" data-target="#myModal" class="btn btn-warning mt-5 px-2 h2">Enquiry Now</button>

                                        <button class="btn btn-warning mt-5 ml-3 px-2 h2"><a href={Product.water_natural_white} download={Product.water_natural_white} className="text-dark">Download</a></button>




                                    </div>

                                    <div className="row mt-5 px-4">
                                        <div className="col-md-3 col-sm-3">
                                            <img src={kitchen} alt="kitchen" className=" img-fluid" />
                                        </div>
                                        <div className="col-md-3 col-sm-3">
                                            <img src={bedroom} alt="bedroom" className=" img-fluid" />

                                        </div>
                                        <div className="col-md-3 col-sm-3">
                                            <img src={office} alt="office" className=" img-fluid" />

                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                </section>


                <section className="four">
                    <div className="container mt-5">
                        <h3 className="px-1">Related Products</h3>
                        <div className="relatedproduct" style={{
                            backgroundImage: `url(${rectangle})`,
                            backgroundPositionY: "20vh",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat"
                        }}>

                            <div className="row">
                                <div className="col-md-3">
                                    <img src={plywood} alt="kitchen" className=" img-fluid" />
                                </div>
                                <div className="col-md-3">
                                    <img src={CategoryJansathi} className="img-fluid" alt="4" />

                                </div>
                                <div className="col-md-3">
                                    <img src={CategoryOptimaG} className="img-fluid" alt="5" />

                                </div>
                                <div className="col-md-3">
                                    <img src={Plywoodshutterstock} className="img-fluid" alt="6" />
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                <section className="last mt-3">
                    <div className="">
                        <Footer />
                    </div>
                    <div>
                        <TopArrow />
                        <Qiuck />
                        <CopyRight />
                    </div>
                </section>


                <div className="modal" id="myModal">
                    <div className="modal-dialog">
                        <div className="modal-content bg-dark">
                            <h3 className="text-light text-center m-2">Enquire Now</h3>
                            <div className="modal-body">
                                <form ref={(el) => this.myFormRef = el} onSubmit={(e) => { this.submit(e) }} className="text-center">
                                    <div class="form-group pb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text enquireicon"><img src={user} alt="tel" className="img-fluid" /> </span>
                                            <input onChange={(e) => { this.handleInputChange(e.target.value, e.target.name) }} type="text" value={this.state.data.name} name="name" id="usernames" class="form-control enquirebg" autocomplete="off"
                                                placeholder="Enter User Name" />
                                        </div>
                                        {errors.name.length > 0 &&
                                            <span className='error bg-light d-block pl-2 pr-2' style={{ color: "red" }}>{errors.name}</span>}
                                    </div>

                                    <div class="form-group pb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text enquireicon"><img src={phonecall} alt="tel" className="img-fluid" /> </span>
                                            <input onChange={(e) => { this.handleInputChange(e.target.value, e.target.name) }} type="number" name="mobile_number" value={this.state.data.mobile_number} id="usernumber" class="form-control enquirebg" autocomplete="off"
                                                placeholder="Enter Mobile Number " />
                                        </div>
                                        {errors.mobile_number.length > 0 &&
                                            <span className='error bg-light d-block pl-2 pr-2' style={{ color: "red" }}>{errors.mobile_number}</span>}
                                    </div>

                                    <div class="form-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text enquireicon"><img src={comment} alt="tel" className="img-fluid mb-5" /> </span>
                                            <textarea onChange={(e) => { this.handleInputChange(e.target.value, e.target.name) }} class="form-control enquirebg" id="exampleFormControlTextarea1" placeholder="Message" name="enquiry" value={this.state.data.enquiry} rows="3"></textarea>
                                        </div>

                                    </div>


                                    <button type="submit" class="btn  btn-lg">Submit</button>

                                </form>

                            </div>


                            <div className="modal-footer">
                                <button onClick={()=>{this.resetEnquiryForm()}} type="button" className="btn btn-danger mt-4" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>

            </>

        )
    }
}
