import React, { FunctionComponent, useMemo } from 'react';
import { graphql } from 'gatsby';
import queryString, { ParsedQuery } from 'query-string';

import CategoryList, { CategoryListProps } from 'components/Main/CategoryList';
import PostList, { PostType } from 'components/Main/PostList';
import Template from 'components/Common/Template';

interface BlogPageProps {
  location: {
    search: string;
  };
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
    };
    file: {
      publicURL: string;
    };
  };
}

const BlogPage: FunctionComponent<BlogPageProps> = ({
  location: { search },
  data: {
    site: {
      siteMetadata: { title, description, siteUrl },
    },
    allMarkdownRemark: { edges },
    file: { publicURL },
  },
}: any) => {
  const parsed: ParsedQuery<string> = queryString.parse(search);
  const selectedCategory: string =
    typeof parsed.category !== 'string' || !parsed.category
      ? 'All'
      : parsed.category;

  const categoryList = useMemo(
    () =>
      edges.reduce(
        (
          list: CategoryListProps['categoryList'], // acc
          {
            node: {
              frontmatter: { categories }, // cur
            },
          }: PostType,
        ) => {
          categories.forEach((category) => {
            if (category in list) {
              list[category] += 1;
            } else {
              list[category] = 1;
            }
          });
          list.All += 1;
          return list;
        },
        { All: 0 },
      ),
    [],
  );

  return (
    <Template
      title={title}
      description={description}
      url={siteUrl}
      image={publicURL}
    >
      <CategoryList
        selectedCategory={selectedCategory}
        categoryList={categoryList}
      />
      <PostList posts={edges} selectedCategory={selectedCategory} />
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
