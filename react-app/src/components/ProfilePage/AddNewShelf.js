import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAddToShelf } from "../../store/bookshelf";

const AddNewShelf = () => {
    const [shelf, setShelf] = useState("");
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user)


    const handleSubmit = (e) => {
        e.preventDefault();

        let err = {};

        // Trim the shelf name to remove leading and trailing spaces
        const trimmedShelf = shelf.trim();

        if (!trimmedShelf.length) {
          err.shelf = "You must enter a name to add";
        } else if (trimmedShelf.length < 2 || trimmedShelf.length > 20) {
          err.shelf = "Name must be between 2 and 20 characters";
        }

        if (Object.keys(err).length > 0) {
          setErrors(err);
        } else {
          const new_shelf = {
            name: trimmedShelf,
          };
          dispatch(thunkAddToShelf(new_shelf));
          setShelf("");
          setErrors({})
        }
      };

    return (
        <form onSubmit={handleSubmit}>
            {user ? (
                <>
                    <div className="add-shelf-container">
                    {errors.shelf ? <p className="errors">{errors.shelf}</p>: null}
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
