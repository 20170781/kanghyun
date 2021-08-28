import React, { FC } from 'react';
import styled from '@emotion/styled';

import Layout from 'components/UI/templates/Layout';

const PORTFOLIO_BACKGROUND_IMAGE_URL =
  'https://res.cloudinary.com/du2sma6fw/image/upload/v1629943639/default_image.jpg';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
`;

const PortfolioPage: FC = () => {
  const portfolioMetaData = {
    title: 'portfolio | kanghyun',
    description: '포트폴리오',
    image: PORTFOLIO_BACKGROUND_IMAGE_URL,
    url: 'https://kanghyun.netlify.app/portfolio',
  };

  return (
    <Layout {...portfolioMetaData}>
      <Wrapper>
        <h1>제작중입니다!</h1>
      </Wrapper>
    </Layout>
  );
};

export default PortfolioPage;
