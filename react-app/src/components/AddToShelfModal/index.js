import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAddToShelf } from "../../store/bookshelf_items";
import { thunkGetUserBookShelf } from "../../store/bookshelf";
import { useModal } from "../../context/Modal";
import RemoveFromShelves from "../RemoveFromShelves";
import "./addToShelfModal.css";

const AddToShelfModal = ({ bookId }) => {
  const [shelf, setShelf] = useState();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const userBookshelves = useSelector((state) => state.bookshelvesReducer.bookshelves);
  const backendError = useSelector((state) => state.bookshelfItemReducer.error);
  console.log("ERROR HERE", backendError);

  useEffect(() => {
    dispatch(thunkGetUserBookShelf());
  }, [dispatch]);

  const handleClick = (shelfName, shelfId) => {
    setShelf(shelfName);
    dispatch(thunkAddToShelf(bookId, shelfId))
      .then(() => {
        closeModal();
      })
      .catch(() => {
        // Prevents closing modal if any errors
      });
  };

  return (
    <div>
      <h1>Choose a shelf for this book</h1>
      <p className="error">{backendError}</p>
      {Object.values(userBookshelves).map((shelf) => {
        return <button onClick={() => handleClick(shelf.name, shelf.id)}>{shelf.name}</button>;
      })}
    </div>
  );
};

export default AddToShelfModal;