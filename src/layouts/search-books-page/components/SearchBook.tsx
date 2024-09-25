import React from "react";
import {BookModel} from "../../../models/BookModel";

export const SearchBook: React.FC<{ book: BookModel }> = (props) => {
    return (
        <div className="cart mt-3 shadow p-3 mb-3 bg-body rounded">
            <div className="row g-0">
                <div className="d-none d-lg-block">
                    {props.book.img ?
                        <img src={props.book.img}
                             width="123"
                             height="196"
                             alt='Book'/>
                        :
                        <img src={require('../../../images/BooksImages/book-luv2code-1000.png')}
                             width="123"
                             height="196"
                             alt='Book'/>
                    }
                </div>
            </div>
        </div>
    );
}