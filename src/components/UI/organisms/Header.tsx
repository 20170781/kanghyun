import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import PageNav from 'components/UI/molecules/PageNav';

const HeaderWrapper = styled.header`
  position: fixed;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  width: 100%;
  padding: 0 3%;
  top: 0;
  color: white;
  background-color: ${({ scrollState }) =>
    scrollState === 'header' ? 'none' : 'rgba(0,2,11,.9)'};
`;

const SiteTitle = styled(Link)`
  font-size: xx-large;

  @media (max-width: 768px) {
    font-size: x-large;
  }
`;

const Header = () => {
  const [scrollState, setScrollState] = useState('header');

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const headerClassName =
        window.scrollY > 50 ? 'header_scrolling' : 'header';
      setScrollState(headerClassName);
    });
  }, [scrollState]);

  return (
    <HeaderWrapper scrollState={scrollState}>
      <SiteTitle to="/">KANGHYUN</SiteTitle>
      <PageNav />
    </HeaderWrapper>
  );
};

export default Header;
