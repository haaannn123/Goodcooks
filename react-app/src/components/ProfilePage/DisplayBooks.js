import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetBookshelfItemBooks } from "../../store/bookshelf_items";
import RemoveFromShelves from "../RemoveFromShelves";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const DisplayBooks = ({ shelfId }) => {
  console.log('DISPLAY BOOKS', shelfId)
  const dispatch = useDispatch();

  const book = useSelector((state) => state.bookshelfItemReducer.bookshelfItems);
  const bookArr = Object.values(book);

  useEffect(() => {
    dispatch(thunkGetBookshelfItemBooks(shelfId));
  }, [dispatch, shelfId]);



  return (
    <div className="bookshelf-items">
      {bookArr.length > 0 ? bookArr.map((book) => {
        return (
          <div className="bookshelf-item">
            <NavLink to={`/books/${book.id}`}>
              <img
                className="bookcover-img"
                src={book.preview_img}
                alt=""
              />
              </NavLink>
            <RemoveFromShelves shelfId={shelfId} bookId={book.id}/>
          </div>
        );
      }) :
      <div className="empty-books-display">
        <p>To add cookbooks to this shelf, click on any book and click on the "Add to shelf" button</p>
        <h2>No books</h2>
        <img
          className="empty-book"
          src="https://i.imgur.com/lTpmNhy.png"
          alt="empty book"/>
      </div>
      }
    </div>
  );
};

export default DisplayBooks;
