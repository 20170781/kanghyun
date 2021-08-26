import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';

import TagNav from 'components/UI/organisms/TagNav';
import PostList, { PostType } from 'components/UI/organisms/PostList';
import PageIntroduction from '../organisms/PageIntroduction';

const BlogWrapper = styled.div`
  display: flex;
  max-width: 75rem;
  margin-left: auto;
  margin-right: auto;
  padding: 75px 0;
`;

const Blog = ({ tags, totalNum, posts, backgroundImageURL }) => {
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
