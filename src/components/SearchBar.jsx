import React from "react";
import "./styling/SearchBar.css";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

const SearchBar = ({ searchHandler }) => {
  const changeHandler = (e) => {
    searchHandler(e.target.value);
  };
  return (
    <div className="searchBar">
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search for a Recipe"
          onChange={changeHandler}
          className="search-bar"
        />
        <InputGroup.Text className="search-bar-text">Search</InputGroup.Text>
      </InputGroup>
    </div>
  );
};

export default SearchBar;
