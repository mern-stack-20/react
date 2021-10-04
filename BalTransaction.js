import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

class BalTransaction extends Component {
    constructor(props) {
        super(props)

        this.state = {
            amount: 0,
            type: "credit",
            remark: "",
            _id: "",
            isloading: true,

        }
    }

    updateTxnFrms = (txnId) => {
        this.setState({ isloading: true })

        axios.get(`http://localhost:3100/transactions/${txnId}`).then(res => {
            this.setState({ ...res.data.data, isloading: false })

        }).catch(err => {

        })

    }








    render() {
        return (
            <>
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-md-12">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Amount</th>
                                        <th>Type</th>
                                        <th>Remark</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.props.transactions.map((txn, ind) => {
                                        return (<tr key={ind}>
                                            <td>{txn.amount}</td>
                                            <td>{txn.type}</td>
                                            <td>{txn.remark}</td>
                                            <td>
                                                <button className="btn btn-info"
                                                    data-toggle="modal"
                                                    onClick={() => this.updateTxnFrms(txn._id)}
                                                    data-target="#exampleModal"
                                                >Edit
                                                </button>
                                                <button className="btn btn-danger ml-2 "
                                                    onClick={() => { this.props.deleteTxn(txn._id) }}
                                                >Delete</button></td>
                                        </tr>)
                                    })}



                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>



                {/* <!-- Modal --> */}
                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-info" id="exampleModalLabel">Balancesheet-Update</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row mt-5">
                                    <div className="col-md-4">
                                        <input type="number"
                                            className="form-control"
                                            placeholder="amount"
                                            value={this.state.amount}
                                            disabled={this.state.isloading}
                                            onChange={e => this.setState({ amount: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <select
                                            type="number"
                                            className="form-control"
                                            placeholder="type"
                                            value={this.state.type}
                                            disabled={this.state.isloading}
                                            onChange={e => this.setState({ type: e.target.value })}
                                        >

                                            <option >Credit</option>
                                            <option >Debit </option>
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="remark"
                                            value={this.state.remark}
                                            disabled={this.state.isloading}
                                            onChange={e => this.setState({ remark: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button"
                                    class="btn btn-danger"
                                    data-dismiss="modal">
                                    Close</button>
                                <button type="button"
                                    class="btn btn-info"
                                    disabled={this.state.isloading}
                                    onClick={() => this.props.updateTxn({ ...this.state })}>
                                    Update</button>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </>
        );
    }
}

export default BalTransaction;