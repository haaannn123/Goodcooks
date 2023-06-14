import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAddBookToShelf, thunkRemoveShelfItem } from "../../store/bookshelf_items";
import { thunkGetUserBookShelf } from "../../store/bookshelf";
import { useModal } from "../../context/Modal";
import "./addToShelfModal.css";
import { useParams } from "react-router-dom"

const AddToShelfModal = ({bookId, bookShelfItem }) => {
  const [shelf, setShelf] = useState();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const userBookshelves = useSelector((state) => state.bookshelvesReducer.bookshelves);

  let isBookInShelf = false;
  for (const key in bookShelfItem) {
      if (bookShelfItem[key].id === bookId) {
          isBookInShelf = true;
          break;
      }
  }

  useEffect(() => {
    dispatch(thunkGetUserBookShelf());
  }, [dispatch]);

  const handleClick = (shelfName, shelfId) => {

    setShelf(shelfName);
    if (isBookInShelf) {
      dispatch(thunkRemoveShelfItem(shelfId, bookId));
    } else {
      dispatch(thunkAddBookToShelf(bookId, shelfId));
      closeModal()
    }
  };



  const shelfDisplayHeader = (shelf) => {
    if (shelf === "currently_reading") {
      return "Currently Reading";
    } else if (shelf === "read") {
      return "Finished";
    } else if (shelf === "to_read") {
      return "Want To Read";
    } else {
      return shelf;
    }
  };

  return (
    <div className="add-book-to-shelf-modal">
      {Object.values(userBookshelves).map((shelf) => {
        return (
          <button
            key={shelf.id}
            className="shelf-buttons"
            onClick={() => handleClick(shelf.name, shelf.id)}
          >
            {isBookInShelf ? (
              <>
                {shelfDisplayHeader(shelf.name)} <i className="fa-solid fa-check"></i>
              </>
            ) : (
              <>{shelfDisplayHeader(shelf.name)}</>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default AddToShelfModal;
