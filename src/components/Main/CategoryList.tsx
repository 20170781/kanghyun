// 카테고리 목록
import React, { FunctionComponent, ReactNode } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

export interface CategoryListProps {
  group: {
    [key: string]: number;
  };
}

type CategoryItemProps = {
  active: boolean;
};

type GatsbyLinkProps = {
  children: ReactNode;
  className?: string;
  to: string;
} & CategoryItemProps;

const CategoryListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 768px;
  margin: 100px auto 0;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 50px;
    padding: 0 20px;
  }
`;

// ?
const CategoryItem = styled(Link)`
  margin-right: 20px;
  padding: 5px 0;
  font-size: 18px;
  cursor: pointer;

  &:last-of-type {
    margin-right: 0;
  }

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const CategoryList: FunctionComponent<any> = ({
  categoryList,
  totalNum,
}: any) => {
  return (
    <CategoryListWrapper>
      <CategoryItem to="/blog" key="All">
        #All({totalNum})
      </CategoryItem>
      {categoryList.map(({ fieldValue, totalCount }) => (
        <CategoryItem to={`/blog/${fieldValue}`} key={fieldValue}>
          #{fieldValue}({totalCount})
        </CategoryItem>
      ))}
    </CategoryListWrapper>
  );
};

export default CategoryList;
