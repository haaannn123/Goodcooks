import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetBookshelfItemBooks } from "../../store/bookshelf_items";
import Dropdown from "./bookDropdown";

const DisplayBooks = ({ shelfId }) => {
  const dispatch = useDispatch();

  const book = useSelector((state) => state.bookshelfItemReducer.bookshelfItems);
  const bookArr = Object.values(book);

  useEffect(() => {
    dispatch(thunkGetBookshelfItemBooks(shelfId));
    setDropdown(null);
  }, [dispatch, shelfId]);

  const [dropdown, setDropdown] = useState(null);

  const handleDropdownSelect = (id) => {
    setDropdown(id);
  };

  return (
    <div className="bookshelf-items">
      {bookArr.map((book) => {
        return (
          <div className="bookshelf-item">
            <img src={book.preview_img} alt="" style={{ width: "50px" }} />
            <h1>{book.title}</h1>
            <button onClick={() => handleDropdownSelect(book.id)}>Dropdown</button>
            <Dropdown id={book.id} dropdown={dropdown} />
          </div>
        );
      })}
    </div>
  );
};

export default DisplayBooks;
