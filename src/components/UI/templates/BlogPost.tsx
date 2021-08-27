import React, { FC } from 'react';
import styled from '@emotion/styled';
import { IGatsbyImageData } from 'gatsby-plugin-image';

import PostHead from 'components/UI/organisms/PostHead';
import Markdown from 'components/UI/organisms/Markdown';
import CommentWidget from 'components/UI/organisms/CommentWidget';
import Toc from 'components/UI/molecules/Toc';

interface BlogPostType {
  title: string;
  date: string;
  tags: string[];
  image: IGatsbyImageData;
  html: string;
}

const PostWrapper = styled.div`
  display: flex;
  max-width: 75rem;
  margin-left: auto;
  margin-right: auto;
`;

const BlogPost: FC<BlogPostType> = ({ title, date, tags, image, html }) => {
  return (
    <>
      <PostHead title={title} date={date} tags={tags} image={image} />
      <PostWrapper>
        <Markdown html={html} />
        <Toc />
      </PostWrapper>
      <CommentWidget />
    </>
  );
};

export default BlogPost;
