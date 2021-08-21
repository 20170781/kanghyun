import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { GatsbyImage } from 'gatsby-plugin-image';

import PostHeadInfo, { PostHeadInfoProps } from 'components/Post/PostHeadInfo';

type GatsbyImgProps = {
  gatsbyImageData: any;
  alt: string;
  className?: string;
};

interface PostHeadProps extends PostHeadInfoProps {
  thumbnail: any;
}

const PostHeadWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

// Img 컴포넌트에 기본적으로 적용되어있는 인라인 스타일 때문에 인라인 속성 여기에 작성
const BackgroundImage = styled(GatsbyImage)`
  z-index: -1;
  width: 100%;
  height: 400px;
  object-fit: cover;
  filter: brightness(0.25);
  position: absolute;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const PostHead: FunctionComponent<PostHeadProps> = ({
  title,
  date,
  categories,
  thumbnail,
}) => {
  return (
    <PostHeadWrapper>
      <BackgroundImage image={thumbnail} alt="thumbnail" />
      <PostHeadInfo title={title} date={date} categories={categories} />
    </PostHeadWrapper>
  );
};

export default PostHead;
