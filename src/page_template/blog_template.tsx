import React from 'react';
import { graphql } from 'gatsby';

import Template from 'components/Common/Template';
import Blog from 'components/UI/templates/Blog';

const Categories = ({
  data,
  location: { href },
  pageContext: { fieldValue },
}) => {
  const BlogMetaData = {
    title: 'Blog List',
    description: '개발 블로그 목록',
    image: data.file.publicURL,
    url: href,
  };

  const selectedData = fieldValue ? data.filtered : data.unfiltered;
  return (
    <Template {...BlogMetaData}>
      <Blog
        tags={data.allFile.group}
        totalNum={data.allFile.totalCount}
        posts={selectedData.edges}
      />
    </Template>
  );
};

export default Categories;

export const pageQuery = graphql`
  fragment Data on MarkdownRemark {
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

  query ($fieldValue: String) {
    allFile(filter: { extension: { eq: "md" } }) {
      group(field: childMarkdownRemark___frontmatter___categories) {
        fieldValue
        totalCount
      }
      totalCount
    }

    file(name: { eq: "basic" }) {
      publicURL
    }

    filtered: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
      filter: { frontmatter: { categories: { in: [$fieldValue] } } }
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
