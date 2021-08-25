import React from 'react';
import { graphql } from 'gatsby';

import Template from 'components/Common/Template';
import Blog from 'components/UI/templates/Blog';

const Categories = ({
  data: {
    site: {
      siteMetadata: { title, description, siteUrl },
    },
    allFile: { group, totalCount },
    allMarkdownRemark: { edges },
    file: { publicURL },
  },
}) => {
  return (
    <Template
      title={title}
      description={description}
      url={siteUrl}
      image={publicURL}
    >
      <Blog tags={group} totalNum={totalCount} posts={edges} />
    </Template>
  );
};

export default Categories;

export const pageQuery = graphql`
  query ($fieldValue: String) {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allFile(filter: { extension: { eq: "md" } }) {
      group(field: childMarkdownRemark___frontmatter___categories) {
        fieldValue
        totalCount
      }
      totalCount
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
      filter: { frontmatter: { categories: { in: [$fieldValue] } } }
    ) {
      totalCount
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
    }
    file(name: { eq: "basic" }) {
      publicURL
    }
  }
`;
