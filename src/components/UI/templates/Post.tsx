import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';

import PostHead from 'components/UI/organisms/PostHead';
import Markdown from 'components/UI/organisms/Markdown';
import CommentWidget from 'components/UI/organisms/CommentWidget';
import Toc from 'components/UI/molecules/Toc';

const PostWrapper = styled.div`
  display: flex;
  max-width: 75rem;
  margin-left: auto;
  margin-right: auto;
`;

const Post = ({ title, date, tags, thumbnail, html }) => {
  return (
    <>
      <PostHead title={title} date={date} tags={tags} thumbnail={thumbnail} />
      <PostWrapper>
        <Markdown html={html} />
        <Toc />
      </PostWrapper>
      <CommentWidget />
    </>
  );
};

export default Post;
