import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetBookshelfItemBooks } from "../../store/bookshelf_items";
import RemoveFromShelves from "../RemoveFromShelves";

const DisplayBooks = ({ shelfId }) => {
  const dispatch = useDispatch();

  const book = useSelector((state) => state.bookshelfItemReducer.bookshelfItems);
  const bookArr = Object.values(book);

  useEffect(() => {
    dispatch(thunkGetBookshelfItemBooks(shelfId));
  }, [dispatch, shelfId]);



  return (
    <div className="bookshelf-items">
      {bookArr.length > 0 ? bookArr.map((book) => {
        return (
          <div className="bookshelf-item">
              <img
                className="bookcover-img"
                src={book.preview_img}
                alt=""
              />
            <RemoveFromShelves shelfId={shelfId} bookId={book.id}/>
          </div>
        );
      }) :
      <>
        <p>To add cookbooks to this shelf, click on any book and click on the "Add to shelf" button</p>
        <img
          className="empty-book"
          src="https://i.imgur.com/lTpmNhy.png"
          alt="empty book"/>
      </>
      }
    </div>
  );
};

export default DisplayBooks;
