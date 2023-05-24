import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { thunkAddToShelf } from '../../store/bookshelf_items';
import { thunkGetUserBookShelf } from '../../store/bookshelf';
import { useModal } from '../../context/Modal';

const AddToShelfModal = ({bookId}) => {
    const [shelf, setShelf] = useState();
    const dispatch = useDispatch();
    const {closeModal} = useModal();
    const userBookshelves = useSelector(state => state.bookshelvesReducer.bookshelves)

    useEffect(() => {
        dispatch(thunkGetUserBookShelf())
    }, [dispatch])

    const handleClick = (shelfName, shelfId) => {
        console.log(shelfName)
        setShelf(shelfName)
        dispatch(thunkAddToShelf(bookId, shelfId))
        closeModal()
    }

    return (
        <div>
            <h1>Choose a shelf for this book</h1>
            {Object.values(userBookshelves).map((shelf) => {
                return (
                    <button onClick={() => handleClick(shelf.name, shelf.id)}>{shelf.name}</button>
                )
            })}
        </div>
    )
}

export default AddToShelfModal;
