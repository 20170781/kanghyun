import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

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
  background-color: ${({ scrollState }) =>
    scrollState === 'header' ? 'none' : 'red'};
`;

const SiteTitle = styled(Link)`
  font-size: xx-large;

  @media (max-width: 768px) {
    font-size: x-large;
  }
`;

const Menu = styled.nav``;

const MenuList = styled.ul`
  display: flex;
  justify-content: flex-start;
`;

const MenuItem = styled.li`
  list-style: none;
  font-size: 1rem;
  font-weight: 700;
  margin-right: 22px;
`;

const MenuURL = styled(Link)``;

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
      <Menu>
        <MenuList>
          <MenuItem>
            <MenuURL to="/blog">BLOG</MenuURL>
          </MenuItem>
          <MenuItem>
            <MenuURL to="/portfolio">PORTFOLIO</MenuURL>
          </MenuItem>
        </MenuList>
      </Menu>
    </HeaderWrapper>
  );
};

export default Header;
