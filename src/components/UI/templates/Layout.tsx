import React, { FunctionComponent, ReactNode } from 'react';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet';

import GlobalStyle from 'components/UI/atoms/GlobalStyle';
import Footer from 'components/UI/organisms/Footer';
import Header from 'components/UI/organisms/Header';

interface LayoutProps {
  title: string;
  description: string;
  url: string;
  image: string;
  children: ReactNode;
}

const Container = styled.main`
  min-height: 100%;
  position: relative;
`;

const Layout: FunctionComponent<LayoutProps> = ({
  title,
  description,
  url,
  image,
  children,
}) => {
  return (
    <>
      <Header />
      <Container>
        <Helmet>
          <title>{title}</title>

          <meta name="description" content={description} />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

          <meta property="og:type" content="website" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={image} />
          <meta property="og:url" content={url} />
          <meta property="og:site_name" content={title} />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={image} />
          <meta name="twitter:site" content="@사용자이름" />
          <meta name="twitter:creator" content="@사용자이름" />

          <meta
            name="google-site-verification"
            content="Ygvyk6ZHJVAD31G3WJYZZ7FnR6c52Rvj1vSMnEMdodk"
          />

          <meta
            name="naver-site-verification"
            content="3276bc339090cbe961b7bd9287890935192b3a63"
          />

          <html lang="ko" />
        </Helmet>

        <GlobalStyle />
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
