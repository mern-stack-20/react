import React, { Component } from 'react'
import '../assest/style.css';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Navbar from '../Components/Navbar';
import contactbanner from '../assest/images/contact1.png'
import path9 from '../assest/images/path _9.png'
import phonecall from '../assest/images/phonecall.svg';
import email from '../assest/images/gmailcon.svg';
import user from '../assest/images/user.svg';
import surface from '../assest/images/surface.svg';
import comment from '../assest/images/comment.svg';
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

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const regindiamobile  =   RegExp(/^[6-9]\d{9}$/);
const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};

export default class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{
                mobile_number : "",
                email : "",
                enquiry_for : "",
                enquiry : "",
                name : "",
                state : "",
                city : ""
            },
            errors: {
                mobile_number: "",
                email: "",
                name: "",
                state : "",
                city : ""
            }
        };
    }


    submit = (e) => {
        e.preventDefault()
        //console.log(this.state)
        let formData = this.state.data
        let errors = this.state.errors;
        let IsValidFormdata = true

        if((formData.name == '') || ((formData.name.length) < 3)){
            errors.name = 'Username must be between 3 and 25 characters'
            IsValidFormdata = false
        }else{
            errors.name = ''
        }
        if((formData.email == '') || !validEmailRegex.test(formData.email)){
            errors.email = 'Email is not valid!'
            IsValidFormdata = false
        }else{
            errors.email = ''
        }
        if((formData.mobile_number == '') || !regindiamobile.test(formData.mobile_number)){
            errors.mobile_number = 'Required 10 digits, please match requested format!'
            IsValidFormdata = false
        }else{
            errors.mobile_number = ''
        }
        if(formData.state == ''){
            errors.state = 'missing state'
            IsValidFormdata = false
        }else{
            errors.state = ''
        }
        if(formData.city == ''){
            errors.city = 'missing city'
            IsValidFormdata = false
        }else{
            errors.city = ''
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
                            city : ""
                        },
                        errors: {
                            mobile_number: "",
                            email: "",
                            name: "",
                            state : "",
                            city : ""
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
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'mobile_number':
                errors.mobile_number =
                    regindiamobile.test(value)
                        ? ''
                        : 'Required 10 digits, please match requested format!';
                break;
            case 'state':
                errors.state =
                    value == ""
                        ? 'missing state'
                        : '';
                break;
            case 'city':
                errors.city =
                    value == ""
                        ? 'missing city'
                        : '';
                break;    


            default:
                break;
        }
        formData[name]=value
        this.setState({data:formData})
        //console.log(this.state.data)
    }


    render() {
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
                    <div className="">
                        <div className="banner d-flex mt-1">
                            <img src={contactbanner} alt="banner-image" className="img-fluid d-block w-100 contactbaner" />
                            {/* <div className="overlay">
                                <img src={path9} alt="banner-image" className="img-fluid"  />
                            </div> */}
                        </div>
                    </div>
                </section >

                <div className="container-fluid">
                    <div className="contact-form">
                        <div className="product-heading text-center mt-4">
                            <h2 className="heading">Contact Us</h2>
                            <hr className=" product-heading-hr" />
                        </div>
                        <div className="container text-center mt-5">
                            <div className="row justify-content-center">
                                <form ref={(el) => this.myFormRef = el} className=" contactform col-md-8 col-sm-8 text-center" onSubmit={(e) => { this.submit(e) }}>
                                    <div class="form-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text contact"><img src={user} alt="tel" className="img-fluid" /> </span>
                                            <input onChange={(e) => { this.handleInputChange(e.target.value, e.target.name) }} type="text" name="name" value={this.state.data.name} id="usernames" class="form-control formbg" autocomplete="off"
                                                placeholder="Name" />
                                        </div>
                                        {errors.name.length > 0 &&
                                            <span className='error' style={{ color: "red" }}>{errors.name}</span>}

                                    </div>
                                    <div class="form-group mt-5">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text contact"><img src={phonecall} alt="tel" className="img-fluid" /> </span>
                                            <input onChange={(e) => { this.handleInputChange(e.target.value, e.target.name) }} type="number" name="mobile_number" value={this.state.data.mobile_number} id="usernumber" class="form-control formbg" autocomplete="off"
                                                placeholder="Mobile Number " />
                                        </div>
                                        {errors.mobile_number.length > 0 &&
                                            <span className='error' style={{ color: "red" }}>{errors.mobile_number}</span>}
                                    </div>
                                    <div class="form-group mt-5">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text contact"><img src={email} alt="tel" className="img-fluid" /> </span>
                                            <input onChange={(e) => { this.handleInputChange(e.target.value, e.target.name) }} type="email" name="email" class="form-control formbg" value={this.state.data.email} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" />

                                        </div>
                                        <span className='error' style={{ color: "red" }}>{errors.email}</span>
                                    </div>

                                    <div class="form-group mt-5">
                                    <div className='input-group-prepend' >  
                                        <span class="input-group-text contact"><img src={surface} alt="tel" className="img-fluid" /> </span>  
                                        <select name="state" className="form-control formbg" onChange={(e) => { this.handleInputChange(e.target.value, e.target.name) }}>
                                            <option value="">Select State</option>
                                            <option>Madhya Pradesh</option>
                                            <option>Maharastra</option>
                                            <option>Gujarat</option>
                                            <option>Uttar Pradesh</option>
                                            <option>Assam</option>

                                        </select>
                                    </div>    
                                    {errors.state.length > 0 &&
                                                <span className='error' style={{ color: "red" }}>{errors.state}</span>}
                                    </div>

                                    <div class="form-group mt-5">
                                    <div className='input-group-prepend' >
                                        <span class="input-group-text contact"><img src={surface} alt="tel" className="img-fluid" /> </span>    
                                        <select name="city" className="form-control formbg" onChange={(e) => { this.handleInputChange(e.target.value, e.target.name) }}>
                                            <option value="">select City</option>
                                            <option>Indore</option>
                                            <option>Ujjain</option>
                                            <option>Khandwa</option>
                                            <option>Burhanpur</option>
                                            <option>Maheshwar</option>
                                            <option>Dewas</option>
                                        </select>
                                    </div>   
                                    {errors.city.length > 0 &&
                                                <span className='error' style={{ color: "red" }}>{errors.city}</span>} 
                                    </div>

                                    <div class="form-group mt-5">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text contact"><img src={surface} alt="tel" className="img-fluid" /> </span>
                                            <input onChange={(e) => { this.handleInputChange(e.target.value, e.target.name) }} type="text" name="enquiry_for" value={this.state.data.enquiry_for} class="form-control formbg" autocomplete="off"
                                                placeholder="Enquiry For" />

                                        </div>

                                        {/* <span className='error' style={{ color: "red" }}>{errors.enquiry_for}</span> */}
                                    </div>

                                    <div class="form-group mt-5">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text contact"><img src={comment} alt="tel" className="img-fluid mb-5" /> </span>
                                            <textarea onChange={(e) => { this.handleInputChange(e.target.value, e.target.name) }} type="text" class="form-control formbg" name="enquiry" value={this.state.data.enquiry} id="exampleFormControlTextarea1" rows="3"></textarea>
                                            {/* {<span style={{ color: "red" }}>{this.state.errors["text"]}</span>} */}
                                        </div>
                                    </div>


                                    <button type="submit" class="btn  btn-lg submit mt-4">Submit</button>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>


                <section className="last mt-5">
                    <div className="">
                        <Footer />
                    </div>
                    <div>
                        <TopArrow />
                        <Qiuck />
                        <CopyRight />
                    </div>
                </section>

            </>
        )
    }
}
