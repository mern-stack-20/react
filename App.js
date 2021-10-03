import React, { Component } from 'react'
import Home from './screens/Home'
import Product from './screens/Product'
import Singleproduct from './screens/Singleproduct'
import Contact from './screens/Contact'
import Aboutus from './screens/Aboutus'
import Blog from './screens/Blog'
//import Veneer from './screens/Veneer'
import Singleblog from './screens/Singleblog'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PlyGallery from './screens/PlyGallery'
//import Veneer from './screens/VeneerSelection'
import SelectedContext from './HOC/SelectedContext'
import VeneerSelection from './screens/VeneerSelection'






//export const SelectedContext = React.createContext();

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "Ayushi",
      selectedPlace: {
        Kitchen: {
          name:"Kitchen",
          quantity: 0,
          type: [],
          color: [],
          selectedIds: [],
          isSelected: false,
          isFiltered: false
        },
        BedRoom: {
          name:"Bedroom",
          quantity: 0,
          type: [],
          color: [],
          selectedIds: [],
          isSelected: false,
          isFiltered: false
        },
        LivingRoom: {
          name:"Living Room",
          quantity: 0,
          type: [],
          color: [],
          selectedIds: [],
          isSelected: false,
          isFiltered: false
        },
        Hall: {
          name:"hall",
          quantity: 0,
          type: [],
          color: [],
          selectedIds: [],
          isSelected: false,
          isFiltered: false
        },
        Other: {
          name:"other",
          quantity: 0,
          type: [],
          color: [],
          selectedIds: [],
          isSelected: false,
          isFiltered: false
        }
      }
    }
  }


  changeSelection = (name, key, value) => {
    //console.log(name, key, value)
    let { selectedPlace } = this.state
    if(key == 'type' || key == 'color'){
      if(!selectedPlace[name][key].includes(value)){
        selectedPlace[name][key].push(value)
      }else{
        selectedPlace[name][key].splice(selectedPlace[name][key].indexOf(value),1)
      }
    }else{
      if(name&&key){
        selectedPlace[name][key] = value
      }
    }
    this.setState(
      (prev)=>{ return {selectedPlace} }, ()=>{
        localStorage.setItem("appstate", JSON.stringify(this.state))
    })


  }

  resetSelection = () => {
    this.setState({selectedPlace: {
      Kitchen: {
        name:"Kitchen",
        quantity: 0,
        type: [],
        color: [],
        selectedIds: [],
        isSelected: false,
        isFiltered: false
      },
      BedRoom: {
        name:"Bedroom",
        quantity: 0,
        type: [],
        color: [],
        selectedIds: [],
        isSelected: false,
        isFiltered: false
      },
      LivingRoom: {
        name:"Living Room",
        quantity: 0,
        type: [],
        color: [],
        selectedIds: [],
        isSelected: false,
        isFiltered: false
      },
      Hall: {
        name:"hall",
        quantity: 0,
        type: [],
        color: [],
        selectedIds: [],
        isSelected: false,
        isFiltered: false
      },
      Other: {
        name:"other",
        quantity: 0,
        type: [],
        color: [],
        selectedIds: [],
        isSelected: false,
        isFiltered: false
      }
    }})
  }

  componentDidUpdate() {
    //console.log(this.state)
  }




  render() {
    return (
      <div>
        <Router>
          <SelectedContext.Provider value={{ ...this.state, changeSelection: this.changeSelection, resetSelection:this.resetSelection }}>
          <Route path="/" component={Home} exact />
          <Route path="/products" component={Product} />
          <Route path="/searchedProducts" component={Product} />
          <Route path="/product/:productid" component={Singleproduct} />
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={Aboutus} />
          <Route path="/gallery" component={PlyGallery} />
          {/* <SelectedContext.Provider value={{ ...this.state, changeSelection: this.changeSelection }}> */}
            <Route path="/veneerselection" component={VeneerSelection} />
          {/* </SelectedContext.Provider> */}
          <Route path="/blogs" component={Blog} />
          <Route path="/blog/:blogid" component={Singleblog} />
          </SelectedContext.Provider>
        </Router>

      </div>
    )
  }
}
