import React from 'react';
import styled from '@emotion/styled';

const TITLE_SIZE_DEFAULT = 1.8;
const TITLE_WEIGHT_DEFAULT = 700;
const LIMIT_LINE_DEFAULT = 2;

const StyledTitle = styled.h2`
  font-size: ${({ size }) => size}rem;
  font-weight: ${({ weight }) => weight};
  -webkit-line-clamp: ${({ limitLine }) => limitLine};
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
`;

const Title = ({
  text,
  size = TITLE_SIZE_DEFAULT,
  weight = TITLE_WEIGHT_DEFAULT,
  limitLine = LIMIT_LINE_DEFAULT,
}) => {
  return (
    <StyledTitle size={size} weight={weight} limitLine={limitLine}>
      {text}
    </StyledTitle>
  );
};

export default Title;
