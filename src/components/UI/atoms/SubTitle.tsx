import React, { FC } from 'react';
import styled from '@emotion/styled';

const SUBTITLE_SIZE_DEFAULT = 1.5;
const SUBTITLE_WEIGHT_DEFAULT = 700;

interface SubTitleType {
  text: string;
  size?: number;
  weight?: number;
}

const StyledSubTitle = styled.h3<Omit<SubTitleType, 'text'>>`
  font-size: ${({ size }) => size}rem;
  font-weight: ${({ weight }) => weight};
`;

const SubTitle: FC<SubTitleType> = ({
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
