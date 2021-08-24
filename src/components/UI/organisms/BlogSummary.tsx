import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import PostItem from 'components/UI/molecules/PostItem';
import Title from 'components/UI/atoms/Title';

const SummarySection = styled.section`
  width: 100%;
  height: 110vh;
  padding: 100px 0;
  background-color: #f1f2f4;
`;

const SummaryWrapper = styled.div`
  max-width: 72rem;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 1200px) {
    padding: 75px 16px;
  }
`;

const ContentWrapper = styled.div`
  padding-top: 30px;
`;

const SlideList = styled(Slider)`
  overflow-x: clip;
  position: relative;

  .slick-arrow {
    position: absolute;
    top: -20px;
    font-size: 25px;
    right: 8px;
    left: unset;
    width: 40px;
    height: 40px;

    @media (max-width: 768px) {
      visibility: hidden;
    }
  }

  .slick-prev {
    right: 48px;
  }

  .slick-prev:before,
  .slick-next:before {
    color: gray;
    font-size: 40px;
  }
`;

const BlogSummary = ({ posts }) => {
  const settings = {
    infinite: false,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
  };
  return (
    <SummarySection>
      <SummaryWrapper>
        <Title text="Latest Posts" />
        <ContentWrapper>
          <SlideList {...settings}>
            {posts.map(
              ({
                node: {
                  id,
                  fields: { slug },
                  frontmatter,
                },
              }: PostType) => (
                <PostItem {...frontmatter} link={slug} key={id} />
              ),
            )}
          </SlideList>
        </ContentWrapper>
      </SummaryWrapper>
    </SummarySection>
  );
};

export default BlogSummary;
