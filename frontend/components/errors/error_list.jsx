import React from 'react';

const ErrorList = ({errors}) => (
  <ul className="error-list">
    { errors.map((err, idx) => {
      return (
        <li key={ idx }>
          { err }
        </li>
      )
    }) }
  </ul>
);

export default ErrorList;
