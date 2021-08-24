import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import ThumbnailImage from 'components/UI/atoms/ThumbnailImage';
import PostText from 'components/UI/atoms/PostText';
import Title from 'components/UI/atoms/Title';

const PostItemWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  margin: 10px 8px;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  transition: 0.3s box-shadow;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
`;

const PostItemContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  height: 16rem;
  background-color: white;

  & > p {
    padding-top: 20px;
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const PostItem = ({ title, summary, date, thumbnail, link }) => {
  return (
    <PostItemWrapper to={link} className="post">
      <ThumbnailImage imageData={thumbnail} alt="Slide Item Image" />
      <PostItemContent>
        <Title size="1.5" text={title} />
        <PostText limitLine="3" content={summary} />
        <PostText content={date} />
      </PostItemContent>
    </PostItemWrapper>
  );
};

export default PostItem;
