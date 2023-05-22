const GET_BOOKSHELF_ITEMS_BOOKS = 'bookshelves/item/GET_BOOKSHELF_ITEMS_BOOKS'

export const actionGetBookshelfItemBooks = (bookshelfItemBook) => {
    return {
        type: GET_BOOKSHELF_ITEMS_BOOKS,
        bookshelfItemBook
    }
}

const normalizedBookShelfItem = (bookshelfDatas) => {
    let normalizedData = {}
    bookshelfDatas.forEach(bookshelf => {
        normalizedData[bookshelf.id] = bookshelf
    });
    return normalizedData
}

export const thunkGetBookshelfItemBooks = (shelfId) => async (dispatch) => {
    const res = await fetch(`/api/bookshelves/${shelfId}`)
    console.log('BOOK RES', res)
    if (res.ok){
        const bookshelfItemBooks = await res.json();
        const normalizedBooks = normalizedBookShelfItem(bookshelfItemBooks)
        dispatch(actionGetBookshelfItemBooks(normalizedBooks))
    }
}

const initialState = { bookshelfItems: {} }
const bookshelfItemReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case GET_BOOKSHELF_ITEMS_BOOKS:{
            newState = {...state}
            newState.bookshelfItems = action.bookshelfItemBook
            return newState
        }
        default: return state;
    }
}

export default bookshelfItemReducer;
