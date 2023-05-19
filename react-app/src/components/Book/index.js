import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Book.css";
import { useModal } from "../../context/Modal";
import { thunkGetBookById } from "../../store/books";
import { dateParser } from "../../helper_functions/dateParser";
import OpenModalButton from "../OpenModalButton";
import BookDelete from "../BookDelete";
const Book = () => {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const {closeModal } = useModal();

  const book = useSelector((state) => state.booksReducer.book);
  dateParser(book.published);
  useEffect(() => {
    dispatch(thunkGetBookById(bookId));
  }, [dispatch, bookId]);

  return (
    <>
      <img src={book.preview_img} alt="cookbook" />
      <h1>{book.title}</h1>
      <h2>{book.author}</h2>
      <OpenModalButton
          buttonText="Delete Book"
          onItemClick={closeModal}
          modalComponent={<BookDelete bookId={bookId}/>}
      />
    </>
  );
};

export default Book;
