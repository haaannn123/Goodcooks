import "./Books.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkGetAllBooks } from "../../store/books";
import { NavLink } from "react-router-dom";
import UsersCurrentlyReading from "./UsersCurrentlyReading";
import Footer from "../Footer";

function Books() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const books = useSelector((state) => state.booksReducer.books);
  const booksArr = Object.values(books);

  const shuffleBooks = () => {
    const shuffledBooksArr = [...booksArr];
    for (let i = shuffledBooksArr.length - 1; i > 0; i--) {
      let randomIdx = Math.floor(Math.random() * (i + 1));
      [shuffledBooksArr[i], shuffledBooksArr[randomIdx]] = [
        shuffledBooksArr[randomIdx],
        shuffledBooksArr[i],
      ];
    }
    return shuffledBooksArr;
  };

  const shuffledBookArr = shuffleBooks(booksArr).slice(0, 14);

  useEffect(() => {
    dispatch(thunkGetAllBooks());
  }, [dispatch]);

  return (
    <div>
      {user ? (
        <div className="entire-books-container">
          <div className="books-header">
            <h1 className="books-heading">Currently Reading</h1>
            <NavLink to="/user" className="see-all-button">
              See All <span className="arrow"><i class="fa-solid fa-chevron-right"></i></span>
            </NavLink>
          </div>
          <UsersCurrentlyReading />
          <hr className="gray-line" />
          <div className="books-header">
            <h1 className="books-heading">Explore cookbooks</h1>
            <NavLink to="/books" className="see-all-button">
              See All <span className="arrow"><i class="fa-solid fa-chevron-right"></i></span>
            </NavLink>
          </div>
          <div className="all-books-container">
            {shuffledBookArr.map((book) => {
              return (
                <div className="books-card" key={book.id}>
                  <NavLink to={`/books/${book.id}`}>
                    <img
                      className="bookcover-img"
                      src={book.preview_img}
                      alt="cookbooks"
                    />
                  </NavLink>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
      <Footer />
    </div>
  );
}

export default Books;
