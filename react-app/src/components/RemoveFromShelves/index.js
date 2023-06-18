import { useDispatch, useSelector } from 'react-redux'
import './RemoveFromShelf.css'
import { thunkRemoveShelfItem } from '../../store/bookshelf_items';
import { useEffect } from 'react';
import { thunkGetUser } from '../../store/user';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
const RemoveFromShelves = ({shelfId, bookId}) => {
    const {userId} = useParams()
    const dispatch = useDispatch();

    const user = useSelector(state => state.userReducer.singleUser)
    const currentUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(thunkGetUser(userId))
    }, [dispatch, userId])

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(thunkRemoveShelfItem(shelfId, bookId))
    }
    return (
        <>
        {currentUser.id === user.id ? (<button
            className="remove-from-shelf"
            onClick={handleClick}>Remove</button>) : null}
        </>
    )
}

export default RemoveFromShelves;
