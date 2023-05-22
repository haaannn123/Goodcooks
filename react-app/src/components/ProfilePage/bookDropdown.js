import React from "react";
import { useSelector } from "react-redux";

const Dropdown = (props) => {
  const bookshelves = useSelector((state) => state.bookshelvesReducer.bookshelves);
  if (props.id === props.dropdown) {
    return (
      <div className="dropdown">
        {Object.values(bookshelves).map((bookshelf) => {
          return <button>{bookshelf.name}</button>;
        })}
      </div>
    );
  } else {
    return null;
  }
};

export default Dropdown;
