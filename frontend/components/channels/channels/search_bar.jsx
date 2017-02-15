import React from 'react';

const SearchBar = ({query, updateQuery}) => {
  const changeHandler = e => {
    updateQuery(e.currentTarget.value);
  };

  return (
    <input type="text" value={ query } onChange={ changeHandler }></input>
  );
}

export default SearchBar;
