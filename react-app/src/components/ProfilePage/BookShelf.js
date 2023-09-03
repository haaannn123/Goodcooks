import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserBookShelf } from "../../store/bookshelf";
import DisplayBooks from "./DisplayBooks";

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
      return `${firstName} is currently reading`;
    } else if (shelf === "read") {
      return `${firstName} has finished`;
    } else if (shelf === "to_read") {
      return `${firstName} wants to read`;
    } else {
      return `${firstName}'s ${shelf}`;
    }
  };

  const renderShelfNames = (shelf) => {
    if (shelf === 'currently_reading'){
      return 'Currently Reading'
    } else if (shelf === 'read'){
      return 'Has Read'
    } else if (shelf === 'to_read'){
      return 'Wants To Read'
    } else {
      return shelf
    }
  }

  return (
    <div className="user-bookshelf">
      <div className="user-all-shelves">
          {bookshelvesArr.map((bookshelf) => {
            return (
                <div
                  className="shelves-of-user"
                  onClick={() => displayShelf(bookshelf.name, bookshelf.id)}>{renderShelfNames(bookshelf.name)}</div>
            );
          })}
      </div>
      <div className="divider">
            <hr className="silver-line"/>
      </div>
      <div className="more-books">
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
