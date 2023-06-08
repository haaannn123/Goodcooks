import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkGetBookById } from "../../store/books";
import { dateParser } from "../../helper_functions/dateParser";
import OpenModalButton from "../OpenModalButton";
import AddToShelfModal from "../AddToShelfModal";
import { thunkGetUserBookShelf } from "../../store/bookshelf";
import Reviews from "./Reviews";
import Footer from "../Footer";
import "./Book.css";
import "./Reviews.css";
import { thunkGetBookReviews } from "../../store/reviews";
import UserReviews from "./UserReviews";
import WantToReadButton from "./WantToRead";
import { thunkGetBookshelfItemBooks } from "../../store/bookshelf_items";
import {Link} from 'react-scroll'

const Book = () => {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const book = useSelector((state) => state.booksReducer.book);
  const bookShelfItem = useSelector(state => state.bookshelfItemReducer.bookshelfItems)
  console.log('BOOKSHELF ITEM WORKED:', bookShelfItem)
  const reviews = Object.values(useSelector((state) => state.bookReviewsReducer.bookReviews));

  dateParser(book.published);
  const formattedPublishedDate = new Date(book.published).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    dispatch(thunkGetBookById(bookId));
    dispatch(thunkGetUserBookShelf());
    dispatch(thunkGetBookReviews(bookId));
    dispatch(thunkGetBookshelfItemBooks(3))
  }, [dispatch, bookId]);

  function averageRating(reviews) {
    let sum = 0;
    if (reviews.length > 0) {
      reviews.forEach((review) => (sum += review.rating));
      return sum / reviews.length;
    } else{
      return sum
    }

  }

  return (
    <>
      <div className="book-details-page">
        <div className="book-img-add-to-shelf">
          <img className="cook-book-img" src={book.preview_img} alt="cookbook" />
          <WantToReadButton bookId={book.id} bookShelfItem={bookShelfItem}/>
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
          <h1 className="book-title">{book.title}</h1>
          <span className="book-author">{book.author}</span>
          <div className="rating-details">
            <Reviews avgRating={averageRating(reviews)} numReviews={reviews.length}/>
          </div>
          <div className="description-container">
            <p className={`book-description ${isOpen ? "expanded" : ""}`}>{book.description}</p>
              <button className="show-more-button" onClick={toggle}>
                {isOpen ? (
                  <>
                    Show Less  <i className="fa-solid fa-angle-up"></i>
                  </>
                ) : (
                  <>
                    Show More  <i className="fa-solid fa-angle-down"></i>
                  </>
                )}
              </button>
          </div>
          <p className="book-published">First Published {formattedPublishedDate}</p>
          <div className="divider">
            <hr className="silver-line"/>
          </div>
          <UserReviews />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Book;
