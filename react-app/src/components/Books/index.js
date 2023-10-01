import "./Books.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkGetAllBooks } from "../../store/books";
import { NavLink } from "react-router-dom";
import UsersCurrentlyReading from "./UsersCurrentlyReading";

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
    <div className="page">
      {user ? (
        <div className="entire-books-container">
          <div className="books-header">
            <h1 className="user-edit-your-books">Currently reading</h1>
            <NavLink to={`/user/${user.id}`} className="see-all-button">
              See All <span className="arrow"><span className="material-symbols-outlined">chevron_right</span></span>
            </NavLink>
          </div>
          <UsersCurrentlyReading />
          <hr className="gray-line" />
          <div className="books-header">
            <h1 className="user-edit-your-books">Explore cookbooks</h1>
            <NavLink to="/books" className="see-all-button">
              See All <span className="arrow"><span className="material-symbols-outlined">chevron_right</span></span>
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
    </div>
  );
}

export default Books;
