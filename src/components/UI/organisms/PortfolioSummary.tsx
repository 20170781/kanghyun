import React, { FC } from 'react';
import styled from '@emotion/styled';

import PortfolioBox from 'components/UI/molecules/PortfolioBox';
import Title from 'components/UI/atoms/Title';

const SummarySection = styled.section`
  width: 100%;
  padding: 6rem 0;
  background-color: white;

  @media (max-width: 828px) {
    padding: 4rem 1rem;
  }
`;

const SummaryWrapper = styled.div`
  max-width: 72rem;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;

  @media (max-width: 828px) {
    & h2 {
      font-size: 1.4rem;
    }
  }
`;

const ContentWrapper = styled.div`
  padding-top: 4rem;

  @media (max-width: 828px) {
    padding-top: 3rem;
  }
`;

const PortfolioBoxes = styled.ul`
  display: flex;
  justify-content: space-between;

  @media (max-width: 828px) {
    flex-direction: column;
  }
`;

const PortfolioSummary: FC = () => {
  return (
    <SummarySection>
      <SummaryWrapper>
        <Title
          text="제가 가진 방향성은 더 나은 세상을 만드는 것입니다."
          size={2}
        />
        <ContentWrapper>
          <PortfolioBoxes>
            <PortfolioBox
              text="성장"
              content="예시) 카카오의 서비스 개발 사례 및 트러블 슈팅 과정에서 얻은 기술과
            노하우를 생생하게 공유합니다. 인공지능, 머신러닝, 챗봇, 클라우드,
            오픈소스, 추천 등 다양한 주제를 다루며, 카카오가 주최하고 참여하는
            기술 행사 소식도 공유합니다."
            />

            <PortfolioBox
              text="꾸준함"
              content="예시) 카카오의 기술과 노하우를 공유하고자 개발자 컨퍼런스와 기술 세미나를
            진행하고 있습니다. 또한 카카오가 제공한 데이터를 활용한 경진대회와
            코드 경진대회를 진행하고 있습니다. 카카오가 주최하는 기술 이벤트
            뿐만 아니라, 후원하거나 참여하는 개발자 커뮤니티, 학회, 학교 등의
            기술 이벤트에 대한 소식도 공유합니다."
            />

            <PortfolioBox
              text="소통"
              content="예시) 카카오의 개발자들이 외부 개발자가 서로 소통하고 배우며 성장하길
            희망합니다. 카카오가 코드를 공개하는 것은 이러한 목표를 달성하기
            위한 시도이며, 개발자 커뮤니티와 함께 코드를 발전시키길 기대합니다."
            />
          </PortfolioBoxes>
        </ContentWrapper>
      </SummaryWrapper>
    </SummarySection>
  );
};

export default PortfolioSummary;
