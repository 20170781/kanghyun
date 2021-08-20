import React from 'react';
import { graphql } from 'gatsby';

import CategoryList from 'components/Main/CategoryList';
import PostList, { PostType } from 'components/Main/PostList';
import Template from 'components/Common/Template';

const Categories = ({
  pageContext,
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
      <CategoryList categoryList={group} totalNum={totalCount} />
      <PostList posts={edges} />
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
                fluid(
                  maxWidth: 768
                  maxHeight: 200
                  fit: INSIDE
                  quality: 100
                ) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
    file(name: { eq: "profile-image" }) {
      publicURL
    }
  }
`;
