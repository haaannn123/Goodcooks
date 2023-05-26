import { useDispatch, useSelector } from "react-redux";
import "./UserBooks.css";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { thunkGetAllBooks } from "../../store/books";
import OpenModalButton from "../OpenModalButton";
import BookDelete from "../BookDelete";
import BookFormUpdate from "../BookFormUpdate";
import { useModal } from "../../context/Modal";

const UserBooks = () => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const books = useSelector((state) => state.booksReducer.books);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(thunkGetAllBooks());
  }, [dispatch]);

  const userBooks = Object.values(books).filter((book) => book.owner_id === user.id);

  return (
    <div className="user-cook-book-page">
      <h1>Edit your books</h1>
      <div className="my-books-container">
        {userBooks.length > 0 ? (
          userBooks.map((book) => (
            <div key={book.id} className="book-and-buttons">
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
                modalComponent={<BookFormUpdate bookId={book.id} />}
              />
            </div>
          ))
        ) : (
          <div className="no-books-container">
            <img src="https://i.imgur.com/lTpmNhy.png" alt="no books" />
            <h1>No books</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBooks;

