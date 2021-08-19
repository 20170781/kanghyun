import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  width: 768px;
  margin: 0 auto;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    padding: 50px 20px;
  }
`;

const SiteTitle = styled(Link)`
  font-size: xx-large;
`;

const Menu = styled.nav``;

const MenuList = styled.ul`
  display: flex;
  justify-content: space-between;
`;

const MenuItem = styled.li`
  list-style: none;
  font-size: 1rem;
  font-weight: 700;
  margin-right: 22px;
`;

const MenuURL = styled(Link)``;

const Header = () => {
  return (
    <HeaderWrapper>
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
