import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import TextLoop from 'react-text-loop';

interface HomeBannerType {
  backgroundImageURL: string;
}

const HomeHeadWrapper = styled.div<{ backgroundImageURL: string }>`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-image: url(${({ backgroundImageURL }) => backgroundImageURL});
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

const BannerText = styled.p`
  text-align: center;
  font-size: 2rem;
  font-weight: 800;

  & > span {
    color: #ffffff;
    background-color: rgba(75, 135, 139, 0.9);
  }

  @media (max-width: 828px) {
    font-size: 1.5rem;
  }
`;

const Introduction: FunctionComponent<HomeBannerType> = ({
  backgroundImageURL,
}) => {
  return (
    <HomeHeadWrapper backgroundImageURL={backgroundImageURL}>
      <TextWrapper>
        <TextLoop interval={3000}>
          <BannerText>
            프론트엔드 개발자
            <br />
            <span>이강현</span>입니다
          </BannerText>
          <BannerText>
            <span>끝이 없는 성장</span>을
            <br />
            지향합니다
          </BannerText>
          <BannerText>
            <span>목적</span>을 가진 <span>꾸준함</span>이
            <br />
            제가 가진 최고의 무기입니다
          </BannerText>
          <BannerText>
            무엇이든 <span>함께</span>할 때
            <br />
            즐겁습니다
          </BannerText>
        </TextLoop>
      </TextWrapper>
    </HomeHeadWrapper>
  );
};

export default Introduction;
