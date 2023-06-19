import React, { useState } from 'react';
import './SearchBar.css';
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetSearchResults } from '../../store/books';

function SearchBar() {
  const [query, setQuery] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  const results = useSelector(state => state.resultsReducer.results)
  
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!query){
      return
    }
    dispatch(thunkGetSearchResults(query))
    history.push(`/search/${query}`)
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for cookbooks"
        value={query}
        onChange={handleInputChange}
        className="search-input"
      />
      <button type="submit" className="search-button">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
}

export default SearchBar;
