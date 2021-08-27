import React, { FC } from 'react';
import { graphql } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';

import Layout from 'components/UI/templates/Layout';
import BlogPost from 'components/UI/templates/BlogPost';

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
                  gatsbyImageData: IGatsbyImageData;
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

const PostTemplate: FC<PostTemplateProps> = ({
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
    <Layout title={title} description={summary} url={href} image={publicURL}>
      <BlogPost
        title={title}
        date={date}
        tags={categories}
        image={gatsbyImageData}
        html={html}
      />
    </Layout>
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
