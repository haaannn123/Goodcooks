import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { thunkEditBook } from "../../store/books";
import { thunkGetBookById } from "../../store/books";
import { useParams } from "react-router-dom";
function BookFormUpdate() {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const book = useSelector((state) => state.booksReducer.book);

  useEffect(() => {
    dispatch(thunkGetBookById(bookId));
  }, [dispatch, bookId]);

  const [errors, setErrors] = useState({});


  const dateOnChangeHandler = (e) => {
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let author = e.target.author.value;
    let title = e.target.title.value;
    let price = e.target.price.value;
    let published = e.target.published.value;
    let description = e.target.description.value;
    let image = e.target.image.value;

        let err = {};
    if (!title.length) {
      err.title = "Title is required";
    } else if (title.length < 2) {
      err.title = "Title must be at least 2 characters";
    }

    if (!author.length) {
      err.author = "Author is required";
    } else if (author.length < 2) {
      err.author = "Author must be at least 2 characters";
    }

    if (description.length < 3) {
      err.description = "Description must be at least 3 characters";
    }

    if (price < 1) {
      err.price = "Please enter a valid price";
    }

    if (image.length < 1) {
      err.image = "Image is required";
    } else if (!image.endsWith(".png") && !image.endsWith(".jpg") && !image.endsWith(".jpeg")) {
      err.image = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (Object.keys(err).length > 0) {
      setErrors(err);
    } else {
      const new_book = {
        title,
        author,
        description,
        price,
        published,
        preview_img: image,
      };
      console.log("NEW_BOOK", new_book);
      dispatch(thunkEditBook(new_book, bookId));
      history.push(`/books/${bookId}`);
    }
  };

  // const disableButton = () => {
  //   if (title.length === 0 || author.length === 0 || description.length === 0 || image.length === 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Don't see a book? Add a book!</h1>
      {errors.title ? <p>{errors.title}</p> : null}
      <label>Title</label>
      <input
        type="text"
        // onChange={(e) => setTitle(e.target.value)}
        defaultValue={book.title}
        placeholder="Title"
        name="title"
      />
      <label>Written By</label>
      {errors.author ? <p>{errors.author}</p> : null}
      <input
        type="text"
        // onChange={(e) => setAuthor(e.target.value)}
        defaultValue={book.author}
        placeholder="Who was this book written by?"
        name="author"
      />

      <label>Description</label>
      {errors.description ? <p>{errors.description}</p> : null}
      <textarea
        type="textbox"
        // onChange={(e) => setDescription(e.target.value)}
        defaultValue={book.description}
        placeholder="Please describe the book with at least a few sentences"
        name="description"
      />
      <label>Price</label>
      {errors.price ? <p>{errors.price}</p> : null}
      <input
        name="price"
        type="number"
        // onChange={(e) => setPrice(e.target.value)}
        defaultValue={book.price}
        placeholder="Price"
      />

      <label>Published</label>
      {errors.published ? <p>{errors.published}</p> : null}
      <input
        name="published"
        type="date"
        onChange={(e) => dateOnChangeHandler(e)}
        defaultValue={book.published}
        placeholder="Published date"
      />

      <label>Image Preview</label>
      {errors.image ? <p>{errors.image}</p> : null}
      <input
        name="image"
        type="text"
        // onChange={(e) => setImage(e.target.value)}
        defaultValue={book.preview_img}
        placeholder="Please post book cover"
      />

      <button type="submit" disabled={false}>
        Add book!
      </button>
    </form>
  );
}

export default BookFormUpdate;
