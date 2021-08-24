import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';

import Template from 'components/Common/Template';
import Blog from 'components/UI/templates/Blog';

interface BlogPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
        siteUrl: string;
      };
    };
    allMarkdownRemark: {
      edges: PostType[];
      group: any;
    };
    file: {
      publicURL: string;
    };
  };
}

const BlogPage: FunctionComponent<BlogPageProps> = ({
  data: {
    site: {
      siteMetadata: { title, description, siteUrl },
    },
    allMarkdownRemark,
    file: { publicURL },
  },
}: any) => {
  return (
    <Template
      title={title}
      description={description}
      url={siteUrl}
      image={publicURL}
    >
      <Blog {...allMarkdownRemark} />
    </Template>
  );
};

export default BlogPage;

export const queryPostList = graphql`
  query queryPostList {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            categories
            date(formatString: "YYYY.MM.DD.")
            summary
            title
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
      }
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
      totalCount
    }
    file(name: { eq: "basic" }) {
      publicURL
    }
  }
`;
