import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';

import Text from 'components/UI/atoms/Text';

export interface PostHeadInfoProps {
  title: string;
  date: string;
  categories: string[];
}

const PostHeadInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  height: 100%;
  margin: 0 auto;
  padding-top: 200px;
  color: #ffffff;

  @media (max-width: 828px) {
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const PostData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;

  @media (max-width: 828px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const BlogTitle = styled.h1`
  font-size: 2.5rem;
  display: -webkit-box;
  overflow: hidden;

  @media (max-width: 828px) {
    font-size: 1.5rem;
  }
`;

const PostHeadInfo: FunctionComponent<PostHeadInfoProps> = ({
  title,
  date,
  tags,
}) => {
  return (
    <PostHeadInfoWrapper>
      <BlogTitle>{title}</BlogTitle>
      <PostData>
        <Text content={tags.join(' / ')} />
        <Text content={date} />
      </PostData>
    </PostHeadInfoWrapper>
  );
};

export default PostHeadInfo;
