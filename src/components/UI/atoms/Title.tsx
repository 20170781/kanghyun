import React from 'react';
import styled from '@emotion/styled';

const TITLE_SIZE_DEFAULT = 1.8;
const TITLE_WEIGHT_DEFAULT = 700;

const StyledTitle = styled.h1`
  font-size: ${({ size }) => size}rem;
  font-weight: ${({ weight }) => weight};
  line-height: 50px;
`;

const TITLE = ({
  text,
  size = TITLE_SIZE_DEFAULT,
  weight = TITLE_WEIGHT_DEFAULT,
}) => {
  return (
    <StyledTitle size={size} weight={weight}>
      {text}
    </StyledTitle>
  );
};

export default TITLE;
