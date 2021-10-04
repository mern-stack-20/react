import React, { Component, Fragment } from 'react'
import '../assest/style.css';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Navbar from '../Components/Navbar';
import productbanner from '../assest/images1/Untitled design (57).png'

import plywood from '../assest/images/Plywood-GreenClub_(1) (1).png'
import ecotec from '../assest/images/Plywood-Ecotec.png'
import PlywoodBharosa from '../assest/images/Plywood-Bharosa.png'
import { Link } from 'react-router-dom'

import CategoryJansathi from '../assest/images/Category-Jansathi.png'
import CategoryOptimaG from '../assest/images/Category-OptimaG.png'
import Plywoodshutterstock from '../assest/images/shutterstock_1520337956_(1).png'
// import path9 from '../assest/images/path _9.png'
import InputRange from 'react-input-range';

import "react-input-range/lib/css/index.css"

import axios from 'axios';
import { BASE_URL } from '../Constants'
import RightSticky from '../Components/RightSticky';
import TopArrow from '../Components/TopArrow';
import Qiuck from '../Components/Qiuck';
import CopyRight from '../Components/CopyRight';
import { namespace } from 'react-reveal/globals';
import SelectedContext from '../HOC/SelectedContext'

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}


let filter = [
    {
        "key": "item_category",
        "label": "Category",
        "option": [
            {
                "label": "Natural Veneer",
                "value": "Natural Veneer",
            }, {
                "label": "Smoke Veneer",
                "value": "Smoke Veneer",
            },
            {
                "label": "Metallic Veneer",
                "value": "Metallic Veneer",
            },
            {
                "label": "Blur Veneer",
                "value": "Blur Veneer",
            }
        ]
    },
    {
        "key": "item_design",
        "label": "Design",
        "option": [
            {
                "label": "vertical",
                "value": "Vertical",
            }, {
                "label": "Horizontal",
                "value": "Horizontal",
            },

        ]
    },
    {
        "key": "item_subtype",
        "label": "Sub-Type",
        "option": [
            {
                "label": " Magical",
                "value": " Magical",
            }, {
                "label": " Alive",
                "value": " Alive",
            },
            {
                "label": "Origin",
                "value": "Origin",
            },
            {
                "label": "Elegant",
                "value": "Elegant",
            }
        ]
    },
    {
        "key": "item_design",
        "label": "Design",
        "option": [
            {
                "label": "vertical",
                "value": "Vertical",
            }, {
                "label": "Horizontal",
                "value": "Horizontal",
            },

        ]
    },

]



export default class Product extends Component {
    constructor(props) {
        super(props)
        //console.log(props,"here")
        this.state = {
            selectedItems:[],
            currentPlace:localStorage.getItem('place'),
            sliderloader: false,
            itemData: [],
            priceRange: {
                min: 1, max: 5000
            },
            page: 1,
            limit: 10,
            query: props.location.state == undefined ? "" 
                   : (props.location.state.query == undefined ? "" : props.location.state.query),
            data: props.location.state == undefined ? 
                    {
                        item_price_to: 5000,
                        item_price_from: 1,
                        item_type: [],
                        item_subtype: [],
                        item_design: [],
                        item_category: [],
                        item_colour:[],
                        required_quantity:0,
                        interior_place:""
                    }
                  : ( props.location.state.filterData == undefined ? 
                                                                    {item_price_to: 5000,
                                                                    item_price_from: 1,
                                                                    item_type: [],
                                                                    item_subtype: [],
                                                                    item_design: [],
                                                                    item_category: [],
                                                                    item_colour:[],
                                                                    required_quantity:0,
                                                                    interior_place:""} 
                                                                    : props.location.state.filterData ),
            // data: {
            //     item_price_to: 5000,
            //     item_price_from: 1,
            //     item_type: [],
            //     item_subtype: [],
            //     item_design: [],
            //     item_category: [],
            //     item_colour:[],
            //     required_quantity:0
            // },

            categories: [
                { name: "Natural Veneer", value: "Natural Veneer" },
                { name: "Smoke Veneer", value: "Smoke Veneer" },
                { name: "Metallic Veneer", value: "metallic" },
                { name: "Blur Veneer", value: "blur" },
            ],
            type: [
                { name: "Natural", value: "Natural" },
                { name: "Reconstructed", value: "Reconstructed" },
            ],

            subType: [

                { name: "Magical", value: "Magical" },
                { name: "Alive", value: "Alive" },
                { name: "Origin", value: "Origin" },
                { name: "Elegant", value: "Elegant" },
            ],
            Design: [

                { name: "Horizontal", value: "Horizontal" },
                { name: "Vertical", value: "Vertical" },

            ],
            Colour:[],
            required_quantity:0
        }
    }
    
