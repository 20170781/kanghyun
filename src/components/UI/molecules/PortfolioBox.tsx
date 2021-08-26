import React from 'react';
import styled from '@emotion/styled';

import SubTitle from 'components/UI/atoms/SubTitle';
import Text from 'components/UI/atoms/Text';

const BoxWrapper = styled.li`
  list-style: none;
  width: 20rem;
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem;

  & > h3 {
    padding-bottom: 1rem;
  }

  @media (max-width: 828px) {
    width: 100%;
    padding-bottom: 2.5rem;

    & > h3 {
      font-size: 1.2rem;
    }
  }
`;

const PortfolioBox = ({ text, content }) => {
  return (
    <BoxWrapper>
      <SubTitle text={text} />
      <Text content={content} />
    </BoxWrapper>
  );
};

export default PortfolioBox;
