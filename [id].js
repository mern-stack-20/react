import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import featureImg from '/public/feature.jpg';
import Fade from 'react-reveal/Fade';
import Head from '../../../components/Layout/Head';
import TopBar from '../../../components/Layout/TopBar';
import Footer from '../../../components/Layout/Footer';
import axios from 'axios'
import { BASE_URL } from '../../../config/constants'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tab1, Tab2, Tab3, Tab4 } from '../../../components/Tab';

const notifyDanger = (tostText) => toast.error(tostText);



const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}
const tabContext = React.createContext()

function Report(props) {
    const [report, setReport] = useState({})
    const [related, setRelated] = useState([])
    const [visibleTab, setVisibleTab] = useState('tab1')
    const [recentLimit, setRecentLimit] = useState(5)
    const [currentQuery, setQuery] = useState("")
    const [currentPage, setPage] = useState(1)
    const [license, setLicense] = useState("")



    const tabs = {
        'tab1': <Tab1 />,
        'tab2': <Tab2 />,
        'tab3': <Tab3 />,
        'tab4': <Tab4 />,

    }



    const router = useRouter()
    const query = router.query.id



    useEffect(() => {
        //console.log(props)
        fetchData();
    }, []);

    const fetchData = () => {

        axios.get(`${BASE_URL}/get-report-by-pub-id/${query}`, {
            headers: headers
        }).then((response1) => {
            setReport(response1.data.data)
            localStorage.setItem("currentReportTitle", response1.data.data.report_title)
            localStorage.setItem("currentReportId", response1.data.data.report_id)

            axios.post(`${BASE_URL}/get-related-reports`, { "limit": recentLimit, "query": currentQuery, "page": currentPage, "industry_id": response1.data.data.industry_id, "report_id": response1.data.data.report_id }, {
                headers: headers
            }).then((response) => {
                //console.log(response , "relatedrepor")
                setRelated(response.data.result.rows)
            })
                .catch((error) => {

                })
        })
            .catch((error) => {

            })
    }

    const onChangeLicense = (e) => {
        setLicense(e.target.value)
        localStorage.setItem("license", e.target.value)
        //console.log(induId,reportId,"here")
    }


    return (
        <>
            {/* {console.log(report, "here")} */}
            <TopBar />
            <Head />
            <div className="padding-top-banner"></div>
            <div className="container-fluid report-main p-0">


                <div className="container-fluid">
                    <div className="row ">
                        <div className="col-md-8 col-sm-12 col-12">

                            <div className="container global-main mt-5">
                                <div className="row">
                                    {/* <div className="col-md-2 col-sm-2 col-12 mt-3">
                                        <Image src={featureImg} alt="" className="img-fluid global-img" />
                                    </div> */}

                                    <div className="col-md-12 col-sm-12 col-12 mt-3" key={report.report_id}>
                                        <h4 className="">{report.report_title}</h4>

                                        <p className="text-secondary m-0">SKU : {report.pub_id}</p>
                                        <div className="d-flex">
                                            <h6 className="text-secondary">{report.industry_name}</h6>
                                            <h6 className="text-secondary mx-3"><i className="fas fa-calendar"></i> June 2021 | <i className="fas fa-file-alt"></i> {report.pages}</h6>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="container table-main mt-5 p-3">
                                <table className="table table-striped table-bordered">
                                    <thead>
                                        <tr className="text-center table-head">
                                            <th scope="col" style={'tab1' === visibleTab ? { backgroundColor: '#093ba7', color: "#fff" } : null} onClick={() => setVisibleTab('tab1')}>Report Description</th>
                                            <th scope="col" style={'tab2' === visibleTab ? { backgroundColor: '#093ba7', color: "#fff" } : null} onClick={() => setVisibleTab('tab2')}>Table of Content</th>
                                            <th scope="col" style={'tab3' === visibleTab ? { backgroundColor: '#093ba7', color: "#fff" } : null} onClick={() => setVisibleTab('tab3')}>Research Methodology</th>
                                            {/* <th scope="col" style={'tab4' === visibleTab ? { backgroundColor: '#093ba7', color: "#b48805" } : null} onClick={() => setVisibleTab('tab4')}>Free Sample Request</th> */}
                                            <th scope="col" style={{ backgroundColor: '#b48805', color: "#FFF" }} onClick={() => setVisibleTab('tab4')}>Free Sample Request</th>

                                        </tr>
                                    </thead>
                                </table>
                                <tabContext.Provider value={report}>
                                    {tabs[visibleTab]}
                                </tabContext.Provider>



                            </div>
                        </div>

                        <div className="col-md-4 col-sm-12 col-12 mt-5">
                            <div className="form-main p-4">
                                <form>

                                    <div className="col">
                                        <p className="text-center border p-2" style={{ fontSize: "20px", backgroundColor: "#F4F4F4" }}>Choose License Type :</p>
                                    </div>
                                    <div className="col mt-3 d-flex justify-content-center">

                                        <div className="lic-check-main">

                                            <label className="container lic-check"><p>Single User License (USD 3450)</p>
                                                <input onChange={(e) => { onChangeLicense(e) }} type="radio" name="license" value="Single User License (USD 3450)" />
                                                <span className="checkmark"></span>
                                            </label>
                                            <label className="container lic-check"><p>Multi User License (USD 4500)</p>
                                                <input onChange={(e) => { onChangeLicense(e) }} type="radio" name="license" value="Multi User License (USD 4500)" />
                                                <span className="checkmark"></span>
                                            </label>
                                            <label className="container lic-check"><p className="mb-4">Corporate  License (USD 6500)</p>
                                                <input onChange={(e) => { onChangeLicense(e) }} type="radio" name="license" value="Corporate  License (USD 6500)" />
                                                <span className="checkmark"></span>
                                            </label>

                                           
                                                
                                            
                                                    <div className="form-button mt-4 d-flex justify-content-center">
                                                       
                                                       {license ? <Link
                                                            href={{
                                                                pathname: "/buy_now",
                                                                query: { reportId: report.report_id, industryId: report.industry_id }
                                                            }}
                                                        >
                                                            <span type="button" className="btn  formbtn  btn-block"   >Buy Now</span>
                                                        </Link> :
                                                        <span type="button" className="btn  formbtn  btn-block"  onClick={()=>notifyDanger("Please Select License")} >Buy Now</span>}

                                                    </div>
                                                    
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="container request-sample mt-5 p-4 d-flex justify-content-center">
                                <div className=" row form-button">

                                    <Link href={{ pathname: `/check_discount`, query: { reportId: report.report_id, industryId: report.industry_id } }} >
                                        <button type="button" className="btn request btn-block">Check Discount</button>
                                    </Link>
                                    {/* <Link href={{ pathname: `/request_sample`, query: { reportId: report.report_id } }}>
                                        <span type="button" className="btn  formbtn col-md-12 ">Free Sample Request</span>
                                    </Link> */}
                                    <Link href={{ pathname: `/enquiry`, query: { reportId: report.report_id, industryId: report.industry_id } }}>
                                        <span type="button" className="btn  request col-md-12  mt-3">Enquire Before Buying</span>
                                    </Link>
                                </div>
                            </div>

                            <div className="latest mt-5 d-flex justify-content-center">
                                <div className="container">
                                    <div className="latest-heading p-3 text-center bg-color ">Related Reports</div>
                                    <div className="row mt-4">
                                        {related.map((ele, ind) => {
                                            return <>
                                                <div className="col-md-3 col-sm-4 col-4" key={ele.report_id}>
                                                    <Image src={featureImg} alt="" className="img-fluid global-img" />
                                                </div>
                                                <div className="col-md-9 col-sm-8 col-8 report-para">
                                                    <p className="latest-head" style={{ fontSize: "16px" }}>{ele.report_title}</p>
                                                    {/* <p className="latest-para" dangerouslySetInnerHTML={{ __html: ele.content_body }} style={{fontSize:"12px"}}>
                                                    </p> */}
                                                </div>
                                            </>
                                        })}


                                    </div>

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

export default Report
export { tabContext }
export async function getServerSideProps(context) {
    //console.log("server side props value : ", context)
    return {
        props: { query: context.query }, // will be passed to the page component as props
    };
}


