import React from 'react';
import styled from '@emotion/styled';

const TEXT_SIZE_DEFAULT = 1;
const LIMIT_LINE_DEFAULT = 0;
const TEXT_WEIGHT_DEFAULT = 500;

const StyledText = styled.p`
  font-size: ${({ size }) => size}rem;
  font-weight: ${({ weight }) => weight};
  line-height: 26px;
  -webkit-line-clamp: ${({ limitLine }) => limitLine};
  -webkit-box-orient: vertical;
  opacity: 0.8;
  letter-spacing: -0.02em;
  display: -webkit-box;
  overflow: hidden;
`;

const Text = ({
  content,
  size = TEXT_SIZE_DEFAULT,
  weight = TEXT_WEIGHT_DEFAULT,
  limitLine = LIMIT_LINE_DEFAULT,
}) => {
  return (
    <StyledText size={size} weight={weight} limitLine={limitLine}>
      {content}
    </StyledText>
  );
};

export default Text;
