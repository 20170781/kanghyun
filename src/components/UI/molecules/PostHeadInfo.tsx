import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';

import Title from 'components/UI/atoms/Title';
import Text from 'components/UI/atoms/Text';

export interface PostHeadInfoProps {
  title: string;
  date: string;
  categories: string[];
}

const PostHeadInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 768px;
  height: 100%;
  margin: 0 auto;
  padding: 60px 0;
  color: #ffffff;

  @media (max-width: 768px) {
    width: 100%;
    padding: 40px 20px;
  }

  & > h2 {
    margin-top: auto;
  }
`;

const PostData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const PostHeadInfo: FunctionComponent<PostHeadInfoProps> = ({
  title,
  date,
  tags,
}) => {
  return (
    <PostHeadInfoWrapper>
      <Title text={title} size={2.5} />
      <PostData>
        <Text content={tags.join(' / ')} />
        <Text content={date} />
      </PostData>
    </PostHeadInfoWrapper>
  );
};

export default PostHeadInfo;
