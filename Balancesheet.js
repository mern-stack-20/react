import React, { Component } from 'react';
import Balform from './Balform';
import Balnsumry from './Balnsumry';
import BalTransaction from './BalTransaction';
import axios from 'axios';
import swal from 'sweetalert'


class Balancesheet extends Component {
    constructor(props) {
        super(props)

        this.state = {

            transactions: [],

        }
    }
    saveTxn = (newTxn) => {
        let transactions = [...this.state.transactions]

        if (newTxn.type == "debit") {
            let balance = this.getTxnSummary().balance
            if (newTxn.amount > balance) {
                alert("Invalid transaction")
                return
            }
        }


        transactions.push(newTxn)
        this.setState({ transactions })




    }

    getTxnSummary = () => {
        let txns = [...this.state.transactions]
        let debit = 0
        let credit = 0
        txns.forEach((txn) => {
            if (txn.type == "debit") {
                debit += parseInt(txn.amount)
            }

            if (txn.type == "credit") {
                credit += parseInt(txn.amount)
            }
        })

        return {
            debit,
            credit,
            balance: credit - debit
        }


    }





    componentDidMount() {
        this.fetchFreshData()
    }

    fetchFreshData = () => {
        axios.get("http://localhost:3100/transactions").then(res => {
            let txn = res.data.transactions
            this.setState({ transactions: txn })
        }).catch(err => {

        })
    }


    deleteTxn = (id) => {

        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this entry?",
            icon: "warning",
            dangerMode: true,
            buttons: {
                cancel: true,
                confirm: "Delete",
            }
        })
            .then(willDelete => {
                if (willDelete) {
                    axios.delete(`http://localhost:3100/balancedelete/${id}`).then(res => {
                        swal("Deleted!", "Your Entry has been deleted", "success");
                        this.fetchFreshData()
                    }).catch(err => {
                        swal("something went wrong", "error");
                    })
                }
            });


    }

    updateTxn = (txnDetails) => {
        let { amount, remark, type, _id } = txnDetails
        axios.put("http://localhost:3100/balanceupdate", {
            id: _id, data: {
                amount, remark, type
            }
        }).then(res => {
            this.fetchFreshData()
        }).catch(err => {

        })
    }

    render() {
        let smry = this.getTxnSummary()

        return (
            <div>
                <Balform saveTxnBal={this.saveTxn} />
                <BalTransaction transactions={this.state.transactions}
                    deleteTxn={(ind) => { this.deleteTxn(ind) }}
                    updateTxn={this.updateTxn}
                />
                <Balnsumry smry={smry} />
            </div>
        );
    }
}

export default Balancesheet;