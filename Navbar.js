import React, {useState, useContext} from 'react'

import { Link, useLocation  } from 'react-router-dom'
import '../assest/style.css';
import Selectionpopup from '../Components/Selectionpopup'
import SelectedContext from '../HOC/SelectedContext'


export default function Navbar() {
    const [showPopup, setshowPopup] = useState(false);    
    const [query, setQuery] = useState("");    
    const ctx = useContext(SelectedContext)
    const location = useLocation()

    let anySelected = ()=>{
        if(ctx){
            let places = Object.keys(ctx.selectedPlace)
            return places.some(place=>{
                return ctx.selectedPlace[place].isSelected
            })
        }else{
            return false
        }
        
    }

    const handleSearchInputChange = (ele) => {
        setQuery(ele.target.value)
        localStorage.setItem('searchQuery', ele.target.value)
        //console.log(location.pathname)
    };

  
    return (
        <nav className="navbar navbar-expand-lg position-relative">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"><i class="fas fa-bars mt-1"></i></span>
                       </button>
        
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="nav w-100 d-flex justify-content-center ">
                                <li className="nav-item headitems">
                                    <Link to="/" className="nav-link" href="#">Home</Link>
                                </li>
                                <li className="nav-item headitems">
                                    <Link to="/products" className="nav-link" href="#">Products</Link>
                                </li>
                                <li className="nav-item">
                                   <Link to="/about" className="nav-link" href="#">About Us</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/gallery" className="nav-link " href="#">Gallery</Link>
                                </li>
                                <li className="nav-item">
                                     <Link to="/veneerselection" className="nav-link " href="#">Veneer Selection</Link>
                                 </li>
                                 <li className="nav-item">
                                     <Link to="/blogs" className="nav-link " href="#">Blogs</Link>
                                 </li>
                                 <li className="nav-item">
                                     <Link to="/contact" className="nav-link" href="#">Contact Us</Link>
                               </li>
                               <li className="nav-item">
                                   <div className="form-inline search-boxform my-2 my-lg-0">
                                    <input onChange={(ele)=>handleSearchInputChange(ele)} 
                                    value={localStorage.getItem('searchQuery')} 
                                    className="form-control  search-box" 
                                    type="search" 
                                    placeholder="Search Here" 
                                    aria-label="Search" 
                                    />  
                                    {
                                        location.pathname == "/products" ?
                                        <Link
                                            to={{
                                                pathname: "/searchedProducts",
                                                state: { query: query }
                                              }}
                                        >
                                        <button className="btn  search-icon my-2 ml-2 my-sm-0" type="submit"><i class="fa fa-search"></i></button>
                                        </Link>
                                        :
                                        <Link
                                            to={{
                                                pathname: "/products",
                                                state: { query: query }
                                              }}
                                        >
                                        <button className="btn  search-icon my-2 ml-2 my-sm-0" type="submit"><i class="fa fa-search"></i></button>
                                        </Link>
                                    }
                                    </div>
                                </li>

                            {anySelected() &&  <li className="nav-item">
                                     <div className="heart ml-5">
                                         <span className="favourite" style={{ fontSize: "35px", color: "#efc120" }}><i class="fas fa-heart" onClick={() => setshowPopup(!showPopup)}></i></span>
                                     </div>
        
        
                             </li> }

                                
        
                        </ul>
        
                       </div>
        
                       {showPopup ?
                         <Selectionpopup/>
                        : null}
        
                    </nav >
        
        
        
    )
}






// import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import '../assest/style.css';
// import Selectionpopup from '../Components/Selectionpopup'


// export default class navbar extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             showPopup: false
//         }
//     }
    
//     togglePopup() {
//         this.setState({
//             showPopup: !this.state.showPopup
//         });
//     }


//     render() {
//         return (

//             <nav className="navbar navbar-expand-lg position-relative">
//                 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"><i class="fas fa-bars mt-1"></i></span>
//                 </button>

//                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                     <ul className="nav w-100 d-flex justify-content-center ">
//                         <li className="nav-item headitems">
//                             <Link to="/" className="nav-link" href="#">Home</Link>
//                         </li>
//                         <li className="nav-item headitems">
//                             <Link to="/products" className="nav-link" href="#">Products</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link to="/about" className="nav-link" href="#">About Us</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link to="/gallery" className="nav-link " href="#">Gallery</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link to="/veneerselection" className="nav-link " href="#">Veneer Selection</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link to="/blogs" className="nav-link " href="#">Blogs</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link to="/contact" className="nav-link" href="#">Contact Us</Link>
//                         </li>
//                         <li className="nav-item">
//                             <form className="form-inline search-boxform my-2 my-lg-0">
//                                 <input className="form-control  search-box" type="search" placeholder="Search Here" aria-label="Search" />
//                                 <button className="btn  search-icon my-2 ml-2 my-sm-0" type="submit"><i class="fa fa-search"></i></button>
//                             </form>
//                         </li>



//                         <li className="nav-item">
//                             <div className="heart ml-5">
//                                 <span className="favourite" style={{ fontSize: "35px", color: "#efc120" }}><i class="fas fa-heart" onClick={() => this.togglePopup()}></i></span>
//                             </div>


//                         </li>

//                     </ul>

//                 </div>

//                 {this.state.showPopup ?
//                   <Selectionpopup/>
//                     : null}

//             </nav >




//         )
//     }
// }
