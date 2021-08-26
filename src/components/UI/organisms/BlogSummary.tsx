import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import PostCard from 'components/UI/molecules/PostCard';
import Title from 'components/UI/atoms/Title';

const SummarySection = styled.section`
  width: 100%;
  padding: 6rem 0;
  background-color: #f1f2f4;

  @media (max-width: 828px) {
    padding: 4rem 1rem;
  }
`;

const SummaryWrapper = styled.div`
  max-width: 72rem;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;

  @media (max-width: 828px) {
    & h2 {
      font-size: 1.4rem;
    }
  }
`;

const ContentWrapper = styled.div`
  padding-top: 1.5rem;

  @media (max-width: 828px) {
    padding-top: 1rem;
  }
`;

const SlideList = styled(Slider)`
  position: relative;

  & .slick-arrow {
    position: absolute;
    top: -2.5rem;
    right: 0.1rem;
    left: unset;
    width: 2.5rem;
    height: 2.5rem;

    @media (max-width: 828px) {
      top: -1.5rem;
    }
  }

  & .slick-list {
    @media (max-width: 828px) {
      overflow: unset;
    }
  }

  & .slick-prev {
    right: 2.8rem;
  }

  & .slick-prev:before,
  .slick-next:before {
    color: gray;
    font-size: 2.5rem;
  }

  & .slick-slide {
    padding: 0 0.5rem;
  }
`;

const BlogSummary = ({ posts }) => {
  const settings = {
    infinite: false,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 828,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <SummarySection>
      <SummaryWrapper>
        <Title text="Latest Posts" size="2" />
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
                <PostCard {...frontmatter} link={slug} key={id} />
              ),
            )}
          </SlideList>
        </ContentWrapper>
      </SummaryWrapper>
    </SummarySection>
  );
};

export default BlogSummary;
