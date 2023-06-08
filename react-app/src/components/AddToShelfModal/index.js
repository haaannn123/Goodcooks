import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAddBookToShelf } from "../../store/bookshelf_items";
import { thunkGetUserBookShelf } from "../../store/bookshelf";
import { useModal } from "../../context/Modal";
import "./addToShelfModal.css";

const AddToShelfModal = ({ bookId }) => {
  const [shelf, setShelf] = useState();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const userBookshelves = useSelector((state) => state.bookshelvesReducer.bookshelves);
  const backendError = useSelector((state) => state.bookshelfItemReducer.error);

  useEffect(() => {
    dispatch(thunkGetUserBookShelf());
  }, [dispatch]);

  const handleClick = (shelfName, shelfId) => {
    setShelf(shelfName);
    dispatch(thunkAddBookToShelf(bookId, shelfId))
      .then(() => {
        closeModal();
      })
      .catch(() => {
      });
  };

  const shelfDisplayHeader = (shelf) => {
    if (shelf === "currently_reading") {
      return `currently reading`;
    } else if (shelf === "read") {
      return `read`;
    } else if (shelf === "to_read") {
      return `want to read`;
  } else {
    return shelf
  }
}

  return (
    <div className="add-book-to-shelf-modal">
      <h1 className="add-to-shelf-header">Choose Shelf</h1>
      {Object.values(userBookshelves).map((shelf) => {
        return (
          <button
            key={shelf.id}
            className="shelf-buttons"
            onClick={() => handleClick(shelf.name, shelf.id)}
          >{shelfDisplayHeader(shelf.name)}</button>
        );
      })}
    </div>
  );
};

export default AddToShelfModal;
