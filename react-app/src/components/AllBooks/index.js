import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkGetAllBooks } from "../../store/books";
import { NavLink } from "react-router-dom";
import Footer from "../Footer";
import './AllBooks.css'

function AllBooks() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const books = useSelector((state) => state.booksReducer.books);
  const booksArr = Object.values(books);

  const shuffleBooks = () => {
    const shuffledBooksArr = [...booksArr];
    for (let i = shuffledBooksArr.length -1; i > 0; i--){
      let randomIdx = Math.floor(Math.random() * (i + 1));
      [shuffledBooksArr[i], shuffledBooksArr[randomIdx]] = [shuffledBooksArr[randomIdx], shuffledBooksArr[i]]
    }
    return shuffledBooksArr
  }

  useEffect(() => {
    dispatch(thunkGetAllBooks());
  }, [dispatch]);

  const shuffledBookArr = shuffleBooks(booksArr)

  return (
    <>
    <div className="all-books-parent-container">
      {user ? (
        <div>
            <div className='books-header'>
            <NavLink to="/" className="left-arrow"><span className="arrow"><i class="fa-solid fa-chevron-left"></i></span> Back To Home
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
    <Footer />
    </>
  );
}

export default AllBooks;
