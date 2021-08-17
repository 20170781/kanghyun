// 페이지 하단 Footer
import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';

const FooterWrapper = styled.footer`
  display: grid;
  place-items: center;
  margin-top: auto;
  padding: 50px 0;
  font-size: 15px;
  text-align: center;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const Footer: FunctionComponent = () => {
  return (
    // eslint-disable-next-line jsx-a11y/accessible-emoji
    <FooterWrapper role="img" aria-labelledby="Smile">
      Thank You for Visiting My Blog, Have a Good Day 😆
      <br />© 2021 Developer KangHyun, Powered By Gatsby.
    </FooterWrapper>
  );
};

export default Footer;
