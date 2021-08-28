import React, { FunctionComponent, ReactNode } from 'react';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet';

import GlobalStyle from 'components/UI/atoms/GlobalStyle';
import Footer from 'components/UI/organisms/Footer';
import Header from 'components/UI/organisms/Header';

interface LayoutType {
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

const Layout: FunctionComponent<LayoutType> = ({
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
        <Helmet
          htmlAttributes={{
            lang: 'ko',
          }}
          title={title}
          link={
            url
              ? [
                  {
                    rel: 'canonical',
                    href: url,
                  },
                ]
              : []
          }
          meta={[
            {
              name: `description`,
              content: description,
            },
            {
              name: `viewport`,
              content: 'width=device-width, initial-scale=1.0',
            },
            {
              property: `og:title`,
              content: title,
            },
            {
              property: `og:description`,
              content: description,
            },
            {
              property: `og:type`,
              content: `website`,
            },
            {
              property: `og:image`,
              content: image,
            },
            {
              property: `og:url`,
              content: url,
            },
            {
              property: `og:site_name`,
              content: title,
            },
            {
              name: `google-site-verification`,
              content: `Ygvyk6ZHJVAD31G3WJYZZ7FnR6c52Rvj1vSMnEMdodk`,
            },
            {
              name: `naver-site-verification`,
              content: `3276bc339090cbe961b7bd9287890935192b3a63`,
            },
          ]}
        />

        <GlobalStyle />
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
