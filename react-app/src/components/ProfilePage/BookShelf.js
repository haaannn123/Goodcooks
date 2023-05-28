import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserBookShelf } from "../../store/bookshelf";
import DisplayBooks from "./DisplayBooks";
import AddToShelfButton from "./AddNewShelf";
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
      console.log('CURRENTLY READING NAME', currentReadingShelf.name)
      setShelfId(currentReadingShelf.id);
      console.log('CURRENTLY READING ID', currentReadingShelf.id)
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
    <div className="user-bookshelf">
      <div className="user-all-shelves">

          {bookshelvesArr.map((bookshelf) => {
            return (
                <div
                  className="shelves-of-user"
                  onClick={() => displayShelf(bookshelf.name, bookshelf.id)}>{bookshelf.name}</div>
            );
          })}


      </div>

      <div>
          {shelf && (
            <div>
              <h2 className="shelf-display-header">{shelfDisplayHeader(shelf, firstName)}</h2>
              <DisplayBooks shelfId={shelfId} />
            </div>
          )}
      </div>
    </div>
  );
};
export default BookShelf;
