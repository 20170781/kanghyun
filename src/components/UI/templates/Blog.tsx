import React, { FC } from 'react';
import styled from '@emotion/styled';

import PageIntroduction from 'components/UI/organisms/PageIntroduction';
import PostList, { PostType } from 'components/UI/organisms/PostList';
import TagNav from 'components/UI/organisms/TagNav';
import { TagValueProps } from 'components/UI/molecules/TagList';

export interface BlogTemplateType {
  tags: TagValueProps[];
  totalNum: number;
  posts: PostType[];
  backgroundImageURL: string;
}

const BlogWrapper = styled.div`
  display: flex;
  max-width: 75rem;
  margin-left: auto;
  margin-right: auto;
  padding: 5rem 1rem;

  @media (max-width: 828px) {
    display: block;
  }
`;

const Blog: FC<BlogTemplateType> = ({
  tags,
  totalNum,
  posts,
  backgroundImageURL,
}) => {
  return (
    <>
      <PageIntroduction
        pageName="Blog"
        pageDescription="웹에 대해 공부하고 경험한 내용들을 나눕니다."
        backgroundImageURL={backgroundImageURL}
      />
      <BlogWrapper>
        <TagNav tags={tags} totalNum={totalNum} />
        <PostList posts={posts} />
      </BlogWrapper>
    </>
  );
};

export default Blog;
