import React from 'react';
import styled from '@emotion/styled';

const StyledBannerText = styled.span`
  text-align: center;
  font-size: 2rem;
  font-weight: 800;

  @media (max-width: 828px) {
    font-size: 1.5rem;
  }
`;

const BannerText = StyledBannerText;

export default BannerText;
