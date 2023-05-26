import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { thunkDeleteBook } from "../../store/books";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./BookDelete.css"

const BookDelete = ({bookId}) => {

  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = () => {
    dispatch(thunkDeleteBook(bookId));
    closeModal();
  };


  return (
    <div className="book-delete-page">
      <h1>Are you sure you want to delete this book?</h1>
      <div className="yes-no">
      <button id="yes-delete" onClick={handleSubmit}>
        Yes, Delete Product
      </button>
      <button id="no-keep" onClick={closeModal}>
        Cancel
      </button>
      </div>
    </div>
  );
};
export default BookDelete;
