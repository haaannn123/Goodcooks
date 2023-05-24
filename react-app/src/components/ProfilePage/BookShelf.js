import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserBookShelf } from "../../store/bookshelf";
import DisplayBooks from "./DisplayBooks";
import AddToShelfButton from "./AddToShelfButton";
import DeleteShelfButton from "./DeleteShelfButton";

const BookShelf = ({ firstName, lastName }) => {
  const dispatch = useDispatch();
  const [shelf, setShelf] = useState();
  const [shelfId, setShelfId] = useState();
  const bookshelves = useSelector((state) => state.bookshelvesReducer.bookshelves);
  const bookshelvesArr = Object.values(bookshelves);


  useEffect(() => {
    dispatch(thunkGetUserBookShelf());
  }, [dispatch]);


  useEffect(() => {
    let currentReadingShelf;

    Object.values(bookshelves).forEach((bookshelf) => {
      if (bookshelf.name === "currently_reading") {
        currentReadingShelf = bookshelf;
      }
    });

    if (currentReadingShelf) {
      setShelf(currentReadingShelf.name);
      setShelfId(currentReadingShelf.id);
    }
  }, [bookshelves]);

  const displayShelf = (name, id) => {
    setShelf(name)
    setShelfId(id)
  }

  const shelfDisplayHeader = (shelf, firstName ) => {
    if (shelf === "currently_reading") {
      return `${firstName.toUpperCase()} IS CURRENTLY READING`;
    } else if (shelf === "read") {
      return `${firstName.toUpperCase()} HAS READ`;
    } else if (shelf === "to_read") {
      return `${firstName.toUpperCase()} WANTS TO READ`;
    } else {
      return `${firstName.toUpperCase()}'S ${shelf.toUpperCase()}`;
    }
  };

  return (
    <>
      {/* displays user's bookshelves */}
      <div>
        {bookshelvesArr.map((bookshelf) => {
          return (
            <>
              <div onClick={() => displayShelf(bookshelf.name, bookshelf.id)}>{bookshelf.name}</div>
            </>
          );
        })}
      <AddToShelfButton />
      </div>
      {/* when clicked will display books in bookshelves */}
      <div>
        {shelf && (
          <div>
            <h3>{shelfDisplayHeader(shelf, firstName)}</h3>
            <DisplayBooks shelfId={shelfId} />
          </div>
        )}
      </div>
    </>
  );
};
export default BookShelf;
