import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkGetBookById } from "../../store/books";
import { dateParser } from "../../helper_functions/dateParser";
import OpenModalButton from "../OpenModalButton";
import AddToShelfModal from "../AddToShelfModal";
import { thunkGetUserBookShelf } from "../../store/bookshelf";
import Footer from "../Footer";
import "./Book.css";
import "./Reviews.css";

const Book = () => {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const book = useSelector((state) => state.booksReducer.book);
  dateParser(book.published);
  const formattedPublishedDate = new Date(book.published).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    dispatch(thunkGetBookById(bookId));
    dispatch(thunkGetUserBookShelf());
  }, [dispatch, bookId]);

  return (
    <>
      <div className="book-details-page">
        <div className="book-img-add-to-shelf">
          <img className="cook-book-img" src={book.preview_img} alt="cookbook" />
          <OpenModalButton
            buttonText="Add to shelf"
            className="add-to-shelf-button"
            onItemClick={closeModal}
            modalComponent={<AddToShelfModal bookId={bookId} />}
          />
          <button className="book-price-button">Kindle ${book.price}</button>
          <div className="stars-container">
            <span class="material-symbols-outlined">star</span>
            <span class="material-symbols-outlined">star</span>
            <span class="material-symbols-outlined">star</span>
            <span class="material-symbols-outlined">star</span>
            <span class="material-symbols-outlined">star</span>
          </div>
          Rate this book
        </div>
        <div className="cook-book-info">
          <h1>{book.title}</h1>
          <h2>By {book.author}</h2>
          <h4>First Published {formattedPublishedDate}</h4>
          <p className="book-description">{book.description}</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Book;
