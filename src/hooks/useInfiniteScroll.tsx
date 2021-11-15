import { MutableRefObject, useRef, useEffect, useState } from 'react';
import { PostType } from 'components/UI/organisms/PostList';

export type useInfiniteScrollType = {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  postList: PostType[];
};

const NUMBER_OF_ITEMS_PER_PAGE = 12;

const useInfiniteScroll = (posts: PostType[]): useInfiniteScrollType => {
  // 무한 스크롤을 위한 해당 DOM 참조: useRef
  const containerRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);

  // 무한 스크롤을 위한 count 값: useState
  const [count, setCount] = useState<number>(1);

  // 프로젝트 빌드가 Node.js 환경에서 빌드됨으로 생기는 오류 해결
  const observer: MutableRefObject<IntersectionObserver | null> =
    useRef<IntersectionObserver>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries, curObserver) => {
      if (!entries[0].isIntersecting) return; // isIntersecting: 노출되었는지 확인

      setCount((value) => value + 1);
      curObserver.disconnect();
    });
  }, [count]); // count만 줘도 괜찮은가?

  // ref 선택된 component 마지막 값 도달 시
  useEffect(() => {
    if (
      NUMBER_OF_ITEMS_PER_PAGE * count >= posts.length ||
      containerRef.current === null ||
      containerRef.current.children.length === 0 ||
      observer.current === null
    )
      return;

    observer.current.observe(
      containerRef.current.children[containerRef.current.children.length - 1],
    );
  }, [count, posts]);

  return {
    containerRef,
    postList: posts.slice(0, count * NUMBER_OF_ITEMS_PER_PAGE),
  };
};

export default useInfiniteScroll;
