import React, { useEffect, useState, FC } from 'react';
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

const TocItem = styled.div<{ paddingSize: number }>`
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

const Toc: FC = () => {
  const [contents, setContents] = useState<Element[]>([]);

  useEffect(() => {
    let collectedElement = Array.from(document.querySelectorAll('h2,h3'));
    
    if (collectedElement.length > 15) { // TOC 사이즈 조절 목적
      collectedElement = Array.from(document.querySelectorAll('h2'));
    }
    setContents(collectedElement);
  }, []);

  const contentsArr = contents.map((value) => {
    return {
      elementTitle: value.innerHTML,
      elementTop: value.offsetTop,
      localName: value.localName,
    };
  });

  const onClickToc = (contentsTop: number) => {
    if (!contentsTop) {
      return;
    }
    window.scroll({
      left: 0,
      top: contentsTop - 70,
      behavior: 'smooth',
    });
  };

  const separateTocItem = (localName: string) => {
    const paddingSize = localName === 'h2' ? 0.875 : 1.25;
    return paddingSize;
  };

  return (
    <TocWrapper>
      {contentsArr.map(({ elementTitle, elementTop, localName }) => (
        <TocItem
          key={elementTitle}
          onClick={() => onClickToc(elementTop)}
          paddingSize={separateTocItem(localName)}
        >
          {elementTitle}
        </TocItem>
      ))}
    </TocWrapper>
  );
};

export default Toc;
