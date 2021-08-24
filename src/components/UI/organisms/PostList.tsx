// 여러 PostItem 묶는 포스트 리스트
import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';

import PostItem from 'components/UI/molecules/PostItem';
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
      thumbnail: any;
    };
  };
}

interface PostListProps {
  posts: PostType[];
}

const PostListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > .post {
    width: 20rem;
    margin: 1rem;
  }

  @media (max-width: 1200px) {
    & > .post {
      width: 46%;
      margin: 2%;
    }
  }
`;

const PostList: FunctionComponent<PostListProps> = ({ posts }) => {
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
          <PostItem {...frontmatter} link={slug} key={id} />
        ),
      )}
    </PostListWrapper>
  );
};

export default PostList;
