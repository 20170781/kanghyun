import React from 'react';
import styled from '@emotion/styled';

const StyledPostText = styled.p`
  font-size: 1rem;
  line-height: 26px;
`;

const PostText = ({ content }) => {
  return <StyledPostText>{content}</StyledPostText>;
};

export default PostText;
