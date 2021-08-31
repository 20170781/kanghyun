import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface SeeMoreType {
  text: string;
  to: string;
}

const SeeMoreWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 0.4rem;

  @media (max-width: 828px) {
    margin-right: 0;
  }
`;

const SeeMoreLink = styled(Link)`
  opacity: 0.8;

  & > svg {
    margin-left: 0.4rem;
  }

  &:hover {
    color: rgba(75, 135, 139, 0.9);
  }
`;

const SeeMoreBar: FC<SeeMoreType> = ({ text, to }) => {
  return (
    <SeeMoreWrapper>
      <SeeMoreLink to={to}>
        {text}
        <FontAwesomeIcon icon={faChevronRight} />
      </SeeMoreLink>
    </SeeMoreWrapper>
  );
};

export default SeeMoreBar;
