import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

const StyledTag = styled(Link)`
  display: flex;
  font-size: 0.875rem;
  padding-top: 0.25rem;
  line-height: 1.5;
  cursor: pointer;

  &:hover {
    color: pink;
  }

  & > span {
    font-size: 0.875rem;
    padding-left: 0.125rem;
  }

  @media (max-width: 828px) {
    padding-right: 0.75rem;
  }
`;

const Tag = ({ tagName, tagNum, tagLink }) => {
  return (
    <StyledTag to={tagLink}>
      {tagName}
      <span>({tagNum})</span>
    </StyledTag>
  );
};

export default Tag;
