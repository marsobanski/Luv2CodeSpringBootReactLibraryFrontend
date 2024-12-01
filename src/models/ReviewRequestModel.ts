export class ReviewRequestModel {
    rating: number;
    bookId: number;
    description: string

    constructor(rating: number, bookId: number, description: string) {
        this.rating = rating;
        this.bookId = bookId;
        this.description = description;
    }
}