export class BookModel {
    id: number;
    title: string;
    //INFO: jak pole ma '?', to jest optional, czyli nie musi być podane
    author?: string;
    description?: string;
    copies?: number;
    copiesAvailable?: number;
    category?: string;
    img?: string;


    constructor(id: number, title: string, author: string, description: string, copies: number, copiesAvailable: number, category: string, img: string) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.copies = copies;
        this.copiesAvailable = copiesAvailable;
        this.category = category;
        this.img = img;
    }
}