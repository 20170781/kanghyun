import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

import PostHeadInfo from 'components/UI/molecules/PostHeadInfo';

interface PostHeadType {
  title: string;
  date: string;
  tags: string[];
  image: IGatsbyImageData;
}

const PostHeadWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
`;

// Img 컴포넌트에 기본적으로 적용되어있는 인라인 스타일 때문에 인라인 속성 여기에 작성
const BackgroundImage = styled(GatsbyImage)`
  z-index: -1;
  width: 100%;
  height: 400px;
  object-fit: cover;
  filter: brightness(0.25);
  position: absolute;
`;

const PostHead: FunctionComponent<PostHeadType> = ({
  title,
  date,
  tags,
  image,
}) => {
  return (
    <PostHeadWrapper>
      <BackgroundImage image={image} alt="thumbnail" />
      <PostHeadInfo title={title} date={date} tags={tags} />
    </PostHeadWrapper>
  );
};

export default PostHead;
