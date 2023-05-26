import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom"
import { thunkCreateBook } from "../../store/books";
import "./BookForm.css"

function BookForm(){
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(1.00);
    const [published, setPublished] = useState(new Date().toISOString().split('T')[0]);
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


        if (description.length < 30){
            err.description = "Description must be at least 30 characters"
        }

        const currentDate = new Date().toISOString().split("T")[0];
        if (published > currentDate) {
          err.published = "Published date cannot be in the future";
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
            history.push('/review/list')
        }

    }

    return (
        <form onSubmit={handleSubmit} className="create-book-form-container">
            <div className="create-book-form">
            <h1>Don't see your favorite cookbook? Add it!</h1>
            {errors.title ? <p className="errors">{errors.title}</p>: null}
            <div className="create-book-input">
            <label>Title</label>
            <input
                type='text'
                className="create-book-inputs"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Name of book"
                name="title"
                required
            />
            <label>Written By</label>
            {errors.author ? <p className="errors">{errors.author}</p>: null}
            <input
                type='text'
                className="create-book-inputs"
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
                placeholder="Who was this book written by?"
                name="author"
                required
            />

            <label>Summary</label>
            {errors.description ? <p className="errors">{errors.description}</p>: null}
            <textarea
                type='textbox'
                className="create-book-inputs"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Please write a description with at least 30 characters"
                name="description"
                required
            />
            <label>Price</label>
            {errors.price ? <p className="errors">{errors.price}</p>: null}
            <input
                  type='number'
                  className="create-book-inputs"
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setPrice(value < 1 ? 1.00 : value);
                  }}
                  value={price}
                  placeholder="Price"
                  name="price"
                  required
            />

            <label>Published</label>
            {errors.published ? <p className="errors">{errors.published}</p>: null}
            <input
                type='date'
                className="create-book-inputs"
                onChange={(e) => setPublished(e.target.value)}
                value={published}
                placeholder="Published date"
                name="published"
                required
            />

            <label>Image Preview</label>
            {errors.image ? <p className="errors">{errors.image}</p>: null}
            <input
                type='text'
                className="create-book-inputs"
                onChange={(e) => setImage(e.target.value)}
                value={image}
                placeholder="Please post book cover. URL must end in '.png', '.jpg', or '.jpeg'"
                name="image"
                required
            />
            </div>
            <button type="submit" className="create-book-button-submit">Add book</button>
            </div>
        </form>
    )

}

export default BookForm;
