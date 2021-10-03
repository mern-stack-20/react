import React, {useContext } from 'react'
//import { tabContext } from '../../pages/report/[id]'
//import { tabContext } from '../../pages/report/[industry_name]/[url_key]/[id]'
import { tabContext } from '../../pages/industry-reports/[url_key]/[id]'


export default function tab1() {
    
    const tabCtx = useContext(tabContext) 
  
      
    return (
        <>
        {/* {console.log(tabCtx)} */}
        <div className="reportdes mt-5">
        <h4 className="text-center text-color">Report Description</h4>
        <hr/>
                        {
                            Object.keys(tabCtx).length == 0 ?
                            <p className="text-center">NO DATA FOUND</p>
                            :
                            <>
                            <p className="mt-3" dangerouslySetInnerHTML={{ __html: tabCtx.content_body }} ></p>
                            </>
                        }
                         
                     </div>
            
        </>
    )
}
