import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';

import Introduction from 'components/Main/Introduction';
import { ProfileImageProps } from 'components/Main/ProfileImage';
import Template from 'components/Common/Template';

interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
        siteUrl: string;
      };
    };
    file: {
      publicURL: string;
      childImageSharp: {
        fluid: ProfileImageProps['profileImage'];
      };
    };
  };
}

const IndexPage: FunctionComponent<IndexPageProps> = ({
  data: {
    site: {
      siteMetadata: { title, description, siteUrl },
    },
    file: {
      publicURL,
      childImageSharp: { fluid },
    },
  },
}: any) => {
  return (
    <Template
      title={title}
      description={description}
      url={siteUrl}
      image={publicURL}
    >
      <Introduction profileImage={fluid} />
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
    file(name: { eq: "profile-image" }) {
      publicURL
      childImageSharp {
        fluid(maxWidth: 120, maxHeight: 120, fit: INSIDE, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
