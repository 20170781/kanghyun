// 페이지 하단 Footer
import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import Text from 'components/UI/atoms/Text';

const FooterWrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px 0;
  font-size: 15px;
  width: 72rem;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 13px;
    width: 100%;
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
