import React from 'react';
import styled from 'styled-components';

const Error = styled.li`
  color: red;
  font-size: 12px;
  text-align: center;
`;

const ErrorList = ({errors}) => {
  return (
    <ul>
      { errors.map((err, idx) => (
          <Error key={ idx }>{ err }</Error>
        )) }
    </ul>
  );
};

export default ErrorList;
