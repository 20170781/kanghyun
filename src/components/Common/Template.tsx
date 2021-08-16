import React, { FunctionComponent, ReactNode } from 'react';
import styled from '@emotion/styled';

import Footer from 'components/Common/Footer';
import GlobalStyle from 'components/Common/GlobalStyle';

interface TemplateProps {
  children: ReactNode;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Template: FunctionComponent<TemplateProps> = ({ children }) => {
  return (
    <Container>
      <GlobalStyle />
      {children}
      <Footer />
    </Container>
  );
};

export default Template;
