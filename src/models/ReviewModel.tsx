export class ReviewModel {
    id: number;
    userEmail:string;
    date: string;
    rating: number;
    bookId: number;
    description: string;

    constructor(id: number, userEmail: string, date: string, rating: number, bookId: number, description: string) {
        this.id = id;
        this.userEmail = userEmail;
        this.date = date;
        this.rating = rating;
        this.bookId = bookId;
        this.description = description;
    }
}