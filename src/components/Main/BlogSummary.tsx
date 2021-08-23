import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import SlideItem from 'components/Main/SlideItem';

const BlogSummaryWrapper = styled.div`
  max-width: 72em;
  margin-left: auto;
  margin-right: auto;
  padding: 100px 0;
  width: 100%;

  @media (max-width: 1200px) {
    padding: 75px 16px;
  }
`;

const Title = styled.h3`
  font-size: 34px;
  padding: 0 8px;

  @media (max-width: 1200px) {
    font-size: 23px;
  }
`;

// 안에 버튼, 슬라이드 리스트
const LatestPostsSlide = styled.div`
  padding: 30px 0;
`;

const PrevButton = styled.button`
  position: absolute;
  top: -20px;
  right: 48px;
  font-size: 25px;
  width: 30px;

  @media (max-width: 768px) {
    visibility: hidden;
  }
`;

const NextButton = styled.button`
  position: absolute;
  top: -20px;
  right: 8px;
  font-size: 25px;
  width: 30px;

  @media (max-width: 768px) {
    visibility: hidden;
  }
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
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerMode: true,
    centerPadding: '0px',
    // autoplay: true,
    // autoplaySpeed: 5000,
  };
  return (
    <BlogSummaryWrapper>
      <Title>Latest Posts</Title>
      <LatestPostsSlide>
        {/* <PrevButton>
          <FontAwesomeIcon icon={faArrowLeft} />
        </PrevButton> */}
        {/* <SlideListWrapper> */}
        <SlideList {...settings}>
          {posts.map(
            ({
              node: {
                id,
                fields: { slug },
                frontmatter,
              },
            }: PostType) => (
              <SlideItem {...frontmatter} link={slug} key={id} />
            ),
          )}
        </SlideList>
        {/* </SlideListWrapper> */}
        {/* <NextButton>
          <FontAwesomeIcon icon={faArrowRight} />
        </NextButton> */}
      </LatestPostsSlide>
    </BlogSummaryWrapper>
  );
};

export default BlogSummary;
