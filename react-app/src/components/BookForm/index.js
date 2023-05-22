import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom"
import { thunkCreateBook } from "../../store/books";

function BookForm(){
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(1);
    const [published, setPublished] = useState(new Date('1212-12-12').toISOString().split('T')[0]);
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        let err = {}
        if (!title.length){
            err.title="Title is required"
        } else if (title.length < 2){
            err.title = "Title must be at least 2 characters"
        }

        if (!author.length) {
            err.author = "Author is required"
        } else if (author.length < 2){
            err.author = "Author must be at least 2 characters"
        }

        if (description.length < 3){
            err.description = "Description must be at least 3 characters"
        }

        if (price < 1){
            err.price = "Please enter a valid price"
        }

        if (image.length < 1) {
            err.image = "Image is required"
        } else if (!image.endsWith('.png') && !image.endsWith('.jpg') && !image.endsWith('.jpeg')){
            err.image = 'Image URL must end in .png, .jpg, or .jpeg'
        }
        if (Object.keys(err).length > 0){
            setErrors(err)
        } else {
            const new_book = {
                title,
                author,
                description,
                price,
                published,
                preview_img: image
            }
            dispatch(thunkCreateBook(new_book))
            history.push('/')
        }

    }

    const disableButton = () => {
        if (title.length === 0 || author.length === 0 || description.length === 0 || image.length === 0){
            return true
        } else {
            return false
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Don't see a book? Add a book!</h1>
            {errors.title ? <p>{errors.title}</p>: null}
            <label>Title</label>
            <input
                type='text'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Title"
                name="title"
            />
            <label>Written By</label>
            {errors.author ? <p>{errors.author}</p>: null}
            <input
                type='text'
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
                placeholder="Who was this book written by?"
                name="author"
            />

            <label>Description</label>
            {errors.description ? <p>{errors.description}</p>: null}
            <textarea
                type='textbox'
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Please describe the book with at least a few sentences"
                name="description"
            />
            <label>Price</label>
            {errors.price ? <p>{errors.price}</p>: null}
            <input
                type='number'
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                placeholder="Price"
                name="price"
            />

            <label>Published</label>
            {errors.published ? <p>{errors.published}</p>: null}
            <input
                type='date'
                onChange={(e) => setPublished(e.target.value)}
                value={published}
                placeholder="Published date"
                name="published"
            />

            <label>Image Preview</label>
            {errors.image ? <p>{errors.image}</p>: null}
            <input
                type='text'
                onChange={(e) => setImage(e.target.value)}
                value={image}
                placeholder="Please post book cover"
                name="image"
            />

            <button type="submit" disabled={disableButton()}>
                Add book!
            </button>
        </form>
    )

}

export default BookForm;
