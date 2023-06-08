import { useDispatch, useSelector } from "react-redux";
import { thunkAddBookToShelf, thunkRemoveShelfItem } from "../../store/bookshelf_items";
import { useEffect } from "react";

const WantToReadButton = ({bookId, bookShelfItem}) => {
    const dispatch = useDispatch();

    let isBookInShelf = false;
    for (const key in bookShelfItem) {
        if (bookShelfItem[key].id === bookId) {
            isBookInShelf = true;
            break;
        }
    }

    const handleClick = () => {
        if (isBookInShelf) {
          dispatch(thunkRemoveShelfItem(3, bookId));
        } else {
          dispatch(thunkAddBookToShelf(bookId, 3));
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
