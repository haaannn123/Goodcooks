const GET_ALL_BOOKS = "books/GET_ALL_BOOKS";
const GET_BOOK_BY_ID = "books/GET_BOOK_BY_ID";
const POST_BOOK = "books/POST_BOOK";
const UPDATE_BOOK = "books/UPDATE_BOOK";
const DELETE_BOOK = 'books/DELETE_BOOK';

export const actionGetAllBooks = (books) => {
  return {
    type: GET_ALL_BOOKS,
    books,
  };
};

export const actionGetBookById = (bookId) => {
  return {
    type: GET_BOOK_BY_ID,
    bookId,
  };
};

export const actionPostBook = (book) => {
  return {
    type: POST_BOOK,
    book,
  };
};

export const actionUpdateBook = (book) => {
    return {
        type: UPDATE_BOOK,
        book
    }
}

export const actionDeleteBook = (book) => {
    return {
        type: DELETE_BOOK,
        book
    }
}

const normalizingBooksData = (books) => {
  let normalizedData = {};

  books.forEach((book) => {
    normalizedData[book.id] = book;
  });
  return normalizedData;
};

export const thunkGetAllBooks = () => async (dispatch) => {
  const res = await fetch("/api/books");

  if (res.ok) {
    const books = await res.json();
    const normalizedData = normalizingBooksData(books);
    dispatch(actionGetAllBooks(normalizedData));
    return normalizedData;
  }
};

export const thunkGetBookById = (bookId) => async (dispatch) => {
  const res = await fetch(`/api/books/${bookId}`);

  if (res.ok) {
    const book = await res.json();
    dispatch(actionGetBookById(book));
    return book;
  }
};

export const thunkCreateBook = (book) => async (dispatch) => {
  const res = await fetch("/api/books/new", {
    headers: { "Content-type": "application/json" },
    method: "POST",
    body: JSON.stringify(book),
  });

  if (res.ok) {
    const new_book = await res.json();
    dispatch(actionPostBook(new_book));
  }
};

export const thunkEditBook = (book, bookId) => async (dispatch) => {
    const res = await fetch(`/api/books/${bookId}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(book)
    })
    
    if (res.ok){
        const edited_book = await res.json();
        dispatch(actionUpdateBook(edited_book))
        return edited_book
    }
}

export const thunkDeleteBook = (bookId) => async (dispatch) => {
    const res = await fetch(`/api/books/${bookId}`, {
        method: 'DELETE'
    })
    if (res.ok){
        dispatch(actionDeleteBook(bookId))
    }
}



const dateParser = (date) => {
  let newDate = new Date(date);
  return newDate.toISOString().split("T")[0];
};

const initialState = {
  books: {},
  book: {},
};


const booksReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_BOOKS: {
      newState = { ...state };
      newState.books = action.books;
      return newState;
    }
    case GET_BOOK_BY_ID: {
      newState = { ...state };
      newState.book = action.bookId;
      newState.book.published = dateParser(newState.book.published);
      return newState;
    }
    case POST_BOOK: {
      newState = { ...state };
      newState.books = action.book;
      return newState;
    }
    case UPDATE_BOOK: {
        newState = {...state};
        newState.book = action.book;
        return newState;
    }
    case DELETE_BOOK: {
        newState = {...state};
        delete newState.books[action.book]
        return newState;
    }
    default:
      return state;
  }
};

export default booksReducer;
