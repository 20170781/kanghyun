import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';

import TagNav from 'components/UI/organisms/TagNav';
import PostList, { PostType } from 'components/UI/organisms/PostList';

const BlogWrapper = styled.div`
  display: flex;
  max-width: 75rem;
  margin-left: auto;
  margin-right: auto;
  padding: 75px 0;
`;

const Blog = ({ group, totalCount, edges }) => {
  return (
    <BlogWrapper>
      <TagNav tags={group} totalNum={totalCount} />
      <PostList posts={edges} />
    </BlogWrapper>
  );
};

export default Blog;
