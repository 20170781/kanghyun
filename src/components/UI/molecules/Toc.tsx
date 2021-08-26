import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

const TocWrapper = styled.aside`
  position: sticky;
  margin-top: 90px;
  top: 140px;
  width: 20%;
  height: fit-content;
  border-left: 4px solid rgb(233, 236, 239);

  @media (max-width: 1200px) {
    display: none;
  } ;
`;

const TocItem = styled.div`
  cursor: pointer;
  font-size: 0.875rem;
  padding-top: ${({ paddingSize }) => 1.5 - paddingSize}rem;
  padding-left: ${({ paddingSize }) => paddingSize}rem;
  color: #b5b5b5;
  font-weight: 700;

  &:hover {
    color: gray;
  }
`;

const Toc = () => {
  const [contents, setContents] = useState({});

  useEffect(() => {
    setContents(document.querySelectorAll('h2,h3'));
  }, []);

  const contentsArr = Object.values(contents).map((value) => {
    return [value.innerText, value.offsetTop, value.localName];
  });

  const onClickToc = (contentsTop) => {
    if (!contentsTop) {
      return;
    }
    window.scroll({
      left: 0,
      top: contentsTop - 70,
      behavior: 'smooth',
    });
  };

  const separateTocItem = (localName) => {
    const paddingSize = localName === 'h2' ? 0.875 : 1.25;
    return paddingSize;
  };

  return (
    <TocWrapper>
      {contentsArr.map(([contentsName, contentsTop, localName]) => (
        <TocItem
          key={contentsName}
          onClick={() => onClickToc(contentsTop)}
          paddingSize={separateTocItem(localName)}
        >
          {contentsName}
        </TocItem>
      ))}
    </TocWrapper>
  );
};

export default Toc;
