import React, { FC } from 'react';
import styled from '@emotion/styled';

import Layout from 'components/UI/templates/Layout';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
`;

const PortfolioPage: FC = () => {
  return (
    <Layout>
      <Wrapper>
        <h1>제작중입니다!</h1>
      </Wrapper>
    </Layout>
  );
};

export default PortfolioPage;
