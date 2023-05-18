import './Books.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { thunkGetAllBooks } from '../../store/books';

function Books(){
    const dispatch = useDispatch();
    const books = useSelector((state) => state.booksReducer.books)
    const booksArr = Object.values(books)

    useEffect(()=> {
        dispatch(thunkGetAllBooks())
    }, [dispatch])

    return (
        <div>
            {booksArr.map((book) => {
                return (
                    <>
                        <h1>{book.title}</h1>
                        <h2>{book.author}</h2>
                        <img src={book.preview_img} alt="cookbooks"/>
                    </>
                    )
            })}
        </div>
    )
}
export default Books
