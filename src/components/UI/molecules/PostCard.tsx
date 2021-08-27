import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

import Text from 'components/UI/atoms/Text';
import Title from 'components/UI/atoms/Title';

export interface PostCardType {
  title: string;
  summary: string;
  date: string;
  thumbnail: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
  slug: string;
}

const PostCardWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  transition: 0.3s box-shadow;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
`;

const ThumbnailImage = styled(GatsbyImage)`
  width: 100%;
  height: 10rem;

  @media (max-width: 828px) {
    height: 8rem;
  }
`;

const PostCardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  height: 14rem;
  background-color: white;

  & > p {
    padding-top: 1.2rem;
  }

  @media (max-width: 828px) {
    padding: 1rem;
    height: 12rem;

    & h2 {
      font-size: 1.2rem;
    }

    & p {
      font-size: 0.875rem;
    }
  }
`;

const PostCard: FC<PostCardType> = ({
  title,
  summary,
  date,
  thumbnail: {
    childImageSharp: { gatsbyImageData },
  },
  slug,
}) => {
  return (
    <PostCardWrapper to={slug} className="post">
      <ThumbnailImage image={gatsbyImageData} alt="Slide Item Image" />
      <PostCardContent>
        <Title size={1.5} text={title} />
        <Text limitLine={3} content={summary} />
        <Text content={date} />
      </PostCardContent>
    </PostCardWrapper>
  );
};

export default PostCard;
