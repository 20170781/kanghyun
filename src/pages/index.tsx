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
        gatsbyImageData: any;
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
      childImageSharp: { gatsbyImageData },
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
      <Introduction profileImage={gatsbyImageData} />
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
        gatsbyImageData(
          quality: 100
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
          transformOptions: { fit: INSIDE }
          layout: CONSTRAINED
          width: 120
          height: 120
        )
      }
    }
  }
`;
