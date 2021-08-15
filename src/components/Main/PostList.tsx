// 여러 PostItem 묶는 포스트 리스트
import React, { FunctionComponent, useCallback } from 'react';
import styled from '@emotion/styled';
import { FluidObject } from 'gatsby-image';

import PostItem from 'components/Main/PostItem';

export interface PostType {
  node: {
    id: string;
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  width: 768px;
  margin: 0 auto;
  padding: 50px 0 100px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 100%;
    padding: 50px 20px;
  }
`;

const PostList: FunctionComponent<PostListProps> = ({
  selectedCategory,
  posts,
}) => {
  const postListData = useCallback<any>(
    posts.filter(
      ({
        node: {
          frontmatter: { categories },
        },
      }: PostType) =>
        selectedCategory !== 'All'
          ? categories.includes(selectedCategory)
          : true,
    ),
    [selectedCategory],
  );

  return (
    <PostListWrapper>
      {postListData.map(({ node: { id, frontmatter } }: PostType) => (
        <PostItem
          {...frontmatter}
          link="<https://www.google.co.kr/>"
          key={id}
        />
      ))}
    </PostListWrapper>
  );
};

export default PostList;
