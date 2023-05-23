import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { thunkDeleteShelf } from "../../store/bookshelf";
import { useModal } from "../../context/Modal";
const DeleteShelfButton = ({bookshelfId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {closeModal} = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(thunkDeleteShelf(bookshelfId));
        closeModal();
        window.location.reload()
    }

    return (
        <>
        <h1>Are you sure you want to delete this shelf?</h1>
        <button id="yes-delete" onClick={handleSubmit}>
          Yes, Delete Product
        </button>
        <button id="no-keep" >
          Cancel
        </button>
      </>
    )
}

export default DeleteShelfButton;
