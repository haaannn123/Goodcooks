const GET_ALL_BOOKS = "books/GET_ALL_BOOKS"

export const actionGetAllBooks = (books) => {
    return {
    type: GET_ALL_BOOKS,
    books
    }
}

const normalizingBooksData = (books) => {
    let normalizedData = {};

    books.forEach(book => {
        normalizedData[book.id] = book;
    })
    return normalizedData;
}

export const thunkGetAllBooks = () => async (dispatch) => {
    const res = await fetch('/api/books');

    if (res.ok){
        const books = await res.json();
        const normalizedData = normalizingBooksData(books)
        dispatch(actionGetAllBooks(normalizedData))
        console.log('HEEYYYY LOOKY HERE!!!!', normalizedData)
        return normalizedData;
    }
}

const initialState = {
    books: {}
}

const booksReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case GET_ALL_BOOKS:{
            newState = {...state}
            newState.books = action.books
            return newState;
        }
        default: return state
    }
}

export default booksReducer;
