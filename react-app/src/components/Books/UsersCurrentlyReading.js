import { useEffect } from "react";
import { thunkGetUserBookShelf } from "../../store/bookshelf";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetBookshelfItemBooks } from "../../store/bookshelf_items";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const UsersCurrentlyReading = () => {
    const dispatch = useDispatch();

    const usersBooks = useSelector(state => state.bookshelfItemReducer.bookshelfItems)

    useEffect(() => {
        dispatch(thunkGetUserBookShelf())
        dispatch(thunkGetBookshelfItemBooks(1))
    }, [dispatch])

    return (
        <div className="currently-reading-container">
            <NavLink className="navlink currently-reading"to="/user">CURRENTLY READING</NavLink>
           {Object.values(usersBooks).map((book) => {
                return(
                <NavLink to={`/books/${book.id}`}>
                    <img className="bookcover-img" src={book.preview_img} alt="book- cover"/>
                </NavLink>
                )
           })}
        </div>

    )
}

export default UsersCurrentlyReading;
