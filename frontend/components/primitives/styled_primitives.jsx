import React from 'react';
import styled from 'styled-components';

export const MEDIUM_GREEN = "#2AB27B";
export const DARKER_GREEN = "#20865D";

export const Button = styled.button`
  background-color: ${MEDIUM_GREEN};
  color: white;
  border: none;
  height: 40px;
  font-weight: 600;

  &:hover {
    border-bottom: 2px solid ${DARKER_GREEN};
    cursor: pointer;
  }
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FlexEndContainer = styled.div`
  align-self: flex-end;
`;

export const CenteredHeader = styled.h1`
  text-align: center;
`;

export const CenteredParagraph = styled.p`
  text-align: center;
`;
