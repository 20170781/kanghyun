import React from 'react';
import styled from '@emotion/styled';

import Title from 'components/UI/atoms/Title';
import Text from 'components/UI/atoms/Text';

const HEIGH_DEFAULT = '400';
const BACKGROUND_IMAGE_URL_DEFAULT =
  'https://res.cloudinary.com/du2sma6fw/image/upload/v1629943639/default_image.jpg';

const HeadWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${({ height }) => height}px;
  overflow: hidden;
  background-image: url(${({ backgroundImageURL }) => backgroundImageURL});
  background-size: cover;
  background-attachment: fixed;
  background-position-x: center;
  color: white;
`;

const TextWrapper = styled.div`
  padding-top: 200px;
  padding-left: 50px;

  & p {
    margin-top: 10px;
  }
`;

const PageIntroduction = ({
  pageName,
  pageDescription,
  height = HEIGH_DEFAULT,
  backgroundImageURL = BACKGROUND_IMAGE_URL_DEFAULT,
}) => {
  return (
    <HeadWrapper height={height} backgroundImageURL={backgroundImageURL}>
      <TextWrapper>
        <Title text={pageName} size="3" />
        <Text content={pageDescription} size="1.2" />
      </TextWrapper>
    </HeadWrapper>
  );
};

export default PageIntroduction;
