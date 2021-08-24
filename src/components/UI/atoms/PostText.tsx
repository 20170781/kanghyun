import React from 'react';
import styled from '@emotion/styled';

const TEXT_SIZE_DEFAULT = 1;
const LIMIT_LINE_DEFAULT = 0;

const StyledPostText = styled.p`
  font-size: ${({ size }) => size}rem;
  line-height: 26px;
  -webkit-line-clamp: ${({ limitLine }) => limitLine};
  -webkit-box-orient: vertical;
  opacity: 0.8;
  letter-spacing: -0.02em;
  display: -webkit-box;
  overflow: hidden;
`;

const PostText = ({
  content,
  size = TEXT_SIZE_DEFAULT,
  limitLine = LIMIT_LINE_DEFAULT,
}) => {
  return (
    <StyledPostText size={size} limitLine={limitLine}>
      {content}
    </StyledPostText>
  );
};

export default PostText;
