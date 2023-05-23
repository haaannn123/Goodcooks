import "./Books.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkGetAllBooks } from "../../store/books";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";


function Books() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const books = useSelector((state) => state.booksReducer.books);
  const booksArr = Object.values(books);

  useEffect(() => {
    dispatch(thunkGetAllBooks());
  }, [dispatch]);

  return (
    <div>
      {user ? (
        <div>
          {booksArr.map((book) => {
            return (
              <div className="book-card">
                <NavLink to={`/books/${book.id}`}>
                  <img className="bookcover-img" src={book.preview_img} alt="cookbooks" />
                  <div>
                    <h1>{book.title}</h1>
                    <h2>By {book.author}</h2>
                  </div>
                </NavLink>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
export default Books;
