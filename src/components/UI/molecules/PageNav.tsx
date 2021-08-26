import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

const Menu = styled.nav`
  height: 100%;
  display: flex;
  align-items: center;
`;

const MenuList = styled.ul`
  display: flex;
`;

const MenuItem = styled.li`
  list-style: none;
  font-size: 1.1rem;
  font-weight: 500;
  margin-left: 1rem;

  &:hover {
    opacity: 0.6;
  }
`;

const MenuURL = styled(Link)``;

const PageNav = () => {
  return (
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
  );
};

export default PageNav;