    static contextType = SelectedContext
    
    tagFavouriteItems = () => {
        let { selectedPlace } = this.context
        let selectedItems = []
        let place = JSON.parse(this.state.currentPlace)
        if(place['key']){
            if(selectedPlace[place['key']].isSelected){
             selectedItems = selectedPlace[place['key']].selectedIds
             this.setState({selectedItems:selectedItems})
            } 
        } 
    }

    addToFavourite=(ele,itemId)=>{
        ele.preventDefault()
        let { selectedPlace } = this.context
        let place = JSON.parse(this.state.currentPlace)
        //console.log(place)
        if(place['key']){
            if(selectedPlace[place['key']].isSelected){
                let value = selectedPlace[place['key']].selectedIds
                value.push(parseInt(itemId))
                this.context.changeSelection(place['key'], 'selectedIds', value)
            }
        } 
    }

    fetchFreshProductData = () => {
        this.setState({ sliderloader: true })
        let { page, limit, query, data } = this.state
       
        axios.post(`${BASE_URL}/get-all-teaque-items`, {
            page, limit, query, data

        }, {
            headers: headers
        })
            .then((response) => {
                // handle success                
                this.setState({ itemData: response.data.result.rows, sliderloader: false })

            })
            .catch((error) => {
                // handle error
                //console.log(error);
                this.setState({ sliderloader: false })

            })
    }

    fetchItemColours = () => {
        
        axios.post(`${BASE_URL}/get-all-teaque-colours`, {
            headers: headers
        })
            .then((response) => {
                if(response.data.status == "OK"){
                    let colours = []
                    response.data.result.map((ele,ind)=>{
                       colours.push({name:ele.value,value:ele.value})
                    })
                    this.setState({ Colour: colours})
                }                
            })
            .catch((error) => {
                // handle error
                //console.log(error);
            })
    }

    componentDidMount() {
        // let {selectedPlace} = this.state
        // //console.log({selectedPlace})
        this.fetchFreshProductData()
        this.fetchItemColours()
        this.tagFavouriteItems()
        let appdata = JSON.parse(localStorage.getItem("appstate"))
        //  let items = appdata.selectedPlace[0]
         //console.log(appdata )
        
        

    }

    inCategory = (catName) => {

        //console.log("cat name is : ", catName)
        let stateCats = [...this.state.data.item_category]
        return stateCats.includes(catName)
    }

    changeCatFilter = (catName) => {
        let stateCats = [...this.state.data.item_category]
        if (stateCats.includes(catName)) {
            stateCats.splice(stateCats.indexOf(catName), 1)
        } else {
            stateCats.push(catName)
        }

        let { data } = this.state
        data.item_category = [...stateCats]
        this.setState({ data }, () => {
            this.fetchFreshProductData()
            //console.log({data})
        })



    }

    inType = (typName) => {
        //console.log(typName)
        let types = [...this.state.data.item_type]
        return types.includes(typName)

    }

    changeTypFilter = (typName) => {
        let types = [...this.state.data.item_type]
        if (types.includes(typName)) {
            types.splice(types.indexOf(typName), 1)
        } else {
            types.push(typName)
        }
        let { data } = this.state
        data.item_type = [...types]
        this.setState({ data }, () => {
            this.fetchFreshProductData()
        })
    }


    inSubType = (subName) => {
        let subTypes = [...this.state.data.item_subtype]
        return subTypes.includes(subName)
    }

