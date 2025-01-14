import React from 'react';
import {BookModel} from '../../models/BookModel';
import {Link} from 'react-router-dom';
import {LeaveReview} from '../Utils/LeaveReview';

export const CheckoutAndReviewBox: React.FC<{
    book: BookModel | undefined, mobile: boolean, currentLoansCount: number,
    isAuthenticated: any, isCheckedOut: boolean, checkoutBook: any, isReviewed: boolean,
    submitReview: any
}> = (props) => {

    function buttonRender() {
        if (props.isAuthenticated) {
            if (!props.isCheckedOut && props.currentLoansCount < 5) {
                return (
                    <button onClick={() => props.checkoutBook()} className="btn btn-success btn-lg">Checkout</button>)
            } else if (props.isCheckedOut) {
                return (<p><b>Book checked out. Enjoy</b></p>)
            } else if (!props.isCheckedOut) {
                return (<p className="text-danger"><b>Too many books checked out.</b></p>)
            }
        }
        return (<Link to={'/login'} className="btn btn-success btn-lg">Sing in</Link>)
    }

    function reviewRender() {
        if (props.isAuthenticated && !props.isReviewed) {
            return (
                <p>
                    <LeaveReview submitReview={props.submitReview}/>
                </p>
            )
        } else if (props.isAuthenticated && props.isReviewed) {
            return (<p><b>Thank you for your review</b></p>)
        }
        return (<div>
            <h1><p>Sign in to leave review</p></h1>
        </div>)
    }

    return (
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className="card-body container">
                <div className="mt-3">
                    <p>
                        <b>{props.currentLoansCount}/5 </b>
                        books checked out
                    </p>
                    <hr/>
                    {props.book && props.book.copiesAvailable && props.book.copiesAvailable > 0 ?
                        <h4 className="text-success">Available</h4>
                        :
                        <h4 className="text-danger">Waiting List</h4>
                    }
                    <div className="row">
                        <p className="col-12 lead">
                            <b>{props.book?.copiesAvailable} / {props.book?.copies}</b>
                        </p>
                    </div>
                </div>
                {buttonRender()}
                <hr/>
                <p className="mp-3">
                    This number can change until placing order has been complete.
                </p>
                {reviewRender()}
            </div>
        </div>
    )
}