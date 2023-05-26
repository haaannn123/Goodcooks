import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Book.css";
import { useModal } from "../../context/Modal";
import { thunkGetBookById } from "../../store/books";
import { dateParser } from "../../helper_functions/dateParser";
import OpenModalButton from "../OpenModalButton";
import BookDelete from "../BookDelete";
import AddToShelfModal from "../AddToShelfModal";
import { thunkGetUserBookShelf } from "../../store/bookshelf";
import RemoveFromShelf from "../RemoveFromShelves";

const Book = () => {
  const { bookId }  = useParams();
  console.log('BOOK ID HERE', bookId)
  const dispatch = useDispatch();
  const {closeModal } = useModal();

  const book = useSelector((state) => state.booksReducer.book);
  dateParser(book.published);
  const formattedPublishedDate = new Date(book.published).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    dispatch(thunkGetBookById(bookId));
    dispatch(thunkGetUserBookShelf())
  }, [dispatch, bookId]);

  return (
    <div className="book-details-page">
      <div className="book-img-add-to-shelf">
      <img
        className="cook-book-img"
        src={book.preview_img}
        alt="cookbook"
      />
      <OpenModalButton
          buttonText="Add to shelf"
          className="add-to-shelf-button"
          onItemClick={closeModal}
          modalComponent={<AddToShelfModal bookId={bookId}/>}
      />
      <button className="book-price-button">Kindle ${book.price}</button>
      </div>
      <div className="cook-book-info">
        <h1>{book.title}</h1>
        <h2>By {book.author}</h2>
        <h4>{formattedPublishedDate}</h4>
        <p className="book-description">{book.description}</p>
      </div>
    </div>
  );
};

export default Book;
