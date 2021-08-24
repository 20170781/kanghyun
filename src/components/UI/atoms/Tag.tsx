import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

const StyledTag = styled(Link)`
  font-size: 0.875rem;
  padding-top: 0.25rem;
  line-height: 1.5;
  cursor: pointer;

  &:hover {
    color: pink;
  }
`;

const Tag = ({ tagName, tagNum, tagLink }) => {
  return (
    <StyledTag to={tagLink}>
      {tagName} ({tagNum})
    </StyledTag>
  );
};

export default Tag;
