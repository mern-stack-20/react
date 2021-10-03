import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { BASE_URL } from '../../config/constants'
import { useRouter } from 'next/router';
import { appContext } from '../../pages/_app'
  


const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}
const errorForm =
{
   
   search: "",
    industry: ""
}


export default function Search() {
    const [searchQuery, setSearchQuery] = useState("")
    const [industries , setIndustries] =useState([])
    const [selecteIndustry, setSelectedIndustry] = useState("")
    const appCtx = useContext(appContext)
    const router = useRouter();
    const [errors, setErrors] = useState({ ...errorForm })


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get(`${BASE_URL}/get-all-industries`, {
            headers: headers
        })
            .then((response) => {
                
                setIndustries( response.data.industries)
                //console.log(industry ,"ayushi")
            })
            .catch((error) => {

            })
    }

 

    const handleSearchReport = (e)=>{
        e.preventDefault() 
        var formError = {search: "",
        industry: ""}
        var isValid = true
        if(searchQuery== ""){
           formError.search = 'Search Keyword Required!'
             isValid = false
            
        }
        console.log(selecteIndustry,"ayushiiii")
        if(selecteIndustry == "" ){
           formError.industry = 'Please Select Industry!'
             isValid = false
            
        }
        setErrors({ ...formError })  
        if (isValid) {
            appCtx.setFormData({searchQuery, selecteIndustry})        
            router.push("/reports")
    
        }
        
    }


    return (
        <form className="search mt-5">
  

            <div className="row d-flex justify-content-center mt-5 mx-0 px-0">
                <div className="col-md-3  col-sm-12 p-0 search-box1" >

                    <input type="text"  className="form-control search-slt" placeholder="Search Keywords" 
                    value={searchQuery}
                    key={industries.industry_id}    
                    onChange={e => setSearchQuery(e.target.value)}
                    required/>
                    {errors.search.length > 0 &&
                                                    <p className='error mt-5 h5 pt-3  font-weight-bold text-white' >{errors.search}</p>}
                </div>
                {/* {errors.search.length > 0 &&
                                                    <p className='error' >{errors.search}</p>} */}
                <div className="col-md-3  col-sm-12 p-0 search-box2">
                    <select className="form-control search-slt" onChange={e=>setSelectedIndustry(e.target.value)}>
                    <option value="">All Industry</option>

                       {industries.map(ele => 
                            <option 
                            value={ele.industry_id}
                             key={ele.industry_id}                             
                             >{ele.industry_name}</option>
                       )}


                       
                    </select>
                    {errors.industry.length > 0 &&
                <p className='error text-white mt-5 pt-3 h5 font-weight-bold' >{errors.industry}</p>}
                </div>
              
                <div className="col-md-3  col-sm-12  p-0 search-box3">
                    
                    {/* <Link
                    href={{
                        pathname: "/reports",
                        query: { query: searchQuery}                      
                      }}
                    > */}
                    
                    <button  className="wrn-btn d-flex justify-content-center align-items-center" 
                    type="submit"
                    onClick={handleSearchReport}
                    >Search</button>
                    {/* </Link> */}
                </div>
            </div>


        </form>


    )
}
