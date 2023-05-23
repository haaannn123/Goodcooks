
const GET_USER_BOOKSHELF = 'bookshelf/GET_USER_BOOKSHELF';
const ADD_BOOKSHELF = 'bookshelf/ADD_BOOKSHELF';
const DELETE_BOOKSHELF = 'bookshelf/DELETE_BOOKSHELF';
const UPDATE_BOOKSHELF = 'bookshelf/UPDATE_BOOKSHELF';

export const actionGetUserBookShelf = (bookshelves) => {
    return {
        type: GET_USER_BOOKSHELF,
        bookshelves
    }
}

export const actionAddBookshelf = (bookshelf) => {
    return {
        type: ADD_BOOKSHELF,
        bookshelf
    }
}

export const actionDeleteBookShelf = (bookshelf) => {
    return {
        type: DELETE_BOOKSHELF,
        bookshelf
    }
}

export const actionUpdateShelf = (bookshelf) => {
    return {
        type: UPDATE_BOOKSHELF,
        bookshelf
    }
}

const normalizeBookshelf = (dataArr) => {
    let normalizedData = {};

    dataArr.forEach(data => {
        normalizedData[data.id] = data;
    })
    return normalizedData;
}

export const thunkGetUserBookShelf = () => async (dispatch) => {
    const res = await fetch('/api/bookshelves/current')

    if (res.ok){
        const bookshelves = await res.json();
        const normalizedBookshelves = normalizeBookshelf(bookshelves);
        dispatch(actionGetUserBookShelf(normalizedBookshelves));
        return normalizedBookshelves;
    }
}

export const thunkAddToShelf = (bookshelf) => async (dispatch) => {
    const res = await fetch('/api/bookshelves/new', {
        headers: {'Content-type': 'application/json'},
        method: 'POST',
        body: JSON.stringify(bookshelf)
    })

    if (res.ok){
        const new_shelf = await res.json();
        dispatch(actionAddBookshelf(new_shelf));
    }
}

export const thunkDeleteShelf = (shelfId) => async (dispatch) => {
    const res = await fetch(`/api/bookshelves/${shelfId}`, {
        method: 'DELETE'
    })
    if (res.ok){
        dispatch(actionDeleteBookShelf(shelfId))
    }
}

export const thunkUpdateShelf = (shelf, shelfId) => async (dispatch) => {
    const res = await fetch(`/api/bookshelves/${shelfId}`, {
        method: 'PUT',
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify(shelf)
    })
    if (res.ok){
        const edited_shelf = await res.json();
        dispatch(actionUpdateShelf(edited_shelf))
    }
}

const initialState = {
    bookshelves: {}
}

const bookshelvesReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case GET_USER_BOOKSHELF: {
            newState = {...state}
            newState.bookshelves = action.bookshelves
            return newState;
        }
        case ADD_BOOKSHELF :{
            newState = {...state}
            newState.bookshelves = action.bookshelf
            return newState;
        }
        case DELETE_BOOKSHELF: {
            newState = {...state}
            delete newState.bookshelves[action.bookshelf]
            return newState;
        }
        case UPDATE_BOOKSHELF: {
            newState = {...state}
            newState.bookshelves = action.bookshelf;
            return newState;
        }
        default: return state
    }
}

export default bookshelvesReducer;
