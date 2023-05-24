import { useDispatch } from 'react-redux'
import './RemoveFromShelf.css'
import { thunkRemoveShelfItem } from '../../store/bookshelf_items';
const RemoveFromShelves = ({shelfId, bookId}) => {
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(thunkRemoveShelfItem(shelfId, bookId))
    }
    return (
        <button onClick={handleClick}>Remove from shelf</button>
    )
}

export default RemoveFromShelves;
