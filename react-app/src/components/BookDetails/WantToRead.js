import { useDispatch, useSelector } from "react-redux";
import { thunkAddBookToShelf, thunkRemoveShelfItem } from "../../store/bookshelf_items";
import { useEffect } from "react";
import { thunkGetUserBookShelf } from "../../store/bookshelf";

const WantToReadButton = ({bookId, bookShelfItem, shelfId}) => {
    const dispatch = useDispatch();

    let isBookInShelf = false;
    for (const key in bookShelfItem) {
        if (bookShelfItem[key].id === bookId) {
            isBookInShelf = true;
            break;
        }
    }

    useEffect(() => {
      dispatch(thunkGetUserBookShelf())
    }, dispatch)

    const handleClick = () => {
        if (isBookInShelf) {
          dispatch(thunkRemoveShelfItem(shelfId, bookId));
        } else {
          dispatch(thunkAddBookToShelf(bookId, shelfId));
        }
      };

    return (
      <>
      <button className="add-to-shelf-button" onClick={handleClick}>
        {isBookInShelf ? (
          <>
             Want to read <i className="fa-solid fa-check"></i>
          </>
        ) : (
          "Want to read"
        )}
      </button>
    </>
    )
}

export default WantToReadButton;
