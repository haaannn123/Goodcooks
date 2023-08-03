import React from "react";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import './SearchResults.css'


const SearchResults = () => {
    const {search_terms}  = useParams()

    const searchResult = Object.values(useSelector(state => state.booksReducer.books))

    return (
        <div className="search-results-container">
        <h1>Search Results for "{`${search_terms}`}"</h1>
            <div className="search-results">
                {searchResult.length === 0 ? (<h2>Sorry, your search came up empty!</h2>
                ) : (
                    searchResult.map(book => {
                        return (
                            <div key={book.id}>
                                <NavLink to={`/books/${book.id}`}>
                                    <img
                                        src = {book.preview_img}
                                        alt = ''
                                        className="bookcover-img"
                                    >
                                    </img>
                                </NavLink>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}


export default SearchResults