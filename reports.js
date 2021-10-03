import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import Head from '../components/Layout/Head';
import TopBar from '../components/Layout/TopBar';
import Footer from '../components/Layout/Footer';
import Fade from 'react-reveal/Fade';
import Ripples from 'react-ripples'
import axios from 'axios'
import { BASE_URL } from '../config/constants'
import { useRouter } from 'next/router'
import { appContext } from '../pages/_app'



const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

export default function Reports() {
    const [report, setReport] = useState([])
    const [sliderLoader, setSliderLoader] = useState(false)
    const [currentLimit, setLimit] = useState(5)
    const [currentPage, setPage] = useState(1)
    const [pageArray, setPageArray] = useState([1])
    const [preShow, setPreShow] = useState(0)
    const [nextShow, setNextShow] = useState(0)
    const appCtx = useContext(appContext)
    const [filterData, setFilterData] = useState({ industry_id: [], pub_status: [] })

    const [industry, setIndustry] = useState([])
    const [publish, setPublish] = useState([])
    const [year, setYear] = useState(
        [
            // { name: "2020", value: "2020" },
            // { name: "2021", value: "2021" },
            // { name: "2022", value: "2022" },
            // { name: "2023", value: "2023" }
        ]
    )

    const router = useRouter()
    var router_query = router.query.query == undefined ? "" : router.query.query
    const [currentQuery, setQuery] = useState(router_query)
    // const { reportId } = router.query





    useEffect(() => {
        let { searchQuery, selecteIndustry } = appCtx.fromData
        console.log(appCtx)
        //console.log("on report page ", searchQuery, selecteIndustry)
        if (searchQuery && selecteIndustry) {
            var { industry_id } = filterData
            industry_id.push(selecteIndustry)
            setFilterData({ ...filterData, industry_id })
            setQuery(searchQuery)
            ////console.log(searchQuery)
            fetchData(searchQuery, currentLimit, currentPage);
            fetchFilterData()
            appCtx.setFormData({searchQuery:"",selecteIndustry:""})
        }else{
            if(router.query.industryId != undefined && router.query.industryId != ""){
                var { industry_id } = filterData
                industry_id.push(router.query.industryId)
                setFilterData({ ...filterData, industry_id:industry_id })
                fetchData(currentQuery, currentLimit, currentPage);
                fetchFilterData()
            }else{
             fetchData(currentQuery, currentLimit, currentPage);
             fetchFilterData()
            }
        }

    }, []);

    const fetchData = (query, limit, page,) => {
        setSliderLoader(true)
        axios.post(`${BASE_URL}/get-reports`, { "limit": limit, "query": query, "page": page, industry_id: filterData.industry_id, pub_status: filterData.pub_status }, {
            headers: headers
        })
            .then((response) => {
                // handle success
                ////console.log(response);
                setReport(response.data.result.rows)
                setSliderLoader(false)
                let page_array = []
                for (let i = 1; i <= response.data.result.pages; i++) {
                    page_array.push(i)

                }
                if (response.data.result.page !== 1) {
                    setPreShow(1)
                } else {
                    setPreShow(0)
                }

                if (response.data.result.page !== response.data.result.pages) {
                    setNextShow(1)
                } else {
                    setNextShow(0)
                }
                setPageArray(page_array)
                setPage(response.data.result.page)
            })
            .catch((error) => {
                // handle error
                // ////console.log(error);
                setSliderLoader(false)
            })
    }
    const handleSearchInputChange = (e) => {
        setQuery(e.target.value)

    };

    const submitSearch = (e) => {

        e.preventDefault()
        fetchData(currentQuery, currentLimit, currentPage)

    }

    const inIndustry = (indusName) => {

        // ////console.log("cat name is : ", indusName)
        let stateIndus = [...filterData.industry_id]
        return stateIndus.includes(indusName)
    }

    const changeIndusFilter = (indusName) => {
        let stateIndus = [...filterData.industry_id]
        if (stateIndus.includes(indusName)) {
            stateIndus.splice(stateIndus.indexOf(indusName), 1)
        } else {
            stateIndus.push(indusName)
        }


        let data = filterData
        data.industry_id = stateIndus
        setFilterData(data)
        fetchData(currentQuery, currentLimit, currentPage)



    }
    const inPublish = (pubName) => {

        // ////console.log("cat name is : ", indusName)
        let statePubs = [...filterData.pub_status]
        return statePubs.includes(pubName)
    }

    const changePubFilter = (pubName) => {
        let statePubs = [...filterData.pub_status]
        if (statePubs.includes(pubName)) {
            statePubs.splice(statePubs.indexOf(pubName), 1)
        } else {
            statePubs.push(pubName)
        }

        let data = filterData
        data.pub_status = statePubs
        setFilterData(data)
        fetchData(currentQuery, currentLimit, currentPage)



    }


    const inYear = (yearName) => {

        // ////console.log("cat name is : ", yearName)
        let stateYears = [...year]
        return stateYears.includes(yearName)
    }

    const changeYearFilter = (yearName) => {
        let stateYears = [...industry]
        if (stateYears.includes(yearName)) {
            stateYears.splice(stateYears.indexOf(yearName), 1)
        } else {
            stateYears.push(yearName)
        }
    }


    const fetchFilterData = () => {
        let industry_data = []
        let publish_data = []
        axios.get(`${BASE_URL}/get-all-industries`, {
            headers: headers
        })
            .then((response) => {
                response.data.industries.map((ele, ind) => {
                    //////console.log(ele)
                    industry_data.push({
                        name: ele.industry_name,
                        value: ele.industry_id
                    })
                })
                setIndustry(industry_data)
                //////console.log(industry ,"ayushi")
            })
            .catch((error) => {

            })
        axios.get(`${BASE_URL}/get-all-publish-status`, {
            headers: headers
        })
            .then((response) => {
                response.data.publish_status.map((ele, ind) => {
                    publish_data.push({
                        name: ele.pub_status,
                        value: ele.pub_status
                    })
                })
                setPublish(publish_data)
            })
            .catch((error) => {
                // handle error
                // ////console.log(error);
            })

    }



    return (

        <>

            {/* {////console.log(report,"ayushi")} */}
            <TopBar />
            <Head />
            <div className="padding-top-banner"></div>

            <div className="container-fluid reports-main p-0">

                {/* <div className="report-banner  d-flex justify-content-center">
                    <Fade top>
                        <h2 className="text-white mt-5 pt-5">REPORTS</h2>
                    </Fade>
                </div> */}


                {/* report-start */}

                <div className="main-reports col-md-12">
                    <div className="row">
                        {/* filter start */}
                        <button className="btn bg-color text-white hidden visible-xs ml-3" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            <i className="fas fa-filter"></i> Filter
                        </button>
                        <div className="col-md-4 filter">
                            <div className="mt-4 px-1 ml-5 collapse dont-collapse-sm" id="collapseExample">
                                <h5><i className="fas fa-filter"></i>  Refine Your Search</h5>

                                {industry.length ? <div className="indus mt-5">
                                    <p className="h6 font-weight-light">Industries</p>
                                    <hr className="hr text-light" />
                                    {industry.map(indus => {
                                        return <>
                                            <input type="checkbox"
                                                value={indus.value}
                                                checked={inIndustry(indus.value)}
                                                onChange={(e) => changeIndusFilter(e.target.value)} />

                                            <label htmlFor="some option" className="px-2">{indus.name}</label><br />
                                        </>
                                    })}

                                </div> : null}


                                {publish.length ? <div className="indus mt-5">
                                    <p className="h6 font-weight-light">Punblish Type</p>
                                    <hr className="hr text-light" />
                                    {publish.map(pub => {
                                        return <>
                                            <input type="checkbox"
                                                value={pub.value}
                                                checked={inPublish(pub.value)}
                                                onChange={(e) => changePubFilter(e.target.value)} />

                                            <label htmlFor="some option" className="px-2">{pub.name}</label><br />
                                        </>
                                    })}

                                </div> : null}

                                {year.length ? <div className="indus mt-5">
                                    <p className="h6 font-weight-light">Years</p>
                                    <hr className="hr text-light" />
                                    {year.map(year => {
                                        return <>
                                            <input type="checkbox"
                                                value={year.value}
                                                checked={inYear(year.value)}
                                                onChange={(e) => changeYearFilter(e.target.value)} />

                                            <label htmlFor="some option" className="px-2">{year.name}</label><br />
                                        </>
                                    })}

                                </div> : null}
                            </div>
                        </div>
                        {/* filter end */}

                        {/* report start*/}

                        <div className="reports col-md-8 mt-3">
                            {/* search start*/}
                            <div className="search d-flex justify-content-end">
                                <div className="col-md-4 col-sm-6  p-0">

                                    {/* <button className="navbar-toggler filterbtn" type="button" data-toggle="collapse" data-target="#SupportedContent" aria-controls="SupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"><i className="fas fa-bars mt-1"></i></span>
                                    </button> */}
                                    <form onSubmit={(e) => submitSearch(e)}>
                                        <div className="input-group">
                                            <input type="search"
                                                className="form-control rounded "
                                                placeholder="Search"
                                                aria-label="Search"
                                                aria-describedby="search-addon"
                                                value={currentQuery}
                                                onChange={(e) => handleSearchInputChange(e)} />

                                            <button className="text-white text-center px-3 ml-3 search-button" type="submit">search</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            {/* search end*/}

                            {/* report-box start*/}
                            {sliderLoader ? <div className="loader">Loading...</div> : (report.length ? report.map((ele, ind) => {

                                return <div className="report-box py-2 px-4" key={ele.report_id}>
                                    <div className="row">

                                        <div className="report-content col-md-9 col-sm-9 col-12">
                                           
                                            <Link href={{ pathname: `/industry-reports/${ele.url_key.replaceAll(" ", "-").toLowerCase()}/${ele.pub_id}`}}>
                                                <a>
                                                    <h5 className="mt-2">{ele.report_title}</h5>
                                                </a>
                                            </Link>
                                            
                                            <p className="mt-2 text-justify mb-2" dangerouslySetInnerHTML={{ __html: ele.content_body }} ></p>


                                            
                                           
                                                 {/* <p><Link href={{ pathname: `/report/${ele.industry_name.replaceAll(" ", "-").toLowerCase()}-${ele.url_key.replaceAll(" ", "-").toLowerCase()}-${ ele.report_id}`}}> */}
                                                  <p><Link href={{ pathname: `/industry-reports/${ele.url_key.replaceAll(" ", "-").toLowerCase()}/${ele.pub_id}`}}>
                                                    <a>
                                                        <span className=" text-color h6 mb-3"> Read more ...</span>
                                                    </a>
                                                </Link>
                                            </p>
                                            <h6 className="text-secondary"><i className="fas fa-calendar"></i> June 2021 | <i className="fas fa-file-alt"></i> {ele.pages}</h6>
                                        </div>


                                        <div className="col-md-3 col-sm-3 col-12 mt-4">
                                            <Link href={{ pathname: `/enquiry`, query: { reportId: ele.report_id,industryId: ele.report_ind_id } }}>
                                                <button type="button" className="btn enquire">Enquire Before Buying</button>
                                            </Link>

                                            <Link href={{ pathname: `/request_sample`, query: { reportId: ele.report_id ,industryId: ele.report_ind_id  } }} ><button type="button" className="btn bg-white mt-3  request ">Free Sample Request</button></Link>

                                        </div>

                                    </div>
                                </div>
                            }) : <div className="text-center mt-5">No reports found</div>)}

                            {/* report-box end*/}

                            {/* pagination start*/}

                            {sliderLoader ? "" : (report.length >= 2 ? <div className="page d-flex justify-content-end mt-3">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination pg-blue">
                                        {
                                            preShow ?

                                                <li className="page-item">
                                                    <span className="page-link" onClick={() => { fetchData(currentQuery, currentLimit, (currentPage - 1)) }}>Previous</span>
                                                </li> : ""}


                                        {pageArray.map((ele, ind) => {
                                            if (ele == currentPage || ele == currentPage + 1 || ele == currentPage - 1) {
                                                return <li className={ele == currentPage ? "page-item active" : "page-item"} key={ele}><a className="page-link" onClick={() => { fetchData(currentQuery, currentLimit, ele) }}>{ele}</a></li>
                                            }
                                        })}
                                        {
                                            nextShow ?

                                                <li className="page-item">
                                                    <a className="page-link" onClick={() => { fetchData(currentQuery, currentLimit, (currentPage + 1)) }}>Next</a>
                                                </li> : ""}
                                    </ul>
                                </nav>
                            </div> : "")}
                            {/* pagination end*/}

                        </div>

                    </div>
                </div>
            </div>
            {/* report-main end*/}
            <Footer />


        </>
    )
}

