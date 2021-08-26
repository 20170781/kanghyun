// 여러 PostCard 묶는 포스트 리스트
import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';

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
          <PostCard {...frontmatter} link={slug} key={id} />
        ),
      )}
    </PostListWrapper>
  );
};

export default PostList;
