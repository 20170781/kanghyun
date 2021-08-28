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
    markdownRemark: {
      html: string;
      frontmatter: {
        title: string;
        summary: string;
        date: string;
        categories: string[];
        thumbnail: {
          publicURL: string;
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
          };
        };
      };
    };
  };
}

const PostTemplate: FC<PostTemplateProps> = ({
  location: { href },
  data: {
    markdownRemark: {
      html,
      frontmatter: {
        title,
        summary,
        date,
        categories,
        thumbnail: {
          publicURL,
          childImageSharp: { gatsbyImageData },
        },
      },
    },
  },
}) => {
  const postMetaData = {
    title,
    description: summary,
    image: publicURL,
    url: href,
  };

  // innerText  offsetTop
  return (
    <Layout {...postMetaData}>
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
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        categories
        date(formatString: "YYYY.MM.DD.")
        summary
        title
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
`;
