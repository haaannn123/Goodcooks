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
import { thunkGetBookshelfItemBooks } from "../../store/bookshelf_items";

const Book = () => {
  const { bookId }  = useParams();
  const dispatch = useDispatch();
  const {closeModal } = useModal();

  const book = useSelector((state) => state.booksReducer.book);
  const userBookshelf = useSelector(state => state.bookshelvesReducer.bookshelves)
  console.log("USER BOOKSHELF", userBookshelf)
  dateParser(book.published);

  useEffect(() => {
    dispatch(thunkGetBookById(parseInt(bookId)));
    dispatch(thunkGetUserBookShelf())
  }, [dispatch, bookId]);

  return (
    <>
      <img src={book.preview_img} alt="cookbook" />
      <h1>{book.title}</h1>
      <h2>{book.author}</h2>
      <h1>{book.price}</h1>

      <OpenModalButton
          buttonText="Add to shelf"
          onItemClick={closeModal}
          modalComponent={<AddToShelfModal bookId={parseInt(bookId)}/>}
      />
      <OpenModalButton
          buttonText="Delete Book"
          onItemClick={closeModal}
          modalComponent={<BookDelete bookId={bookId}/>}
      />
    </>
  );
};

export default Book;
