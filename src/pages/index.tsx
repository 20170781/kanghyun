import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';

import Template from 'components/Common/Template';
import Home from 'components/UI/templates/Home';

const IndexPage: FunctionComponent = ({
  data: {
    site: {
      siteMetadata: { title, description, siteUrl },
    },
    file: { publicURL },
    allMarkdownRemark: { edges },
  },
}: any) => {
  return (
    <Template
      title={title}
      description={description}
      url={siteUrl}
      image={publicURL}
    >
      <Home posts={edges} />
    </Template>
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
    file(name: { eq: "basic" }) {
      publicURL
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
