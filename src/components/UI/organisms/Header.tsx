import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import PageNav from 'components/UI/molecules/PageNav';

const HeaderWrapper = styled.header`
  position: fixed;
  z-index: 10;
  height: 4rem;
  width: 100%;
  top: 0;
`;

const HeaderList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 10px;
  padding: 0 1rem;
  color: white;
  background-color: ${({ scrollState }) =>
    scrollState === 'header' ? 'none' : 'rgba(0,2,11,.9)'};
`;

const SiteTitle = styled(Link)`
  font-size: 1.7rem;

  @media (max-width: 828px) {
    font-size: 1.5rem;
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
      <HeaderList>
        <SiteTitle to="/">KANGHYUN</SiteTitle>
        <PageNav />
      </HeaderList>
    </HeaderWrapper>
  );
};

export default Header;
