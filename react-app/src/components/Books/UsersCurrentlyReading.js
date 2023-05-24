import React, { useEffect } from "react";
import { thunkGetUserBookShelf } from "../../store/bookshelf";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetBookshelfItemBooks } from "../../store/bookshelf_items";
import { NavLink } from "react-router-dom";

const UsersCurrentlyReading = () => {
  const dispatch = useDispatch();

  const userBookShelf = Object.values(useSelector((state) => state.bookshelvesReducer.bookshelves));
  const usersBooks = useSelector((state) => state.bookshelfItemReducer.bookshelfItems);
  const userId = useSelector((state) => state.session.user.id);
  console.log("USER HERE LOOOK HERE", userId);
  console.log("USERS BOOKS HERE LOOK", usersBooks);
  console.log("USER BOOKSHELF HERE", userBookShelf);

  useEffect(() => {
    dispatch(thunkGetUserBookShelf());
    dispatch(thunkGetBookshelfItemBooks(1));
  }, [dispatch]);

  return (
    <div className="currently-reading-container">
      {userBookShelf.length > 1 ? (
        <>
          <NavLink className="navlink currently-reading" to="/user">
            CURRENTLY READING
          </NavLink>
          {Object.values(usersBooks).map((book) => (
            <NavLink to={`/books/${book.id}`}>
              <img className="bookcover-img" src={book.preview_img} alt="book-cover" />
            </NavLink>
          ))}
        </>
      ) : null}
    </div>
  );
};

export default UsersCurrentlyReading;
