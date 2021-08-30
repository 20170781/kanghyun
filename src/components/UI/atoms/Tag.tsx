import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

interface TagType {
  tagName: string;
  tagNum: number;
  tagLink: string;
  tagClicked?: string;
}

const StyledTag = styled(Link)`
  display: flex;
  font-size: 0.875rem;
  padding-top: 0.25rem;
  line-height: 1.5;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &.tag-clicked {
    font-weight: 700;
    color: #4b878b;
  }

  & > span {
    font-size: 0.875rem;
    padding-left: 0.125rem;
  }

  @media (max-width: 828px) {
    padding-right: 0.75rem;
  }
`;

const Tag: FC<TagType> = ({ tagName, tagNum, tagLink, tagClicked }) => {
  const realTagClicked = tagClicked || 'All';
  const isTagClicked = tagName === realTagClicked;

  return (
    <StyledTag to={tagLink} className={`${isTagClicked ? 'tag-clicked' : ''}`}>
      {tagName}
      <span>({tagNum})</span>
    </StyledTag>
  );
};

export default Tag;
