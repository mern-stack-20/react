import React, { Component } from 'react'
import '../style.css'
import axios from 'axios'

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            dob: "",
            gender: "",
            email: "",
            mobile: "",
            whatsApp: "",
            qualification: "",
            experience: "",
            about: "",
            complain: "",
        };
    }

    handleInput = (key, value) => {
        this.setState({ [key]: value })

    }


    submit = (e) => {
        e.preventDefault()
        //console.log("here")


        axios.post("http://localhost:4000/geeksForm/register", { ...this.state }, {

        })
            .then((response) => {
                // handle success
                console.log(response);

            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
        this.setState({
            name: "",
            dob: "",
            gender: "",
            email: "",
            mobile: "",
            whatsApp: "",
            qualification: "",
            experience: "",
            about: "",
            complain: "",
        })

    }

    render() {
        let {
            name,
            dob,
            gender,
            email,
            mobile,
            whatsApp,
            qualification,
            about,
            experience,
            complain
        } = this.state
        return (
            <>
                <div className="container-fluid register">
                    <div className="row">
                        <div className="col-md-12  col-sm-12 mt-3 text-center text-white ">
                            <div>
                                <h3 className="">Welcome</h3>
                                <h5>Geeksdoor Registration Form</h5>
                            </div>
                        </div>

                        <div className=" offset-2 col-md-8 col-sm-12 p-5 my-3 bg-light main">

                            <form className="row" onSubmit={(e) => this.submit(e)}>


                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Your Name *</label>
                                        <input type="text"
                                            className="form-control formbg"
                                            value={name}
                                            onChange={(e) => this.handleInput('name', e.target.value)}
                                            placeholder="Your Name" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Email *</label>
                                        <input type="email"
                                            value={email}
                                            onChange={(e) => this.handleInput('email', e.target.value)}
                                            className="form-control formbg"
                                            placeholder="Enter email" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div class="form-group">
                                        <label>Moblie Number *</label>
                                        <input type="number"
                                            minlength="10"
                                            maxlength="10"
                                            name="txtEmpPhone"
                                            value={mobile}
                                            onChange={(e) => this.handleInput('mobile', e.target.value)}
                                            class="form-control formbg"
                                            placeholder="Your Mobile Number" />
                                    </div>
                                </div>          <div className="col-md-6">
                                    <div class="form-group">
                                        <label>Whatsapp Number *</label>
                                        <input type="number"
                                            minlength="10"
                                            maxlength="10"
                                            name="txtEmpPhone"
                                            value={whatsApp}
                                            onChange={(e) => this.handleInput('whatsApp', e.target.value)}
                                            class="form-control formbg"
                                            placeholder="Your Whatsapp Number" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Date of Birth *</label>
                                        <input type="birthDate"
                                            value={dob}
                                            onChange={(e) => this.handleInput('dob', e.target.value)}
                                            className="form-control formbg"
                                            placeholder="DOB" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div class="form-group">
                                        <label class="control-label">Gender *</label>
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <label class="radio-inline">
                                                    <input type="radio"
                                                        id="femaleRadio"
                                                        checked={gender === "" ? false : gender === "Female" ? true : false}
                                                        onChange={(e) => this.handleInput('gender', "Female")} />
                                                    <span className="ml-1">Female</span>
                                                </label>

                                            </div>
                                            <div class="col-sm-6">
                                                <label class="radio-inline">
                                                    <input type="radio"
                                                        id="maleRadio"
                                                        checked={gender === "" ? false : gender === "Male" ? true : false}
                                                        onChange={(e) => this.handleInput('gender', "Male")} />
                                                    <span className="ml-1">Male</span>
                                                </label>

                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Highest Qualification  *</label>
                                        <input type="text"
                                            className="form-control formbg"
                                            value={qualification}
                                            onChange={(e) => this.handleInput('qualification', e.target.value)}
                                            placeholder="Your answer" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Working Experience (In year) *</label>
                                        <input type="text"
                                            className="form-control formbg"
                                            value={experience}
                                            onChange={(e) => this.handleInput('experience', e.target.value)}
                                            placeholder="Your answer" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Where did you hear about us:? *</label>
                                        <div class="form-check">
                                            <input class="form-check-input"
                                                type="radio"
                                                name="gridRadios"
                                                id="gridRadios1"
                                                checked={about === "" ? false : about === "Friends" ? true : false}
                                                onChange={(e) => this.handleInput('about', "Friends")}

                                            />
                                            <label class="form-check-label" for="">
                                                Friends
                                            </label>
                                        </div>

                                        <div class="form-check">
                                            <input class="form-check-input"
                                                type="radio"
                                                name="gridRadios"
                                                id="gridRadios1"
                                                checked={about === "" ? false : about === "Relatives" ? true : false}
                                                onChange={(e) => this.handleInput('about', "Relatives")}

                                            />
                                            <label class="form-check-label" for="">
                                                Relatives
                                            </label>
                                        </div>

                                        <div class="form-check">
                                            <input class="form-check-input"
                                                type="radio"
                                                name="gridRadios"
                                                id="gridRadios1"
                                                checked={about === "" ? false : about === "Instagram" ? true : false}
                                                onChange={(e) => this.handleInput('about', "Instagram")}

                                            />
                                            <label class="form-check-label" for="">
                                                Instagram
                                            </label>
                                        </div>

                                        <div class="form-check">
                                            <input class="form-check-input"
                                                type="radio"
                                                name="gridRadios"
                                                id="gridRadios1"
                                                checked={about === "" ? false : about === "Facebook" ? true : false}
                                                onChange={(e) => this.handleInput('about', "Facebook")}

                                            />
                                            <label class="form-check-label" for="">
                                                Facebook
                                            </label>
                                        </div>

                                        <div class="form-check">
                                            <input class="form-check-input"
                                                type="radio"
                                                name="gridRadios"
                                                id="gridRadios1"
                                                checked={about === "" ? false : about === "Banner" ? true : false}
                                                onChange={(e) => this.handleInput('about', "Banner")}

                                            />
                                            <label class="form-check-label" for="">
                                                Banner
                                            </label>
                                        </div>

                                        <div class="form-check">
                                            <input class="form-check-input"
                                                type="radio"
                                                name="gridRadios"
                                                id="gridRadios1"
                                                checked={about === "" ? false : about === "Other" ? true : false}
                                                onChange={(e) => this.handleInput('about', "Other")}

                                            />
                                            <label class="form-check-label" for="">
                                                Other
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Any Complain</label>
                                        <textarea className="form-control formbg"
                                            value={complain}
                                            onChange={(e) => this.handleInput('complain', e.target.value)}
                                            placeholder="Your Answer" >

                                        </textarea>

                                    </div>
                                </div>

                                <div className="text-center col-md-12 col-sm-6">
                                    <button type="submit" className="btn btn-primary px-5">Register</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}
