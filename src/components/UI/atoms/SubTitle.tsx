import React from 'react';
import styled from '@emotion/styled';

const SUBTITLE_SIZE_DEFAULT = 1.5;
const SUBTITLE_WEIGHT_DEFAULT = 700;

const StyledSubTitle = styled.h2`
  font-size: ${({ size }) => size}rem;
  font-weight: ${({ weight }) => weight};
`;

const SubTitle = ({
  text,
  size = SUBTITLE_SIZE_DEFAULT,
  weight = SUBTITLE_WEIGHT_DEFAULT,
}) => {
  return (
    <StyledSubTitle size={size} weight={weight}>
      {text}
    </StyledSubTitle>
  );
};

export default SubTitle;
