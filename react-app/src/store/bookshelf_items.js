const GET_BOOKSHELF_ITEMS_BOOKS = "bookshelf_item/item/GET_BOOKSHELF_ITEMS_BOOKS";
const ADD_TO_SHELF = "bookshelf_item/ADD_TO_SHELF";
const ADD_TO_SHELF_ERROR = "bookshelf_item/ADD_TO_SHELF_ERROR";
const REMOVE_FROM_SHELF = "bookshelf_item/REMOVE_FROM_SHELF"

export const actionGetBookshelfItemBooks = (bookshelfItemBook) => {
  return {
    type: GET_BOOKSHELF_ITEMS_BOOKS,
    bookshelfItemBook,
  };
};

export const actionAddToShelf = (bookshelfItem) => {
  return {
    type: ADD_TO_SHELF,
    bookshelfItem,
  };
};

export const actionAddToShelfError = (error) => {
  return {
    type: ADD_TO_SHELF_ERROR,
    error,
  };
};

export const actionRemoveFromShelf = (bookshelfItem) => {
  return {
    type: REMOVE_FROM_SHELF,
    bookshelfItem
  }
}

const normalizedBookShelfItem = (bookshelfDatas) => {
  let normalizedData = {};
  bookshelfDatas.forEach((bookshelf) => {
    normalizedData[bookshelf.id] = bookshelf;
  });
  return normalizedData;
};

export const thunkGetBookshelfItemBooks = (shelfId) => async (dispatch) => {
  const res = await fetch(`/api/bookshelf_item/${shelfId}`);

  if (res.ok) {
    const bookshelfItemBooks = await res.json();
    const normalizedBooks = normalizedBookShelfItem(bookshelfItemBooks);
    dispatch(actionGetBookshelfItemBooks(normalizedBooks));
  }
};

export const thunkAddBookToShelf = (bookId, bookshelfId) => async (dispatch) => {

  const res = await fetch(`/api/bookshelf_item/${bookId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookshelf_id: bookshelfId }),
  });
  if (res.ok) {
    const book = await res.json();
    dispatch(actionAddToShelf(book));
    dispatch(thunkGetBookshelfItemBooks(bookshelfId))
    dispatch(actionAddToShelfError(null))
  }
};

export const thunkRemoveShelfItem = (bookshelfId, bookId) => async (dispatch) => {
  const res = await fetch(`/api/bookshelf_item/${bookshelfId}/${bookId}`, {
      method: 'DELETE'
  })
  if (res.ok){
    dispatch(actionRemoveFromShelf(bookshelfId, bookId))
    dispatch(thunkGetBookshelfItemBooks(bookshelfId))
  }
}

const initialState = { bookshelfItems: {}, error: null };
const bookshelfItemReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_BOOKSHELF_ITEMS_BOOKS: {
      newState = { ...state };
      newState.bookshelfItems = action.bookshelfItemBook;
      return newState;
    }
    case ADD_TO_SHELF: {
      newState = { ...state };
      newState.bookshelfItems = action.bookshelfItem;
      newState.error = null;
      return newState;
    }
    case ADD_TO_SHELF_ERROR: {
      newState = { ...state };
      newState.error = action.error;
      return newState;
    }
    case REMOVE_FROM_SHELF: {
      newState = {...state}
      delete newState.bookshelfItems[action.bookshelfItem]
      return newState;
    }
    default:
      return state;
  }
};

export default bookshelfItemReducer;
