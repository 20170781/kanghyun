import React, { FC } from 'react';
import styled from '@emotion/styled';

import TagList, { TagListType } from 'components/UI/molecules/TagList';
import Text from 'components/UI/atoms/Text';

const TagListWrapper = styled.div`
  min-width: 9rem;
  padding: 1rem 0;

  @media (max-width: 828px) {
    padding: 1rem;
  }

  & > p {
    margin-bottom: 0.5rem;

    @media (max-width: 828px) {
      display: none;
    }
  }
`;

const TagNav: FC<TagListType> = ({ tags, totalNum }) => {
  return (
    <TagListWrapper>
      <Text content="태그 목록" weight={700} />
      <TagList tags={tags} totalNum={totalNum} />
    </TagListWrapper>
  );
};

export default TagNav;
