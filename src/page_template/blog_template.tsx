import React, { FC } from 'react';
import { graphql } from 'gatsby';

import Layout from 'components/UI/templates/Layout';
import Blog from 'components/UI/templates/Blog';
import { PostType } from 'components/UI/organisms/PostList';
import { TagValueProps } from 'components/UI/molecules/TagList';

const BLOG_BACKGROUND_IMAGE_URL =
  'https://res.cloudinary.com/du2sma6fw/image/upload/v1629942455/blog_image.jpg';

interface BlogType {
  pageContext: {
    fieldValue?: string;
  };
  data: {
    allFile: {
      group: TagValueProps[];
      totalCount: number;
    };
    filtered: {
      edges: PostType[];
    };
    unfiltered: {
      edges: PostType[];
    };
  };
}

const BlogTemplate: FC<BlogType> = ({ pageContext: { fieldValue }, data }) => {
  const BlogMetaData = {
    title: fieldValue ? `blog#${fieldValue} | kanghyun` : 'blog | kanghyun',
    description: '개발 블로그',
    image: BLOG_BACKGROUND_IMAGE_URL,
    url: 'https://kanghyun.netlify.app/blog',
  };

  const selectedData = fieldValue ? data.filtered : data.unfiltered;

  return (
    <Layout {...BlogMetaData}>
      <Blog
        tagClicked={fieldValue}
        tags={data.allFile.group}
        totalNum={data.allFile.totalCount}
        posts={selectedData.edges}
        backgroundImageURL={BLOG_BACKGROUND_IMAGE_URL}
      />
    </Layout>
  );
};

export default BlogTemplate;

export const pageQuery = graphql`
  fragment Data on MarkdownRemark {
    id
    fields {
      slug
    }
    frontmatter {
      title
      summary
      date(formatString: "YYYY.MM.DD.")
      thumbnail {
        childImageSharp {
          gatsbyImageData(
            quality: 100
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
            transformOptions: { fit: INSIDE }
            layout: CONSTRAINED
            width: 768
            height: 200
          )
        }
      }
    }
  }

  query ($fieldValue: String) {
    allFile(filter: { extension: { eq: "md" } }) {
      group(field: childMarkdownRemark___frontmatter___tags) {
        fieldValue
        totalCount
      }
      totalCount
    }

    filtered: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
      filter: { frontmatter: { tags: { in: [$fieldValue] } } }
    ) {
      edges {
        node {
          ...Data
        }
      }
    }

    unfiltered: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
    ) {
      edges {
        node {
          ...Data
        }
      }
    }
  }
`;
