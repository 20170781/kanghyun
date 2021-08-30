import React, { FC } from 'react';
import { graphql } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';

import Layout from 'components/UI/templates/Layout';
import BlogPost from 'components/UI/templates/BlogPost';

interface PostTemplateProps {
  pageContext: {
    slug: string;
  };
  data: {
    markdownRemark: {
      html: string;
      frontmatter: {
        title: string;
        summary: string;
        date: string;
        tags: string[];
        thumbnail: {
          publicURL: string;
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
          };
        };
      };
    };
    site: {
      siteMetadata: {
        siteUrl: string;
      };
    };
  };
}

const PostTemplate: FC<PostTemplateProps> = ({
  pageContext: { slug },
  data: {
    markdownRemark: {
      html,
      frontmatter: {
        title,
        summary,
        date,
        tags,
        thumbnail: {
          publicURL,
          childImageSharp: { gatsbyImageData },
        },
      },
    },
    site: {
      siteMetadata: { siteUrl },
    },
  },
}) => {
  const postMetaData = {
    title,
    description: summary,
    image: publicURL,
    url: siteUrl + slug,
  };

  // innerText  offsetTop
  return (
    <Layout {...postMetaData}>
      <BlogPost
        title={title}
        date={date}
        tags={tags}
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
        tags
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
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;
