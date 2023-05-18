import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { thunkCreateBook } from "../../store/books";

function BookForm(){
    const dispatch = useDispatch();
    const [title, setTitle] = useState();

    const book = useSelector(state => state);
    console.log(book)

    const handleSubmit = (e) => {
        e.preventDefault();


    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Don't see a book? Add a book!</h1>
        <label>Title</label>
        <input
            type='text'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Title"
            name="title"
        />
        <label></label>
        <input></input>
        <label></label>
        <input></input>
        <label></label>
        <input></input>
        <label></label>
        <input></input>
        </form>
    )

}

export default BookForm;
