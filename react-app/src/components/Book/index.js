import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Book.css";
import { thunkGetBookById } from "../../store/books";
const Book = () => {
  const { bookId } = useParams();
  const dispatch = useDispatch();

  const book = useSelector((state) => state.booksReducer.book);

  useEffect(() => {
    dispatch(thunkGetBookById(bookId));
  }, [dispatch, bookId]);

  return (
    <>
      <img src={book.preview_img} alt="cookbook" />
      <h1>{book.title}</h1>
      <h2>{book.author}</h2>
    </>
  );
};

export default Book;
