import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import TextLoop from 'react-text-loop';

import BannerText from 'components/UI/atoms/BannerText';

const BACKGROUND_IMAGE_URL =
  'https://pbs.twimg.com/media/E1oMV3QVgAIr1NT?format=jpg&name=large';

const HomeHeadWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-image: url(${BACKGROUND_IMAGE_URL});
  background-size: cover;
  background-attachment: fixed;
  background-position-x: center;
`;

const TextWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;

  div {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const Introduction: FunctionComponent<any> = () => {
  return (
    <HomeHeadWrapper>
      <TextWrapper>
        <TextLoop interval={3000}>
          <BannerText>
            프론트엔드 개발자
            <br />
            이강현입니다
          </BannerText>
          <BannerText>
            더 나은 세상을
            <br />
            만들기 위해 노력합니다
          </BannerText>
          <BannerText>
            성장하는 모든 과정이
            <br />
            즐겁습니다
          </BannerText>
        </TextLoop>
      </TextWrapper>
    </HomeHeadWrapper>
  );
};

export default Introduction;
