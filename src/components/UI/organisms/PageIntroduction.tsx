import React, { FC } from 'react';
import styled from '@emotion/styled';

import Title from 'components/UI/atoms/Title';
import Text from 'components/UI/atoms/Text';

interface PageIntroductionType {
  pageName: string;
  pageDescription: string;
  backgroundImageURL: string;
}

const HeadWrapper = styled.div<{ backgroundImageURL: string }>`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  background-image: url(${({ backgroundImageURL }) => backgroundImageURL});
  background-size: cover;
  background-position: bottom;
  color: white;

  @media (max-width: 828px) {
    padding: 0 1rem;
  }
`;

const TextWrapper = styled.div`
  padding-top: 200px;
  padding-left: 50px;

  @media (max-width: 828px) {
    padding-top: 180px;
    padding-left: 0;
  }

  & p {
    margin-top: 1rem;

    @media (max-width: 828px) {
      font-size: 1rem;
    }
  }
`;

const PageIntroduction: FC<PageIntroductionType> = ({
  pageName,
  pageDescription,
  backgroundImageURL,
}) => {
  return (
    <HeadWrapper backgroundImageURL={backgroundImageURL}>
      <TextWrapper>
        <Title text={pageName} size={3} />
        <Text content={pageDescription} size={1.2} />
      </TextWrapper>
    </HeadWrapper>
  );
};

export default PageIntroduction;
