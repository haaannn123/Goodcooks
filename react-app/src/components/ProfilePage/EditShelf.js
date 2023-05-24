import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserBookShelf, thunkUpdateShelf } from "../../store/bookshelf";
import { useEffect, useState } from "react";
import DeleteShelfButton from "./DeleteShelfButton";
import OpenModalButton from "../OpenModalButton";

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
    setChangeShelfName(""); // Reset the updated name state variable
  };

  return (
    <div>
      <h1>shelf</h1>
      {bookshelvesArr.map((bookshelf) => {
        return (
          <>
            <div>{bookshelf.name}</div>
            {bookshelf.name === "currently_reading" || bookshelf.name === "to_read" || bookshelf.name === "read" ? null : (
              <>
                <button>Edit</button>
                <input type="text" defaultValue={bookshelf.name} onChange={(e) => setChangeShelfName(e.target.value)} name="name" />
                <button onClick={() => handleUpdateClick(bookshelf.id)}>update</button>
                <OpenModalButton buttonText="delete" modalComponent={<DeleteShelfButton bookshelfId={bookshelf?.id} />} />
              </>
            )}
          </>
        );
      })}
    </div>
  );
};
export default EditShelf;
