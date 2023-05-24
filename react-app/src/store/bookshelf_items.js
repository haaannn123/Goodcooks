const GET_BOOKSHELF_ITEMS_BOOKS = "bookshelf_item/item/GET_BOOKSHELF_ITEMS_BOOKS";
const ADD_TO_SHELF = "bookshelf_item/ADD_TO_SHELF";

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

const normalizedBookShelfItem = (bookshelfDatas) => {
  let normalizedData = {};
  bookshelfDatas.forEach((bookshelf) => {
    normalizedData[bookshelf.id] = bookshelf;
  });
  return normalizedData;
};

export const thunkGetBookshelfItemBooks = (shelfId) => async (dispatch) => {
    console.log('BOOKSHELF ID FRONT:', shelfId)
  const res = await fetch(`/api/bookshelf_item/${shelfId}`);
  console.log("BOOK RES", res);
  if (res.ok) {
    const bookshelfItemBooks = await res.json();
    const normalizedBooks = normalizedBookShelfItem(bookshelfItemBooks);
    dispatch(actionGetBookshelfItemBooks(normalizedBooks));
  }
};

export const thunkAddToShelf = (bookId, bookshelfId) => async (dispatch) => {
  console.log('BOOK ID', bookId)
  console.log("BOOKSHELF ID", bookshelfId)
  const res = await fetch(`/api/bookshelf_item/${bookId}`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({bookshelf_id: bookshelfId}),
  });
  if (res.ok){
    const book = await res.json();
    dispatch(actionAddToShelf(book))
  }
};

const initialState = { bookshelfItems: {} };
const bookshelfItemReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_BOOKSHELF_ITEMS_BOOKS: {
      newState = { ...state };
      newState.bookshelfItems = action.bookshelfItemBook;
      return newState;
    }
    case ADD_TO_SHELF:{
        newState = {...state};
        newState.bookshelfItems = action.bookshelfItem;
        return newState;
    }
    default:
      return state;
  }
};

export default bookshelfItemReducer;
