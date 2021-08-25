import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

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
