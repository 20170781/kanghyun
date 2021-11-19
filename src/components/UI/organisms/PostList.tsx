// 여러 PostCard 묶는 포스트 리스트
import React, { FC } from 'react';
import styled from '@emotion/styled';
import { IGatsbyImageData } from 'gatsby-plugin-image';

import PostCard from 'components/UI/molecules/PostCard';
import useInfiniteScroll from 'hooks/useInfiniteScroll';

export interface PostType {
  node: {
    id: string;
    fields: {
      slug: string;
    };
    frontmatter: {
      title: string;
      summary: string;
      date: string;
      categories?: string[];
      thumbnail: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData;
        };
      };
    };
  };
}

export interface PostListProps {
  posts: PostType[];
}

const PostListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  & > .post {
    width: 30%;
    margin: 1.6%;
  }

  @media (max-width: 828px) {
    & > .post {
      width: 46%;
      margin: 2%;
    }
  }

  @media (max-width: 480px) {
    & > .post {
      width: 100%;
      margin-bottom: 2rem;
    }
  }
`;

const PostList: FC<PostListProps> = ({ posts }) => {
  const { containerRef, postList } = useInfiniteScroll(posts);

  return (
    <PostListWrapper ref={containerRef}>
      {postList.map(
        ({
          node: {
            id,
            fields: { slug },
            frontmatter,
          },
        }: PostType) => (
          <PostCard {...frontmatter} slug={slug} key={id} />
        ),
      )}
    </PostListWrapper>
  );
};

export default PostList;
