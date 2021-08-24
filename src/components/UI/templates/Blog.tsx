import React, { FunctionComponent } from 'react';

import TagList from 'components/UI/molecules/TagList';
import PostList, { PostType } from 'components/UI/organisms/PostList';

const Blog = ({ group, totalCount, edges }) => {
  return (
    <>
      <TagList categoryList={group} totalNum={totalCount} />
      <PostList posts={edges} />
    </>
  );
};

export default Blog;
