import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

class Balform extends Component {
    constructor(props) {
        super(props)

        this.state = {
            amount: 0,
            type: "credit",
            remark: "",
        }
    }

    saveTxnFrm = () => {
        let { amount, type, remark } = this.state
        let transaction = { amount, type, remark }
        let txn = {
            amount, type, remark
        }
        axios.post(`http://localhost:3100/balance`, { ...transaction }, {

        })
            .then((response) => {
                // handle success
                console.log(response);
                toast(response.data.msg)

            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
        this.props.saveTxnBal(txn)
        this.setState({ amount: 0, remark: "" })

    }




    render() {
        return (
            <div>
                <div className="container">
                    <h2 className="text-info text-center mt-5">BalanceSheet</h2>
                    <div className="row mt-5">
                        <div className="col-md-3">
                            <input type="number"
                                className="form-control"
                                placeholder="amount"
                                value={this.state.amount}
                                onChange={e => this.setState({ amount: e.target.value })}
                            />
                        </div>
                        <div className="col-md-3">
                            <select
                                type="number"
                                className="form-control"
                                placeholder="type"
                                value={this.state.type}
                                onChange={e => this.setState({ type: e.target.value })}
                            >

                                <option >Credit</option>
                                <option >Debit </option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="remark"
                                value={this.state.remark}
                                onChange={e => this.setState({ remark: e.target.value })}
                            />
                        </div>
                        <div className="col-md-3">
                            <button className="btn btn-success btn-block " onClick={this.saveTxnFrm} value="">save</button>
                        </div>
                    </div>
                </div>

                <ToastContainer
                    position="bottom-center"
                />

            </div>
        );
    }
}

export default Balform;