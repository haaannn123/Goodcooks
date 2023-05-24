import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAddToShelf } from "../../store/bookshelf";

const AddToShelfButton = () => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const [shelf, setShelf] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        const new_shelf = {
            name: shelf
        }
        dispatch(thunkAddToShelf(new_shelf))
    }

    return (
        <form onSubmit={handleSubmit}>
            {user ? (
                <>
                    <button>Add shelf</button>
                    <input
                        type='text'
                        value={shelf}
                        onChange={(e) => setShelf(e.target.value)}
                        placeholder="shelf name"
                        name='name'
                    />
                    <button type="submit">Add</button>
                </>
            ):( null)}
        </form>
    )
}

export default AddToShelfButton;
