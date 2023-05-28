import React, { useEffect } from "react";
import { actionGetUserBookShelf, thunkGetUserBookShelf } from "../../store/bookshelf";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetBookshelfItemBooks } from "../../store/bookshelf_items";
import { NavLink } from "react-router-dom";

const UsersCurrentlyReading = () => {
  const dispatch = useDispatch();

  const userBookShelf = Object.values(useSelector((state) => state.bookshelvesReducer.bookshelves));
  console.log("HEY BOOKSHELVES OF USER", userBookShelf)
  const usersBooks = useSelector((state) => state.bookshelfItemReducer.bookshelfItems);


  useEffect(() => {
    dispatch(thunkGetUserBookShelf())
      .then((actionGetUserBookShelf ) => {
        console.log('ACTION:', actionGetUserBookShelf)
        let id;
        Object.values(actionGetUserBookShelf).forEach((shelf) => {
            if (shelf.name === 'currently_reading'){
              id = shelf.id
            }
        })
        dispatch(thunkGetBookshelfItemBooks(id))
      })
  }, [dispatch]);

  return (
    <div className="currently-reading-container">
      {Object.values(usersBooks).length > 0 ? (
        Object.values(usersBooks).slice(0, 7).map((book) => (
          <NavLink key={book.id} to={`/books/${book.id}`}>
            <img
              src={book.preview_img}
              alt="book-cover"
              className="bookcover-img"
              />
          </NavLink>
        ))
      ) : (
        <p>To add cookbooks to this shelf, click on any book and click on the "Add to shelf" button</p>
      )}
    </div>
  );
};

export default UsersCurrentlyReading;

