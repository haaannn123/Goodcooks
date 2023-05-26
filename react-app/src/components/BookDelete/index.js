import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { thunkDeleteBook } from "../../store/books";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
const BookDelete = ({bookId}) => {

  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = () => {
    dispatch(thunkDeleteBook(bookId));
    closeModal();
  };


  return (
    <>
      <h1>Are you sure you want to delete this book?</h1>
      <button id="yes-delete" onClick={handleSubmit}>
        Yes, Delete Product
      </button>
      <button id="no-keep" onClick={closeModal}>
        Cancel
      </button>
    </>
  );
};
export default BookDelete;
