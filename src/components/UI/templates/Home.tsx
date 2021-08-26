import React from 'react';

import HomeBanner from 'components/UI/organisms/HomeBanner';
import PortfolioSummary from 'components/UI/organisms/PortfolioSummary';
import BlogSummary from 'components/UI/organisms/BlogSummary';

const Home = ({ posts, backgroundImageURL }) => {
  return (
    <>
      <HomeBanner backgroundImageURL={backgroundImageURL} />
      <PortfolioSummary />
      <BlogSummary posts={posts} />
    </>
  );
};

export default Home;
