import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const SlideItemWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  margin: 10px 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  transition: 0.3s box-shadow;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
`;

const ThumbnailImage = styled(GatsbyImage)`
  width: 100%;
  height: 200px;

  @media (max-width: 768px) {
    height: 140px;
  }
`;

const PostItemContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Title = styled.div`
  display: -webkit-box;
  overflow: hidden;
  margin-bottom: 3px;
  text-overflow: ellipsis;
  white-space: normal;
  overflow-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 20px;
  font-weight: 700;
`;

const Summary = styled.div`
  display: -webkit-box;
  overflow: hidden;
  margin-top: 16px;
  text-overflow: ellipsis;
  white-space: normal;
  overflow-wrap: break-word;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-size: 16px;
  opacity: 0.8;
  line-height: 26px;
`;

const SlideItem = ({ title, summary, thumbnail, link }) => {
  const image = getImage(thumbnail);
  return (
    <SlideItemWrapper to={link}>
      <ThumbnailImage image={image} alt="Slide Item Image" />
      <PostItemContent>
        <Title>{title}</Title>
        <Summary>{summary}</Summary>
      </PostItemContent>
    </SlideItemWrapper>
  );
};

export default SlideItem;
