import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserBookShelf, thunkUpdateShelf } from "../../store/bookshelf";
import { useEffect, useState } from "react";
import DeleteShelfButton from "./DeleteShelfButton";
import OpenModalButton from "../OpenModalButton";
import AddNewShelf from "./AddNewShelf";

const EditShelf = () => {
  const dispatch = useDispatch();
  const [changeShelfName, setChangeShelfName] = useState();
  const bookshelves = useSelector((state) => state.bookshelvesReducer.bookshelves);
  const bookshelvesArr = Object.values(bookshelves);

  useEffect(() => {
    dispatch(thunkGetUserBookShelf());
  }, [dispatch]);


  const handleUpdateClick = (bookshelfId) => {
    const updatedBookshelf = {
      name: changeShelfName,
    };
    dispatch(thunkUpdateShelf(updatedBookshelf, bookshelfId));
    setChangeShelfName(updatedBookshelf)
  };


  return (
    <div className="edit-shelves-container">
      <h1>Edit shelves</h1>
      <AddNewShelf />
      {bookshelvesArr.map((bookshelf) => {
        return (

          <div className="edit-shelves-buttons">
            <div>{bookshelf.name}</div>

            {bookshelf.name === "currently_reading" || bookshelf.name === "to_read" || bookshelf.name === "read" ? null : (
              <div>
                    <input
                        type="text"
                        defaultValue={bookshelf.name}
                        onChange={(e) => setChangeShelfName(e.target.value)}
                        name="name"
                    />
                    <button
                        className="button"
                        onClick={() => handleUpdateClick(bookshelf.id)}>rename</button>
                    <OpenModalButton
                        buttonText="delete shelf"
                        className="button"
                        modalComponent={<DeleteShelfButton bookshelfId={bookshelf?.id} />}
                    />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default EditShelf;
