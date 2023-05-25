import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAddToShelf } from "../../store/bookshelf";

const AddNewShelf = () => {
    const [shelf, setShelf] = useState();
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user)


    const handleSubmit = (e) => {
        e.preventDefault();

        const new_shelf = {
            name: shelf
        }
        dispatch(thunkAddToShelf(new_shelf))
        setShelf('')
    }

    return (
        <form onSubmit={handleSubmit}>
            {user ? (
                <>
                    <div className="add-shelf-container">
                      <input
                        className="add-shelf-input"
                        type='text'
                        value={shelf}
                        onChange={(e) => setShelf(e.target.value)}
                        placeholder="Add new shelf here"
                        name='name'
                        required
                      />
                      <button
                        className="add"
                        type="submit">Add</button>
                      </div>
                </>
            ):( null)}
        </form>
    )
}

export default AddNewShelf;
