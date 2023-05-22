const GET_USER_BOOKSHELF = 'bookshelf/GET_USER_BOOKSHELF';

export const actionGetUserBookShelf = (bookshelves) => {
    return {
        type: GET_USER_BOOKSHELF,
        bookshelves
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
        default: return state
    }
}

export default bookshelvesReducer;