    changeSubTypFilter = (subName) => {
        let subTypes = [...this.state.data.item_subtype]
        if (subTypes.includes(subName)) {
            subTypes.splice(subTypes.indexOf(subName), 1)
        } else {
            subTypes.push(subName)
        }
        let { data } = this.state
        data.item_subtype = [...subTypes]
        this.setState({ data }, () => {
            this.fetchFreshProductData()
        })
    }

    inDesign = (desName) => {
        let Designs = [...this.state.data.item_design]
        return Designs.includes(desName)
    }

    changeDesign = (desName) => {
        let Designs = [...this.state.data.item_design]
        if (Designs.includes(desName)) {
            Designs.splice(Designs.indexOf(desName), 1)
        } else {
            Designs.push(desName)
        }
        let { data } = this.state
        data.item_design = [...Designs]
        this.setState({ data }, () => {
            this.fetchFreshProductData()
        })
    }

    inColour = (colName) => {
        let inColours = [...this.state.data.item_colour]
        return inColours.includes(colName)
    }

    changeColour = (colName) => {
        let Colours = [...this.state.data.item_colour]
        if (Colours.includes(colName)) {
            Colours.splice(Colours.indexOf(colName), 1)
        } else {
            Colours.push(colName)
        }
        let { data } = this.state
        data.item_colour = [...Colours]
        this.setState({ data }, () => {
            this.fetchFreshProductData()
        })
    }

    setPriceRange = (value) => {
        let { priceRange, data } = this.state
        data.item_price_to = value.max
        data.item_price_from = value.min
        priceRange = value
        this.setState({ data, priceRange }, () => {
            this.fetchFreshProductData()
        })
    }

    submitQuantityForm = (e) => {
        e.preventDefault()
        let { required_quantity, data } = this.state
        data.required_quantity = required_quantity
        this.setState({ data, required_quantity }, () => {
            this.fetchFreshProductData()
        })
    }


