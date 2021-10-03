import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from '../components/Layout/Head';
import TopBar from '../components/Layout/TopBar';
import Footer from '../components/Layout/Footer';
import Fade from 'react-reveal/Fade';
import Image from 'next/image';
import featureImg from '/public/feature.jpg';
import axios from 'axios'
import { BASE_URL } from '../config/constants'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}
const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const regindiamobile = RegExp(/^[6-9]\d{9}$/);

const notifySuccess = (tostText) => toast.success(tostText);
const notifyError = (tostText) => toast.Error(tostText);

export default function Request() {
    const router = useRouter()
    const initForm = {

        name: "",
        message: "",
        designation: "",
        company: "",
        email: "",
        country: "",
        mobile: ""
    }
    const errorForm =
    {
        name: "",
        designation: "",
        company: "",
        email: "",
        country: "",
        mobile: ""
    }
    const [contact, setContact] = useState({ ...initForm })
    const [errors, setErrors] = useState({ ...errorForm })
    const [recentLimit, setRecentLimit] = useState(5)
    const [currentQuery, setQuery] = useState("")
    const [currentPage, setPage] = useState(1)
    const [related, setRelated] = useState([])
    const [industryId, setIndustryId] = useState(router.query.industryId)
    const [reportId, setReportId] = useState(router.query.reportId)

    

    const submit = async (e) => {
        e.preventDefault()
        //let errors = {...errorForm}
        let isValid = true
        if (contact.name == "" || contact.name.length < 3) {
            errors.name = ' Username must be between 3 and 25 characters'
            isValid = false

        }
        if (contact.designation == "") {
            errors.designation = 'missing designation!'
            isValid = false

        }
        if (contact.company == "") {
            errors.company = 'missing company!'
            isValid = false

        }
        if (contact.email == "" || !validEmailRegex.test(contact.email)) {
            errors.email = 'Email is not valid!'
            isValid = false

        }
        if (contact.mobile == "" || !regindiamobile.test(contact.mobile)) {
            errors.mobile = 'Required 10 digits, please match requested format!'
            isValid = false

        }
        if (contact.country == "") {
            errors.country = 'missing country!'
            isValid = false

        }
        setErrors({ ...errors })
        if (isValid) {
            axios.post(`${BASE_URL}/add-inquiry`, { ...contact, report_id: reportId }, {
                headers: headers
            }).then((response) => {
                // handle success
                //console.log(response);
                if (response.data.status == 'OK') {

                    setContact({ ...initForm })
                    setErrors({ ...errorForm })
                    notifySuccess('Successfully Enquiry Added!')
                } else {
                    notifyError('Something went wrong.')
                }


            }).catch((error) => {
                // handle error
                ////console.log(error);
            })
        }
    }


    const handleInputChange = (value, name) => {

        switch (name) {
            case 'name':
                errors.name =
                    value.length < 3
                        ? ' Username must be between 3 and 25 characters'
                        : '';
                break;
            case 'designation':
                errors.designation =
                    value == ""
                        ? 'missing designation!'
                        : '';
                break;
            case 'company':
                errors.company =
                    value == ""
                        ? 'missing company!'
                        : '';
                break;
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'mobile':
                errors.mobile =
                    regindiamobile.test(value)
                        ? ''
                        : 'Required 10 digits, please match requested format!';
                break;
            case 'country':
                errors.country =
                    value == ""
                        ? 'missing country!'
                        : '';
                break;



            default:
                break;
        }
        setContact({ ...contact, [name]: value })
        setErrors({ ...errors })
    }


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.post(`${BASE_URL}/get-related-reports`, { "limit": recentLimit, "query": currentQuery, "page": currentPage, "industry_id": industryId, "report_id": reportId }, {
            headers: headers
        }).then((response) => {
            //console.log(response, "relatedrepor")
            setRelated(response.data.result.rows)
        })
            .catch((error) => {

            })
    }

    return (
        <>
            <TopBar />
            <Head />

            <div className="padding-top-banner"></div>
            <div className="container-fluid reports-main p-0">

                {/* <div className="report-banner d-flex justify-content-center">
                    <Fade top>
                        <h2 className="text-white mt-5 pt-5">Request Sample</h2>
                    </Fade>
                </div> */}
                <div className="container py-3">
                    <div className="row d-flex justify-content-around  mt-5">
                        <div className="col-md-8">
                            <div className="container">
                                <div className="sample-contact my-0">
                                    <div className="row ">
                                        <div className="col-12 col-lg-10 col-xl-8">
                                            <div className="header-sample">
                                                <h2 className="text-dark">Request Sample
                                                </h2>


                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-contact">
                                        <form onSubmit={(e) => submit(e)}>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="single-input">
                                                        <i className="fas fa-user"></i>
                                                        <input type="text"
                                                            name="name"
                                                            value={contact.name}
                                                            onChange={e => handleInputChange(e.target.value, e.target.name)}
                                                            className="pt-1"
                                                            placeholder="Full Name"
                                                            minLength="3"
                                                            maxLength="25"

                                                            autoComplete="off" />
                                                    </div>
                                                    {errors.name.length > 0 &&
                                                        <span className='error' style={{ color: "red", fontSize: "12px" }}>{errors.name}</span>
                                                    }
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="single-input">
                                                        <i className="fas fa-user-graduate"></i>
                                                        <input className="pt-1"
                                                            type="text"
                                                            name="designation"
                                                            value={contact.designation}
                                                            onChange={e => handleInputChange(e.target.value, e.target.name)}
                                                            placeholder="Designation"

                                                            autoComplete="off" />
                                                    </div>
                                                    {errors.designation.length > 0 &&
                                                        <span className='error' style={{ color: "red", fontSize: "12px" }}>{errors.designation}</span>}
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="single-input">
                                                        <i className="fas fa-building"></i>
                                                        <input className="pt-1"
                                                            type="text"
                                                            name="company"
                                                            value={contact.company}
                                                            onChange={e => handleInputChange(e.target.value, e.target.name)}
                                                            placeholder="Company Name"

                                                            autoComplete="off" />
                                                    </div>
                                                    {errors.company.length > 0 &&
                                                        <span className='error' style={{ color: "red", fontSize: "12px" }}>{errors.company}</span>}
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="single-input">
                                                        <i className="fas fa-envelope"></i>
                                                        <input className="pt-1"
                                                            type="email"
                                                            name="email"
                                                            value={contact.email}
                                                            onChange={e => handleInputChange(e.target.value, e.target.name)}
                                                            placeholder="Email"

                                                            autoComplete="off" />
                                                    </div>
                                                    {errors.email.length > 0 &&
                                                        <span className='error' style={{ color: "red", fontSize: "12px" }}>{errors.email}</span>}
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="single-input">
                                                        <i className="fas fa-flag"></i>
                                                        <input className="pt-1"
                                                            type="text"
                                                            name="country"
                                                            value={contact.country}
                                                            onChange={e => handleInputChange(e.target.value, e.target.name)}
                                                            placeholder="Country"

                                                            autoComplete="off" />
                                                    </div>
                                                    {errors.country.length > 0 &&
                                                        <span className='error' style={{ color: "red", fontSize: "12px" }}>{errors.country}</span>}
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="single-input">
                                                        <i className="fas fa-phone-alt"></i>
                                                        <input className="pt-1"
                                                            type="text"
                                                            name="mobile"
                                                            value={contact.mobile}
                                                            onChange={e => handleInputChange(e.target.value, e.target.name)}
                                                            placeholder="Phone Number"
                                                            minLength="10"
                                                            maxLength="10"

                                                            autoComplete="off" />
                                                    </div>
                                                    {errors.mobile.length > 0 &&
                                                        <span className='error' style={{ color: "red", fontSize: "12px" }}>{errors.mobile}</span>}
                                                </div>
                                                <div className="col-12">
                                                    <div className="single-input">
                                                        <i className="fas fa-comment-dots"></i>
                                                        <textarea placeholder="Customer Requirements"
                                                            className="pt-1"
                                                            name="message"
                                                            value={contact.message}
                                                            onChange={e => handleInputChange(e.target.value, e.target.name)}
                                                        >

                                                        </textarea>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="submit-input">
                                                        <input type="submit" name="submit" value="Send" />
                                                    </div>
                                                    <p className="mt-3 text-secondary">Your personal details are safe with us.</p>
                                                </div>
                                            </div>
                                        </form>
                                        {/* <ToastContainer
                                            position="bottom-left"
                                        /> */}
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-md-4 mt-2">
                            {/* <div className="form-main p-4 bg-white">
                            <form>
                                    
                                    <div className="col">
                                        <p className="text-center border p-2" style={{ fontSize: "20px" ,backgroundColor:"#F4F4F4" }}>Choose License Type :</p>
                                    </div>
                                    <div className="col mt-3">
                                
                                    <div className="lic-check-main">
                                   
                                        <label className="container lic-check">
                                            <p>Single User License (USD 3450)</p>
                                            <input type="radio" checked/>
                                            <span class ="checkmark"></span>
                                        </label>
                                        <label className="container lic-check">
                                            <p>Multi User License (USD 4500)</p>
                                            <input type="radio"/>
                                            <span class ="checkmark"></span>
                                        </label>
                                        <label className="container lic-check"><p className="mb-4">Corporate  License (USD 6500)</p>
                                            <input type="radio"/>
                                            <span class ="checkmark"></span>
                                        </label>
                                        </div>
                                        <div className="form-button mt-4 d-flex justify-content-around">
                                            <Link href="/buy_now">
                                                <span type="button" className="btn  formbtn mr-3 ">Buy Now</span>
                                            </Link>
                                           
                                            <Link href="/check_discount">
                                                <button type="button" className="btn request bg-white">Check Discount</button>
                                            </Link>
                                        </div>

                                    </div>
                                </form>
                            </div> */}



                            <div className="latest d-flex justify-content-center bg-white">
                                <div className="container">
                                    <div className="latest-heading p-3 text-center bg-color">Related Reports</div>
                                    {related.map((ele, ind) => {
                                        return <div className="row mt-4" key={ele.report_id}>
                                            <div className="col-md-4 col-sm-4 col-4">
                                                <Image src={featureImg} alt="" className="img-fluid global-img" />
                                            </div>
                                            <div className="col-md-8 col-sm-8 col-8">
                                                <p className="latest-head text-justify" style={{ fontSize: "12px" }}>{ele.report_title}</p>
                                                {/* <p className="latest-para">Lorem ipsum dolor sit amet consectetur adipisicing elit.

                                            </p> */}
                                            </div>

                                        </div>
                                    })}
                                    {/* <div className="row mt-4">
                                        <div className="col-md-4 col-sm-4 col-4">
                                            <Image src={featureImg} alt="" className="img-fluid global-img" />
                                        </div>
                                        <div className="col-md-8 col-sm-8 col-8">
                                            <h5 className="latest-head">Heading of the report</h5>
                                            <p className="latest-para">Lorem ipsum dolor sit amet consectetur adipisicing elit.

                                            </p>
                                        </div>

                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-md-4 col-sm-4 col-4">
                                            <Image src={featureImg} alt="" className="img-fluid global-img" />
                                        </div>
                                        <div className="col-md-8 col-sm-8 col-8">
                                            <h5 className="latest-head">Heading of the report</h5>
                                            <p className="latest-para">Lorem ipsum dolor sit amet consectetur adipisicing elit.

                                            </p>
                                        </div>

                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-md-4 col-sm-4 col-4">
                                            <Image src={featureImg} alt="" className="img-fluid global-img" />
                                        </div>
                                        <div className="col-md-8 col-sm-8 col-8">
                                            <h5 className="latest-head">Heading of the report</h5>
                                            <p className="latest-para">Lorem ipsum dolor sit amet consectetur adipisicing elit.

                                            </p>
                                        </div>

                                    </div>

                                    <div className="row mt-4">
                                        <div className="col-md-4 col-sm-4 col-4">
                                            <Image src={featureImg} alt="" className="img-fluid global-img" />
                                        </div>
                                        <div className="col-md-8 col-sm-8 col-8">
                                            <h5 className="latest-head">Heading of the report</h5>
                                            <p className="latest-para">Lorem ipsum dolor sit amet consectetur adipisicing elit.

                                            </p>
                                        </div>

                                    </div> */}
                                </div>
                            </div>


                        </div>
                    </div>
                </div>



            </div>
            <Footer />

        </>
    )
}


export async function getServerSideProps(context) {
    return {
      props: {}, // will be passed to the page component as props
    };
}
  