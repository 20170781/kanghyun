import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import GlobalStyle from 'components/Common/GlobalStyle';
import Introduction from 'components/Main/Introduction';
import Footer from 'components/Common/Footer';
import CategoryList from 'components/Main/CategoryList';
import PostList, {PostType} from 'components/Main/PostList';

const CATEGORY_LIST = {
  All: 5,
  JavaScript: 3,
  TypeScript: 2,
};

interface IndexPageProps {
  data: {
    allMarkdownRemark: {
      edges: PostType[];
    };
  };
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const IndexPage: FunctionComponent<IndexPageProps> = function ({
  data: {
    allMarkdownRemark: { edges },
  },
}) {
  return (
    <Container>
      <GlobalStyle />
      <Introduction />
      <CategoryList selectedCategory="JavaScript" categoryList={CATEGORY_LIST} />
      <PostList posts={edges}/>
      <Footer />
    </Container>
  );
};

export default IndexPage;

export const queryPostList = graphql`
  {
    allMarkdownRemark {
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
  }
`;