import { useDispatch, useSelector } from "react-redux";
import "./UserBooks.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { thunkGetAllBooks } from "../../store/books";
import OpenModalButton from "../OpenModalButton";
import BookDelete from "../BookDelete";
import BookFormUpdate from "../BookFormUpdate";
import { useModal } from "../../context/Modal";

const UserBooks = () => {
  const dispatch = useDispatch();
  const {closeModal} = useModal
  const books = useSelector((state) => state.booksReducer.books);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(thunkGetAllBooks());
  }, [dispatch]);

  return (
    <div className="user-cook-book-page">
      <h1>Edit your books</h1>
      <div className="my-books-container">
        {Object.values(books).map((book) => {
          if (book.owner_id === user.id) {
            return (
              <div className="book-and-buttons">
                <img
                  className="bookcover-img"
                  src={book.preview_img}
                  alt="book-cover"
                />
                <OpenModalButton
                  buttonText="Delete"
                  onButtonClick={closeModal}
                  className="user-buttons"
                  modalComponent={<BookDelete bookId={book.id} />}
                />
                <OpenModalButton
                  buttonText="Update"
                  onButtonClick={closeModal}
                  className="user-buttons"
                  modalComponent={<BookFormUpdate bookId={book.id}/>}
                />
              </div>
            );
          }
          return <img src="https://i.imgur.com/lTpmNhy.png" alt="no books" />;
        })}
      </div>
    </div>
  );
};

export default UserBooks;
