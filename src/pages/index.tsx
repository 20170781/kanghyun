import React, { FunctionComponent, useCallback } from 'react';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import queryString, { ParsedQuery } from 'query-string';

import GlobalStyle from 'components/Common/GlobalStyle';
import Introduction from 'components/Main/Introduction';
import { ProfileImageProps } from 'components/Main/ProfileImage';
import Footer from 'components/Common/Footer';
import CategoryList, { CategoryListProps } from 'components/Main/CategoryList';
import PostList, { PostType } from 'components/Main/PostList';

interface IndexPageProps {
  location: {
    search: string;
  };
  data: {
    allMarkdownRemark: {
      edges: PostType[];
    };
    file: {
      childImageSharp: {
        fluid: ProfileImageProps['profileImage'];
      };
    };
  };
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const IndexPage: FunctionComponent<IndexPageProps> = ({
  location: { search },
  data: {
    allMarkdownRemark: { edges },
    file: {
      childImageSharp: { fluid },
    },
  },
}: any) => {
  const parsed: ParsedQuery<string> = queryString.parse(search);
  const selectedCategory: string =
    typeof parsed.category !== 'string' || !parsed.category
      ? 'All'
      : parsed.category;

  const categoryList = useCallback(
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
    <Container>
      <GlobalStyle />
      <Introduction profileImage={fluid} />
      <CategoryList
        selectedCategory={selectedCategory}
        categoryList={categoryList}
      />
      <PostList posts={edges} selectedCategory={selectedCategory} />
      <Footer />
    </Container>
  );
};

export default IndexPage;

export const queryPostList = graphql`
  query queryPostList {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
    ) {
      edges {
        node {
          frontmatter {
            categories
            date
            slug
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
      childImageSharp {
        fluid(maxWidth: 120, maxHeight: 120, fit: INSIDE, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
