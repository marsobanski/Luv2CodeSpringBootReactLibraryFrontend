import {useEffect, useState} from 'react';
import {BookModel} from '../../models/BookModel';
import {SpinnerLoading} from '../Utils/SpinnerLoading';
import {StarsReview} from '../Utils/StarsReview';
import {CheckoutAndReviewBox} from './CheckoutAndReviewBox';
import {ReviewModel} from '../../models/ReviewModel';
import {LatestReviews} from './LatestReviews';
import {useOktaAuth} from '@okta/okta-react';

export const BookCheckoutPage = () => {

    const { authState } = useOktaAuth();
    //book state
    const [book, setBook] = useState<BookModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    //review state
    const [reviews, setReviews] = useState<ReviewModel[]>();
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);

    //loans couhjt state
    const [currentLoansCount, setCurrentLoansCount] = useState(0);
    const [isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] = useState(true);

    //INFO: window.location.pathname zwraca url, poniżej pobieramy
    //      trzecią pozycję z urla rozdzielonego po '/'
    const bookId = (window.location.pathname).split('/')[2];
    const baseUrl = 'http://localhost:8080/api';

    useEffect(() => {
        const fetchBook = async () => {
            const url: string = `${baseUrl}/books/${bookId}`;
            const respone = await fetch(url);
            if (!respone.ok) {
                throw new Error('Failed to fetch book!');
            }
            const responseJson = await respone.json();//INFO: pobieramy jsona z responsa
            const loadedBook: BookModel = {
                id: responseJson.id,
                title: responseJson.title,
                author: responseJson.author,
                description: responseJson.description,
                copies: responseJson.copies,
                copiesAvailable: responseJson.copiesAvailable,
                category: responseJson.category,
                img: responseJson.img,
            };
            setBook(loadedBook);
            setIsLoading(false);
        };
        fetchBook().catch((error : any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [bookId]);

    useEffect(() => {
        const fetchBookReviews = async () => {
            const reviewUrl: string = `${baseUrl}/reviews/search/findByBookId?bookId=${bookId}`;
            const respone = await fetch(reviewUrl);
            if (!respone.ok) {
                throw new Error('Somethign went wrong');
            }
            const jsonReviews = await respone.json();
            const responseData = jsonReviews._embedded.reviews;
            const loadedReviews: ReviewModel[] = [];
            let weightedStarsReview: number = 0;
            for (const key in responseData) {
                loadedReviews.push({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    bookId: responseData[key].bookId,
                    reviewDescription: responseData[key].reviewDescription
                });
                weightedStarsReview = weightedStarsReview = responseData[key].rating;
            }
            if (loadedReviews) {
                //INFO: zaokrąglanie do 0,5 (ale nie czaję jak)
                const round = (Math.round((weightedStarsReview / loadedReviews.length) * 2) / 2).toFixed(1);
                setTotalStars(Number(round));
            }
            setReviews(loadedReviews);
            setIsLoadingReview(false);
        };

        fetchBookReviews().catch((error: any) => {
            setIsLoadingReview(false);
            setHttpError(error.message)
        })
    }, [bookId]);

    useEffect(() => {
        const fetchUserCurrentLoansCount = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `${baseUrl}/books/secure/currentloans/count`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer  ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const currentLoansCountResponse = await fetch(url, requestOptions);
                if (!currentLoansCountResponse.ok) {
                    throw new Error('Something went wrong!');
                }
                const currentLoansCountResponseJson  =  await currentLoansCountResponse.json();
                setCurrentLoansCount(currentLoansCountResponseJson)
            }
        }
        fetchUserCurrentLoansCount().catch((error: any) => {
            setIsLoadingCurrentLoansCount(false);
            setHttpError(error.message);
        })
    }, [authState]);

    if (isLoading || isLoadingReview || isLoadingCurrentLoansCount) {
        return (
            <SpinnerLoading/>
        )
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <div>
            <div className='container d-none d-lg-block'>
                <div className='row mt-5'>
                    <div className='col-sm-2 col-md-2'>
                        {book?.img ?
                            <img src={book?.img} width='226' height='349' alt="Book"/>
                            :
                            <img src={require('../../images/BooksImages/book-luv2code-1000.png')}
                            width="349" height="349" alt="Book"/>
                        }
                    </div>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                            <h2>{book?.title}</h2>
                            <h5 className="text-primary">{book?.author}</h5>
                            <p className="lead">{book?.description}</p>
                            <StarsReview rating={totalStars} size={32}></StarsReview>
                        </div>
                    </div>
                    <CheckoutAndReviewBox book={book} mobile={false} currentLoansCount={currentLoansCount}/>
                </div>
                <hr/>
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={false}/>
            </div>
            <div className="container d-lg-none mt-5">
                <div className="d-flex justify-content-center align-items-center">
                    {book?.img ?
                        <img src={book?.img} width='226' height='349' alt="Book"/>
                        :
                        <img src={require('../../images/BooksImages/book-luv2code-1000.png')}
                             width="349" height="349" alt="Book"/>
                    }
                </div>
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{book?.title}</h2>
                        <h5 className="text-primary">{book?.author}</h5>
                        <p className="lead">{book?.description}</p>
                        <StarsReview rating={totalStars} size={32}></StarsReview>
                    </div>
                </div>
                <CheckoutAndReviewBox book={book} mobile={true} currentLoansCount={currentLoansCount}/>
                <hr/>
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={true}/>
            </div>
        </div>
    )
}