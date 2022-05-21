import React, { FC } from 'react';
import styled from '@emotion/styled';

import PortfolioBox from 'components/UI/molecules/PortfolioBox';
import SeeMoreBar from 'components/UI/molecules/SeeMoreBar';

const SummarySection = styled.section`
  width: 100%;
  padding-top: 6rem;
  padding-bottom: 4rem;
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

  & > h2 {
    width: fit-content;
    padding: 0.5rem;
    font-size: 2rem;
    line-height: 1.7;

    @media (max-width: 828px) {
      font-size: 1.4rem;
    }
  }
`;

const ContentWrapper = styled.div`
  padding: 3rem 0;

  @media (max-width: 828px) {
    padding: 2rem 0;
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
        <h2>
          당연했던 불편함들을 IT 서비스를 통해 해결하여 <br /> 더 나은 세상을
          만들고자 합니다.
        </h2>
        <ContentWrapper>
          <PortfolioBoxes>
            <PortfolioBox
              text="성장"
              content="멈춰있기보다는 끝없이 나아가기를 희망합니다. 기술 블로그, 스터디, 개발자 커뮤니티 등을 통해 부족함을 배우고 함께 성장하는 것을 좋아합니다."
            />

            <PortfolioBox
              text="꾸준함"
              content="꾸준함의 진짜 가치는 목적과 함께할 때 생겨납니다. 1일 1커밋 운동과 기술 블로그는 꾸준함의 흔적이며, 이는 더 나은 세상을 만드는 개발자로써 성장하는데 큰 도움이 될 것이라고 확신합니다."
            />

            <PortfolioBox
              text="소통"
              content="개발자에게 협업은 필수적이고, 소통은 기본입니다. 존중을 담은 소통을 통해 협업 능력을 극대화하여 사람들이 원하는 서비스를 만드는 개발자가 되겠습니다."
            />
          </PortfolioBoxes>
        </ContentWrapper>
        <SeeMoreBar text="PORTFOLIO" to="https://kanghyun98.notion.site/" />
      </SummaryWrapper>
    </SummarySection>
  );
};

export default PortfolioSummary;
