import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';

import Template from 'components/Common/Template';
import Introduction from 'components/Main/Introduction';
import PortfolioSummary from 'components/Main/PortfolioSummary';

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
    };
  };
}

const IndexPage: FunctionComponent<IndexPageProps> = ({
  data: {
    site: {
      siteMetadata: { title, description, siteUrl },
    },
    file: { publicURL },
  },
}: any) => {
  return (
    <Template
      title={title}
      description={description}
      url={siteUrl}
      image={publicURL}
    >
      <Introduction />
      <PortfolioSummary />
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
  }
`;
