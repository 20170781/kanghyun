import React from 'react';
import styled from '@emotion/styled';

import SubTitle from 'components/UI/atoms/SubTitle';
import Text from 'components/UI/atoms/Text';

const BoxWrapper = styled.li`
  list-style: none;
  width: 310px;
  display: flex;
  flex-direction: column;

  & > p {
    padding-top: 20px;
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
