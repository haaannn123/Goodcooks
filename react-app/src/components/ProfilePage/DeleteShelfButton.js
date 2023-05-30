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
    }

    const handleClick = () => {
      closeModal()
    }

    return (
        <div className="delete-shelf-modal">
        <h1>Are you sure you want to delete this shelf?</h1>
        <div className="delete-shelf-buttons">
        <button id="yes-delete" onClick={handleSubmit}>
          I'M SURE
        </button>
        <button onClick={handleClick} id="no-keep" >
          NOT SURE
        </button>
        </div>
      </div>
    )
}

export default DeleteShelfButton;