    render() {
        var items = this.state.itemData
        var sliderloader = this.state.sliderloader
        var selectedItemIds = this.state.selectedItems
        //console.log(this.context.selectedPlace)
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
                            <img src={productbanner} alt="banner-image" className="img-fluid d-block w-100 productbaner" />
                        </div>
                    </div>
                </section >

                <section className="four">
                    <div className="container-fluid">
                        <div className="product-heading text-center mt-4">
                            <h2 className="heading">Our Products</h2>
                            <hr className=" product-heading-hr" />
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-3 ">
                                <div className="filter px-2">
                                    <h6 className="p-2"><i className="fas fa-filter"></i> Filters</h6>

                                    <div className="Category p-2">
                                        <p className="h6 font-weight-light">Categories</p>
                                        {this.state.categories.map(cat => {
                                            return (
                                                <> <input type="checkbox" value={cat.value}
                                                    checked={this.inCategory(cat.value)}
                                                    onChange={(e) => { this.changeCatFilter(e.target.value) }}
                                                />
                                                    <label htmlFor="Natural" className="px-2">  {cat.name}</label><br />
                                                </>
                                            )
                                        })}
                                    </div>

                                    <hr className="hr text-light" />

                                    <div className="type p-2">
                                        <p className="h6 font-weight-light">Type</p>

                                        {this.state.type.map(typ => {
                                            return (<>
                                                <input type="checkbox"
                                                    name="Natural"
                                                    value={typ.value}
                                                    checked={this.inType(typ.value)}
                                                    onChange={(e) => { this.changeTypFilter(e.target.value) }}
                                                />
                                                <label htmlFor="Natural" className="px-2">{typ.name}</label><br />
                                            </>)
                                        })}

                                    </div>
                                    <hr className="hr text-light" />

                                    <div className="Design p-2 ">

                                        <p className="h6 font-weight-light">Design</p>
                                        {this.state.Design.map(des => {
                                            return (<>
                                                <input type="checkbox" name="Vertical"
                                                    value={des.value}
                                                    checked={this.inDesign(des.value)}
                                                    onChange={(e) => { this.changeDesign(e.target.value) }}
                                                />
                                                <label htmlFor="Vertical" className="px-2"> {des.name} </label><br />
                                            </>)
                                        })}

                                        {/* <label htmlFor="Vertical" className="px-2">  Vertical </label><br />
                                        <input type="checkbox" name=" Horizontal" value="  Horizontal" />
                                        <label htmlFor=" Horizontal" className="px-2">  Horizontal </label><br /> */}
                                    </div>

                                    <hr className="hr text-light" />

                                    <div className="Sub-type p-2 ">
                                        <p className="h6 font-weight-light">Sub-Type</p>

                                        {this.state.subType.map(sub => {
                                            return (<>
                                                <input type="checkbox"
                                                    name="Magical"
                                                    value={sub.value}
                                                    checked={this.inSubType(sub.value)}
                                                    onChange={(e) => { this.changeSubTypFilter(e.target.value) }}
                                                />
                                                <label htmlFor="Magical" className="px-2">{sub.name}</label><br />
                                            </>)
                                        })}


                                        {/* <input type="checkbox" name=" Alive" value="  Alive" />
                                        <label htmlFor=" Alive" className="px-2">  Alive </label><br />
                                        <input type="checkbox" name="Origin " value=" Origin " />
                                        <label htmlFor="Origin " className="px-2">  Origin </label><br />
                                        <input type="checkbox" name=" Elegant" value=" Elegant" />
                                        <label htmlFor=" Elegant" className="px-2">  Elegant</label><br /> */}

                                    </div>
                                    <hr className="hr text-light" />

                                    <div className="Colour p-2 ">

                                        <p className="h6 font-weight-light">Colour</p>
                                        {this.state.Colour.map(col => {
                                            return (<>
                                                <input type="checkbox" name="colour"
                                                    value={col.value}
                                                    checked={this.inColour(col.value)}
                                                    onChange={(e) => { this.changeColour(e.target.value) }}
                                                />
                                                <label htmlFor="colour" className="px-2"> {col.name} </label><br />
                                            </>)
                                        })}

                                        {/* <label htmlFor="Vertical" className="px-2">  Vertical </label><br />
                                        <input type="checkbox" name=" Horizontal" value="  Horizontal" />
                                        <label htmlFor=" Horizontal" className="px-2">  Horizontal </label><br /> */}
                                    </div>

                                    <hr className="hr text-light" />


                                    <div className="AvailableQuantity">
                                        <p className="h6 font-weight-light">Available Quantity</p>
                                        <form onSubmit={(ele)=>this.submitQuantityForm(ele)}>
                                        <div className="input-group mb-3">
                                            <input type="number" onChange={(ele)=>{this.setState({required_quantity:ele.target.value})}} className="form-control" value={this.state.required_quantity} name="AvailableQuantity" placeholder="Quantity" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                            <div className="input-group-append">
                                                <button className="btn btn-warning mx-1" id="basic-addon2"><a className="text-dark">Apply</a></button>
                                            </div>
                                        </div>
                                        </form>
                                        {/* <input type="text"  placeholder="  Avl-Quantity" className="font-weight-light mt-2" />
                                        <button class="btn btn-warning mx-1"><a className="text-dark">Apply</a></button> */}
                                    </div>

                                    {/* <div className="Design p-2 ">

                                        <p className="h5 font-weight-light">Design</p>
                                        {this.state.Design.map(des => {
                                            return (<>
                                                <input type="checkbox" name="Vertical"
                                                    value={des.value}
                                                    checked={this.inDesign(des.value)}
                                                    onChange={(e) => { this.changeDesign(e.target.value) }}
                                                />
                                                <label htmlFor="Vertical" className="px-2"> {des.name} </label><br />
                                            </>)
                                        })}

                                        {/* <label htmlFor="Vertical" className="px-2">  Vertical </label><br />
                                        <input type="checkbox" name=" Horizontal" value="  Horizontal" />
                                        <label htmlFor=" Horizontal" className="px-2">  Horizontal </label><br /> 
                                    </div> */}

                                    {/* <hr className="hr text-light" /> */}

                                    {/* <div className="Price p-2 ">
                                        <p className="h5 font-weight-light">Price</p>

                                        <InputRange
                                            className=""
                                            maxValue={10000}
                                            minValue={1}
                                            value={this.state.priceRange}
                                            onChange={value => this.setPriceRange(value)} /> */}

                                    {/* <input type="checkbox" name="Vertical" value="4000-5000" />
                                        <label htmlFor="2000-3000" className="px-2">4000-5000</label><br />
                                        <input type="checkbox" name="Vertical" value="4000-5000" />
                                        <label htmlFor="2000-3000" className="px-2">  4000-5000 </label><br />
                                        <input type="checkbox" name=" Horizontal" value="  5000-6000" />
                                        <label htmlFor=" 2000-3000" className="px-2">  5000-6000  </label><br /> 
                                     </div>*/}

                                </div>
                            </div>

                            <div className="gallery col-md-9">
                                <div className="row">

                                    {sliderloader ? <div class="loader">Loading...</div> : items.map((ele, ind) => {
                                        return ele.water_natural_white != "" ? <div className="col-md-4 col-sm-12 col-12 ">
                                            <Link to={"/product/" + ele.item_id}>
                                                <img src={ele.water_natural_white} display className="img-fluid" alt="1" />
                                                <div className="overlay gallery-text d-flex justify-content-between py-2 px-3">
                                                    <h4 >{ele.item_name}</h4>
                                                    {selectedItemIds.includes(parseInt(ele.item_id)) ? 
                                                     <span><i class="fas fa-heart text-danger" ></i></span> :
                                                     <span 
                                                     data-toggle="tooltip" 
                                                     data-placement="top" 
                                                     title="Add to favourite"
                                                     onClick={(e)=>{this.addToFavourite(e,ele.item_id)}}><i class="fas fa-heart text-info" ></i></span>}
                                                    
                                                </div>
                                            </Link>


                                        </div> : null
                                    })}
                                    {/* <div className="col-md-4">
                                        <Link to="product">
                                            <img src={plywood} className="img-fluid" alt="1" />
                                            <div className="overlay gallery-text text-center py-2">
                                                <h4 >Eucalyptus Qtr Smoked</h4>
                                            </div>
                                        </Link>

                                    </div>
                                    <div className="col-md-4">
                                        <Link to="product" params={{ itemId: 1 }}>
                                            <img src={ecotec} className="img-fluid" alt="2" />
                                            <div className="overlay gallery-text text-center py-2">
                                                <h4>Sm. Vintage Oak</h4>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-md-4">
                                        <Link to="product">
                                            <img src={PlywoodBharosa} className="img-fluid" alt="3" />
                                            <div className=" overlay gallery-text text-center py-2">
                                                <h4>Royal Teak Crown</h4>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-md-4">
                                        <Link to="product">
                                            <img src={CategoryJansathi} className="img-fluid" alt="4" />
                                            <div className=" overlay gallery-text text-center py-2">
                                                <h4> Sm.Eucalyptus</h4>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-md-4">
                                        <Link to="product">
                                            <img src={CategoryOptimaG} className="img-fluid" alt="5" />
                                            <div className=" overlay gallery-text text-center py-2">
                                                <h4>Sm. Cherry</h4>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-md-4">
                                        <Link to="product">
                                            <img src={Plywoodshutterstock} className="img-fluid" alt="6" />
                                            <div className="gallery-text text-center py-2">
                                                <h4>Sm. Eucalyptus Crown V</h4>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-md-4">
                                        <Link to="product">
                                            <img src={Plywoodshutterstock} className="img-fluid" alt="7" />
                                            <div className=" overlay gallery-text text-center py-2">
                                                <h4>Sm.Eucalyptus Crown V</h4>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-md-4">
                                        <Link to="product">
                                            <img src={plywood} className="img-fluid" alt="8" />
                                            <div className=" overlay gallery-text text-center py-2">
                                                <h4>Vintage Oak V</h4>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-md-4">
                                        <Link to="product">
                                            <img src={CategoryOptimaG} className="img-fluid" alt="9" />
                                            <div className=" overlay gallery-text text-center py-2">
                                                <h4>Sm.Eucalyptus Crown</h4>
                                            </div>
                                        </Link>
                                    </div> */}
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
            </>
        )
    }
}
