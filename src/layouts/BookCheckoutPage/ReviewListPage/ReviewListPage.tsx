import {useEffect, useState} from 'react';
import {ReviewModel} from '../../../models/ReviewModel';
import {SpinnerLoading} from '../../Utils/SpinnerLoading';
import {Review} from '../../Utils/Review';
import {Pagination} from '../../Utils/Pagination';

export const ReviewListPage = ()  => {

    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState(null);

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage, setReviewsPerPage] = useState(5);
    const [totalAmountOfReviews, setTotalAmountOfReviews] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const bookId = (window.location.pathname).split('/')[2];
    const baseUrl = 'http://localhost:8080/api';

    useEffect(() => {
        const fetchBookReviews = async () => {
            const reviewUrl: string = `${baseUrl}/reviews/search/findByBookIdOrderByDateDesc?bookId=${bookId}&page=${currentPage - 1}&size=${reviewsPerPage}`;
            const respone = await fetch(reviewUrl);
            if (!respone.ok) {
                throw new Error('Somethign went wrong');
            }
            const jsonReviews = await respone.json();
            const responseData = jsonReviews._embedded.reviews;

            setTotalAmountOfReviews(jsonReviews.page.totalElements);
            setTotalPages(jsonReviews.page.totalPages);

            const loadedReviews: ReviewModel[] = [];
            for (const key in responseData) {
                loadedReviews.push({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    bookId: responseData[key].bookId,
                    description: responseData[key].description
                });
            }
            setReviews(loadedReviews);
            setIsLoading(false);
        };

        fetchBookReviews().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message)
        })
    }, [bookId, currentPage, reviewsPerPage]);

    if (isLoading) {
        return (<SpinnerLoading/>)
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    const indexOfLastReview: number = currentPage * reviewsPerPage;
    const indexOfFirstReview: number = indexOfLastReview - reviewsPerPage;

    let lastItem = reviewsPerPage * currentPage <= totalAmountOfReviews ?
        reviewsPerPage * currentPage :
        totalAmountOfReviews;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return(
        <div className="container m-5">
            <div>
                <h3>Comments: ({reviews.length})</h3>
            </div>
            <p>
                {indexOfFirstReview + 1} to {lastItem} from {totalAmountOfReviews} reviews
            </p>
            <div className="row">
                {reviews.map(review => (
                    <Review review={review} key={review.id}/>
                ))}
            </div>

            {totalPages > 1 && <Pagination currentPage={currentPage}
                                           totalPages={totalPages}
                                           paginate={paginate}/>}
        </div>
    );
}