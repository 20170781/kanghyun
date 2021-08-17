import { MutableRefObject, useRef, useEffect, useState, useMemo } from 'react';
import { PostType } from 'components/Main/PostList';

export type useInfiniteScrollType = {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  postList: PostType[];
};

const NUMBER_OF_ITEMS_PER_PAGE = 10;

const useInfiniteScroll = (
  selectedCategory: string,
  posts: PostType[],
): useInfiniteScrollType => {
  // 무한 스크롤을 위한 해당 DOM 참조: useRef
  const containerRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);

  // 무한 스크롤을 위한 count 값: useState
  const [count, setCount] = useState<number>(1);

  // 카테고리에 따른 필터링(클릭 시에만 업데이트): useMemo
  const postListByCategory = useMemo<PostType[]>(
    () =>
      posts.filter(
        ({
          node: {
            frontmatter: { categories },
          },
        }: PostType) =>
          selectedCategory !== 'All'
            ? categories.includes(selectedCategory)
            : true,
      ),
    [selectedCategory],
  );

  const observer = useRef<IntersectionObserver>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries, curObserver) => {
      if (!entries[0].isIntersecting) return; // isIntersecting: 노출되었는지 확인

      setCount((value) => value + 1);
      curObserver.disconnect();
    });
  }, [count]); // 뭐 없어도 되는건가?

  // 카테고리 선택 시, count 초기화
  useEffect(() => setCount(1), [selectedCategory]);

  // ref 선택된 component 마지막 값 도달 시
  useEffect(() => {
    if (
      NUMBER_OF_ITEMS_PER_PAGE * count >= postListByCategory.length ||
      containerRef.current === null ||
      containerRef.current.children.length === 0 ||
      observer.current === null
    )
      return;

    observer.current.observe(
      containerRef.current.children[containerRef.current.children.length - 1],
    );
  }, [count, selectedCategory]);

  return {
    containerRef,
    postList: postListByCategory.slice(0, count * NUMBER_OF_ITEMS_PER_PAGE),
  };
};

export default useInfiniteScroll;
