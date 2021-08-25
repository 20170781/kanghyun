import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

const TocWrapper = styled.aside`
  position: sticky;
  margin-top: 90px;
  top: 140px;
  width: 20%;
  height: fit-content;

  @media (max-width: 1200px) {
    display: none;
  } ;
`;

const TocItem = styled.div`
  cursor: pointer;
  font-size: 14px;
  margin: 12px 0;
  color: #b5b5b5;
  font-weight: 700;
`;

const Toc = () => {
  const [contents, setContents] = useState({});

  useEffect(() => {
    setContents(document.querySelectorAll('h1,h2,h3'));
  }, []);

  const contentsArr = Object.entries(contents).map(([key, value]) => {
    return [value.innerText, value.offsetTop];
  });

  const onClickToc = (contentsTop) => {
    if (!contentsTop) {
      return;
    }
    window.scroll({
      left: 0,
      top: contentsTop - 100,
      behavior: 'smooth',
    });
  };

  return (
    <TocWrapper>
      {contentsArr.map(([contentsName, contentsTop]) => (
        <TocItem key={contentsName} onClick={() => onClickToc(contentsTop)}>
          {contentsName}
        </TocItem>
      ))}
    </TocWrapper>
  );
};

export default Toc;
