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
import { thunkGetBookReviews, thunkRateBook } from "../../store/reviews";
import UserReviews from "./UserReviews";
import WantToReadButton from "./WantToRead";
import { thunkGetBookshelfItemBooks } from "../../store/bookshelf_items";
import {Link} from 'react-scroll'

const Book = () => {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [isOpen, setIsOpen] = useState(false);
  const [stars, setStar] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverNumber, setHoverNumber] = useState(0);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const book = useSelector((state) => state.booksReducer.book);
  const bookShelfItem = useSelector(state => state.bookshelfItemReducer.bookshelfItems)

  const reviews = Object.values(useSelector((state) => state.bookReviewsReducer.bookReviews));

  const userBookshelf = useSelector(state => state.bookshelvesReducer.bookshelves)
    let shelfId;
    for (const key in userBookshelf){
      if (userBookshelf[key].name === 'to_read'){
          shelfId = userBookshelf[key].id
      }
    }

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
    dispatch(thunkGetBookshelfItemBooks(shelfId))
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

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const handleClick = (num) => {
    setStar(num)
    dispatch(thunkRateBook(bookId, hoverNumber))
  }

  const getStarClass = (number) => {
    if (number <= hoverNumber) {
      return "material-symbols-outlined fill";
    }
    if (number <= stars) {
      return "material-symbols-outlined fill";
    } else {
      return "material-symbols-outlined";
    }
  };

  return (
    <>
      <div className="book-details-page">
        <div className="book-img-add-to-shelf">
          <img className="cook-book-img" src={book.preview_img} alt="cookbook" />
          <div className="add-to-shelf-container">
            <WantToReadButton bookId={book.id} bookShelfItem={bookShelfItem} shelfId={shelfId}/>
            <OpenModalButton
              buttonText={<i class="fa-solid fa-chevron-down"></i>}
              className="test-dropdown"
              onItemClick={closeMenu}
              modalComponent={<AddToShelfModal bookId={bookId} bookShelfItem={bookShelfItem} shelfId={shelfId}/>}
            />
          </div>
          <div className="add-to-shelf-container">
            <button className="book-price-button">Kindle ${book.price}</button>
            <button className="test-dropdown-two"><i class="fa-solid fa-chevron-down"></i></button>
          </div>
          <div className="stars-container">
            <span
              onClick={() => handleClick(1)}
              onMouseEnter={() => setHoverNumber(1)}
              onMouseLeave={() => setHoverNumber(0)}
              className={getStarClass(1)}>star</span>
            <span
              onClick={() => handleClick(2)}
              onMouseEnter={() => setHoverNumber(2)}
              onMouseLeave={() => setHoverNumber(0)}
              className={getStarClass(2)}>star</span>
            <span
              onClick={() => handleClick(3)}
              onMouseEnter={() => setHoverNumber(3)}
              onMouseLeave={() => setHoverNumber(0)}
              class={getStarClass(3)}>star</span>
            <span
              onClick={() => handleClick(4)}
              onMouseEnter={() => setHoverNumber(4)}
              onMouseLeave={() => setHoverNumber(0)}
              class={getStarClass(4)}>star</span>
            <span
              onClick={() => handleClick(5)}
              onMouseEnter={() => setHoverNumber(5)}
              onMouseLeave={() => setHoverNumber(0)}
              class={getStarClass(5)}>star</span>
          </div>
          Rate this book
        </div>
        <div className="cook-book-info">
          <h1 className="book-title">{book.title}</h1>
          <span className="book-author">{book.author}</span>
          <Link
            to="review"
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
            className="rating-details">
            <Reviews avgRating={averageRating(reviews)} numReviews={reviews.length}/>
          </Link>
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
