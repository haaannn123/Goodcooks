import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserBookShelf, thunkUpdateShelf } from "../../store/bookshelf";
import { useEffect, useState } from "react";
import DeleteShelfButton from "./DeleteShelfButton";
import OpenModalButton from "../OpenModalButton";
import AddNewShelf from "./AddNewShelf";

const EditShelf = () => {
  const dispatch = useDispatch();
  const [changeShelfName, setChangeShelfName] = useState();
  const [shelfId, setShelfId] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const bookshelves = useSelector((state) => state.bookshelvesReducer.bookshelves);
  const bookshelvesArr = Object.values(bookshelves);


  const handleClick = (bookshelfId) => {
    console.log('ID HERE!!!!:',bookshelfId)
    setShelfId(bookshelfId)
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    dispatch(thunkGetUserBookShelf());
  }, [dispatch]);


  const handleUpdateClick = (bookshelfId) => {
    console.log('bookshelf ID HERE!', bookshelfId)
    console.log('CHANGED SHELF NAME', changeShelfName)
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
              <>
                <OpenModalButton buttonText="x" modalComponent={<DeleteShelfButton bookshelfId={bookshelf?.id} />} />
                <button
                  onClick={(e) => {handleClick(bookshelf.id)}}
                  >rename</button>
                {isOpen ?
                  <div>
                      <input
                      type="text"
                      defaultValue={bookshelf.name}
                      onChange={(e) => setChangeShelfName(e.target.value)}
                      name="name"
                    />
                    <button onClick={() => handleUpdateClick(bookshelf.id)}>update</button>
                    </div>
              :null}
                  </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default EditShelf;
