// 여러 PostItem 묶는 포스트 리스트
import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { FluidObject } from 'gatsby-image';

import PostItem from 'components/Main/PostItem';
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
      categories: string[];
      thumbnail: {
        childImageSharp: {
          fluid: FluidObject;
        };
      };
    };
  };
}

interface PostListProps {
  selectedCategory: string;
  posts: PostType[];
}

const PostListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  max-width: 72em;
  margin-left: auto;
  margin-right: auto;
  padding: 50px 0 100px;

  @media (max-width: 1200px) {
    padding: 0 16px;
  }
`;

const PostList: FunctionComponent<PostListProps> = ({
  selectedCategory,
  posts,
}) => {
  const { containerRef, postList } = useInfiniteScroll(selectedCategory, posts);

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
          <PostItem {...frontmatter} link={slug} key={id} />
        ),
      )}
    </PostListWrapper>
  );
};

export default PostList;
