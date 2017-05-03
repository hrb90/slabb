import React from 'react';

const SearchBar = ({query, updateQuery, placeholder}) => {
  const changeHandler = e => {
    updateQuery(e.currentTarget.value);
  };

  return (
    <input type="text" value={ query } onChange={ changeHandler }
      placeholder={ placeholder }></input>
  );
};

export default SearchBar;
