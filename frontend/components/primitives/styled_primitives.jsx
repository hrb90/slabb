import React from 'react';
import styled from 'styled-components';

export const MEDIUM_GREEN = "#2AB27B";
export const DARKER_GREEN = "#20865D";

export const Button = styled.button`
  background-color: ${MEDIUM_GREEN};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: ${ props => props.fontSize || "inherit"};
  font-weight: 600;
  height: 40px;
  width: ${ props => props.width };

  &:hover {
    border-bottom: 2px solid ${DARKER_GREEN};
    cursor: pointer;
  }
`;

export const FlexRow = styled.div`
  display: flex;
  align-items: ${ props => props.alignItems || "stretch" };
  width: ${ props => props.width || "auto" };
  height: ${ props => props.height || "auto" };
`;

export const FlexColumn = styled(FlexRow)`
  flex-direction: column;
`;

export const FlexStartContainer = styled.div`
  align-self: flex-start;
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
