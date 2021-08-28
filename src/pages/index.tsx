import React, { FC } from 'react';
import { graphql } from 'gatsby';

import Layout from 'components/UI/templates/Layout';
import Home from 'components/UI/templates/Home';
import { PostType } from 'components/UI/organisms/PostList';

const HOME_BACKGROUND_IMAGE_URL =
  'https://res.cloudinary.com/du2sma6fw/image/upload/v1629941392/home_image.jpg';

interface IndexType {
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
  };
}

const IndexPage: FC<IndexType> = ({
  data: {
    site: {
      siteMetadata: { title, description, siteUrl },
    },
    allMarkdownRemark: { edges },
  },
}) => {
  return (
    <Layout
      title={title}
      description={description}
      url={siteUrl}
      image={HOME_BACKGROUND_IMAGE_URL}
    >
      <Home posts={edges} backgroundImageURL={HOME_BACKGROUND_IMAGE_URL} />
    </Layout>
  );
};

export default IndexPage;

export const queryIndex = graphql`
  query queryIndex {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(
      limit: 9
      sort: { fields: [frontmatter___date, frontmatter___title], order: DESC }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            thumbnail {
              childImageSharp {
                id
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
  }
`;
