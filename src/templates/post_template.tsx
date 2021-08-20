import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';

import Template from 'components/Common/Template';
import PostHead from 'components/Post/PostHead';
import PostContent from 'components/Post/PostContent';
import CommentWidget from 'components/Post/CommentWidget';

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
                  fluid: FluidObject;
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
          childImageSharp: { fluid },
          publicURL,
        },
      },
    },
  } = edges[0];

  return (
    <Template title={title} description={summary} url={href} image={publicURL}>
      <PostHead
        title={title}
        date={date}
        categories={categories}
        thumbnail={fluid}
      />
      <PostContent html={html} />
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
                fluid(fit: INSIDE, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;
