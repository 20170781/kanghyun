import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const ThumbnailImageStyled = styled(GatsbyImage)`
  width: 100%;
  height: 170px;

  @media (max-width: 768px) {
    height: 140px;
  }
`;

const ThumbnailImage = ({ imageData, alt }) => {
  const image = getImage(imageData);
  return <ThumbnailImageStyled image={image} alt={alt} />;
};

export default ThumbnailImage;
