import React from 'react';

import HomeBanner from 'components/UI/organisms/HomeBanner';
import PortfolioSummary from 'components/UI/organisms/PortfolioSummary';
import BlogSummary from 'components/Main/BlogSummary';

const Home = ({ posts }) => {
  return (
    <>
      <HomeBanner />
      <PortfolioSummary />
      <BlogSummary posts={posts} />
    </>
  );
};

export default Home;
