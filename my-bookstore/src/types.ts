
export interface Book {
    id: number;      // A unique number for each book
    title: string;   // The name of the book
    author: string;  // Who wrote the book
    price: number;   // How much does the book cost?
  }

  export interface CartItem {
    book: Book;      // The book in the cart
    quantity: number; // How many copies?
  }