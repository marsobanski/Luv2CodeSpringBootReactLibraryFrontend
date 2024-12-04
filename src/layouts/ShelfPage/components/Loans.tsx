import {useOktaAuth} from '@okta/okta-react';
import {useEffect, useState} from 'react';
import {ShelfCurrentLoans} from '../../../models/ShelfCurrentLoans';
import {SpinnerLoading} from '../../Utils/SpinnerLoading';
import {Link} from 'react-router-dom';

export const Loans = () => {

    const { authState } = useOktaAuth();

    const [httpError, setHttpError] = useState(null);

    // Current loans
    const [shelfCurrentLoans, setShelfCurrentLoans] = useState<ShelfCurrentLoans[]>([]);
    const [isLoadingUserLoans, setIsLoadingUserLoans] = useState(true)

    useEffect(() => {
        const fetchUserCurrentLoans = async () => {
            if (authState && authState.isAuthenticated) {
                const url = "http://localhost:8080/api/books/secure/currentloans"
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const shelfCurrentLoansResponse = await fetch(url, requestOptions);
                if (!shelfCurrentLoansResponse) {
                    throw new Error('Something went wrong')
                }
                const shelfCurrentLoansResponseJson = await shelfCurrentLoansResponse.json();
                setShelfCurrentLoans(shelfCurrentLoansResponseJson)
            }
            setIsLoadingUserLoans(false);
        }

        fetchUserCurrentLoans().catch((error: any) => {
            setIsLoadingUserLoans(false)
            setHttpError(error.message);
        })
        //INFO: scroll to top of page
        window.scrollTo(0, 0)
    }, [authState]);

    if (isLoadingUserLoans) {
        return (<SpinnerLoading/>)
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>
                    {httpError}
                </p>
            </div>
        )
    }

    return (
        <div>
            {/*Desktop*/}
            <div className='d-none d-lg-block mt-2'>
                {shelfCurrentLoans.length > 0 ?
                    <>
                        <h5>Current Loans: </h5>
                        {shelfCurrentLoans.map(loan => (
                            <div key={loan.book.id}>
                                <div className="row mt-3 mb-3">
                                    <div className="col-4 col-md-4 container">
                                        {loan.book?.img ?
                                            <img src={loan.book.img} width="226" height="349" alt="book"/>
                                        :
                                            <img src={require('../../../images/BooksImages/book-luv2code-1000.png')}
                                                 width="226" height="349" alt="book"/>
                                        }
                                    </div>
                                    <div className="card col-3 col-md-3 container d-flex">
                                        <div className="card-body">
                                            <div className="mt-3">
                                                <h4>Loan options</h4>
                                                {loan.daysLeft > 0 &&
                                                    <p className="text-secondary">
                                                        Due in {loan.daysLeft} days.
                                                    </p>
                                                }
                                                {loan.daysLeft === 0 &&
                                                    <p className="text-success">
                                                        Due today.
                                                    </p>
                                                }
                                                {loan.daysLeft < 0 &&
                                                    <p className="text-danger">
                                                        Past due by {-1 * loan.daysLeft} days.
                                                    </p>
                                                }
                                                <div className="list-group mt-3">
                                                    <button className="list-group-item list-group-item-action"
                                                            aria-current="true" data-bs-toggle="modal"
                                                            data-bs-target={`#modal${loan.book.id}`}>
                                                        Manage Loan
                                                    </button>
                                                    <Link to="/search" className="list-group-item list-group-item-action">
                                                        Search more books?
                                                    </Link>
                                                </div>
                                            </div>
                                            <hr/>
                                            <p className="mt-3">
                                                Help others find their adventures by reviewwing your loan
                                            </p>
                                            <Link className='btn btn-primary' to={`/checkout/${loan.book.id}`}>
                                                Leave a review
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                            </div>
                        ))}
                    </>
                :
                    <>
                        <h3 className="mt-3">
                            Currently no loans
                        </h3>
                        <Link className="btn btn-primary" to={'/search'}>
                            Search for a new book
                        </Link>
                    </>
                }
            </div>

            {/*Mobile*/}
        </div>
    )
}