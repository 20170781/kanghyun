import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';

import Template from 'components/Common/Template';
import PostHead from 'components/Post/PostHead';
import PostContent from 'components/Post/PostContent';
import CommentWidget from 'components/Post/CommentWidget';
import Toc from 'components/Main/Toc';

interface PostTemplateProps {
  location: {
    href: string;
  };
  data: {
    allMarkdownRemark: {
      edges: [
        {
          node: {
            html: string;
            frontmatter: {
              title: string;
              summary: string;
              date: string;
              categories: string[];
              thumbnail: {
                childImageSharp: {
                  gatsbyImageData: any;
                };
                publicURL: string;
              };
            };
          };
        },
      ];
    };
  };
}

const PostWrapper = styled.div`
  display: flex;
`;

const PostTemplate: FunctionComponent<PostTemplateProps> = ({
  location: { href },
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const {
    node: {
      html,
      frontmatter: {
        title,
        summary,
        date,
        categories,
        thumbnail: {
          childImageSharp: { gatsbyImageData },
          publicURL,
        },
      },
    },
  } = edges[0];

  // innerText  offsetTop
  return (
    <Template title={title} description={summary} url={href} image={publicURL}>
      <PostHead
        title={title}
        date={date}
        categories={categories}
        thumbnail={gatsbyImageData}
      />
      <PostWrapper>
        <PostContent html={html} />
        <Toc />
      </PostWrapper>
      <CommentWidget />
    </Template>
  );
};

export default PostTemplate;

// gatsby-node.js에서 context로 받은 값과 slug가 같은 데이터 출력
export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
          frontmatter {
            title
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              publicURL
              childImageSharp {
                gatsbyImageData(
                  quality: 100
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                  transformOptions: { fit: INSIDE }
                )
              }
            }
          }
        }
      }
    }
  }
`;
