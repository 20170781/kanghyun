import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import Text from 'components/UI/atoms/Text';
import Title from 'components/UI/atoms/Title';

const PostCardWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  transition: 0.3s box-shadow;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
`;

const ThumbnailImage = styled(GatsbyImage)`
  width: 100%;
  height: 170px;

  @media (max-width: 768px) {
    height: 140px;
  }
`;

const PostCardContent = styled.div`
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

const PostCard = ({ title, summary, date, thumbnail, link }) => {
  const image = getImage(thumbnail);
  return (
    <PostCardWrapper to={link} className="post">
      <ThumbnailImage image={image} alt="Slide Item Image" />
      <PostCardContent>
        <Title size="1.5" text={title} />
        <Text limitLine="3" content={summary} />
        <Text content={date} />
      </PostCardContent>
    </PostCardWrapper>
  );
};

export default PostCard;
