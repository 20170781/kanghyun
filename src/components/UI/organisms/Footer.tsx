// 페이지 하단 Footer
import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import Text from 'components/UI/atoms/Text';

const FooterWrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 3rem 5rem;
  margin: 0 auto;
  font-size: 1rem;

  @media (max-width: 828px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem 2em;
  }
`;

const Github = styled(Link)``;

const Footer: FunctionComponent = () => {
  return (
    // eslint-disable-next-line jsx-a11y/accessible-emoji
    <FooterWrapper>
      <Text content="© 2021 이강현 Powered By Gatsby" />
      <Github to="https://github.com/20170781">Github</Github>
    </FooterWrapper>
  );
};

export default Footer;
