# 💻 개발 블로그 만들기

👀 [https://kanghyun.netlify.app](https://kanghyun.netlify.app/)

🔨 업데이트 진행중입니다



## 🙄 문제점 / 궁금한점

- gatsby-node.js에서 require 쓰는 이유, import 로 수정 시 오류 (The "path" argument must be of type string. Received undefined at validateString)
- 콘솔 창 에러 2개: `Each child in a list should have a unique "key" prop.`, `Expected server HTML to contain a matching <picture> in <div>`
- ProfileImageProps를 적용했는데 any가 계속 뜸(props validation 오류를 해결하기 위해 다른곳에 any를 붙여줬는데, 그것 때문인듯?)
- 메타 태그 추가 공부
- Canonical Link Element, Sitemap, robots.txt 추가 이해
- 카카오 티스토리는 gatsby, next.js 둘다 안쓰고 구현한듯? 그렇다면 SEO 문제는 어떻게 해결했을까?



## 🧐 계획

- [ ] 다크모드 추가
- [ ] Portfolio 구현

- [ ] 전반적인 디자인


- [ ] 타입 적용 (FC와 관련된 버그 해결하기)

  


## 😝 해결 목록

1. GraphQL Query를 변수에 선언 후, 사용하지 않고 props로 내부 데이터를 가져오는 이유('graphql 불러와서 바로 사용 하는 방법은 왜 안쓰는지?'와 통합)
   : graphQL Data를 Gatsby에서 사용하는 방법이 두 가지가 있는데, 변수에 선언 후 해당 변수를 사용하는 방법(useStaticQuery)과 Props로 받아서 사용하는 방법(page query) 두 가지가 있다. 두 방법은 목적이 다르고 상황에 맞게 써야한다.

   - `useStaticQuery` hook: to pull data into a 'building block' component
   
   - page query: to pull data into a page component
   
   아래와 같이 변수에 Query를 담아주고, 이를 Export 해주면 Gatsby 내부적으로 요청을 보냅니다. 그럼 보낸 요청에 대한 응답으로 데이터를 Props로 전달해줍니다
   
2. eslint, prettier가 정상작동 x
   오류 내용) ESLint: Failed to load config "airbnb" to extend from. 
   : airbnb-base를 설치해서 사용중이었는데, .eslintrc.js의 extends에서 airbnb로 설정하고 실행해서 생긴 오류

3. @emotion/styled, 절대 경로 오류
   : @emotion/styled 라이브러리를 재다운로드, eslintrc.js의 rules에 'import/no-unresolved': 0, 추가 (동작에는 문제 없지만, EsLint에서 절대경로를 인식하지 못하는 경우 처리를 해줘야한다.)

4. GraphiQL은 뭐고, GraphQL이랑 뭐가 다른거지?

   : 사이트의 GraphQL 데이터 레이어에 어떤 데이터가 있는지 쉽게 알 수 있도록 도와주는 브라우저 내 도구가 GraphiQL이다. 이를 이용해 데이터 탐색 및 쿼리 작성을 할 수 있다.

   +원래 GraphQL을 사용하기 위해서는 GraphQL Server가 있고, 스키마를 정해준 후에 resolve 이용해서 데이터를 가져올 수 있는데, Gatsby 내 GraphQL은 파일을 GraphQLd의 Data Layer에 저장하고, GraphQL 쿼리문을 이용해 불러오는 형태로 이루어져있다.

5. graphql`뒤에 query 변수명 {} 하는 이유, sort 안 order, limit은 뭐지?

   : query 변수명 {}은 고유한 쿼리명을 지정할 경우 생기는 것, `sort` 필드는 GraphQL 쿼리에서 결과의 순서 제어하는 방법이다.

6. props 받아오는 방법

   : 함수 파라미터에서 graphQL data 구조로 받아와 함수 내에서 사용하거나, 아니면 {data}로 파라미터를 받아오고, 함수 내에서 data.allMarkdownRemak. ... 이런 식으로 사용할 수도 있다. 

7. map과 forEach의 차이점

   : return의 유무와 그에 따른 목적의 차이 발생 (정리 완료)

8. EmotionJS에서 props를 정의할 때 vs 호출할때 (className과 같은 속성은?)

   : props 정의를 호출부분에서 할 수 있고, 해당 props를 정의부분에서 사용할 수 있다. (정리 완료)

9. useCallback vs useMemo

   : useCallback: Returns a [memoized](https://en.wikipedia.org/wiki/Memoization) callback.

     useMemo: Returns a [memoized](https://en.wikipedia.org/wiki/Memoization) value.

   `useCallback(fn, deps)` = `useMemo(() => fn, deps)`  (정리 완료)

10. SSR 오류

    : 원인) IntersectionObserver API는 브라우저 API인데, 프로젝트 빌드 과정은 Node.js 환경에서 진행되기 때문에, IntersectionObserver가 Node.js 환경에서 정상적으로 작동하지 않는 것이다.

    해결방법) React Hook인 useEffect(), useRef()를 활용해 

11. 404.tsx가 js로 변형되지 않는 이유?

    gatsby-config.js에서 'gatsby-plugin-typescript'를 변경해주었더니 해결됨.

12. category 클릭 시, 두 개 이상 표시되는 오류 해결(동작에는 문제x, 새로고침 시에 문제 발생.) 

    -> 원인: node.js 환경에서 url query문을 읽어오지 못한다. 카테고리 선택 방식을 다른 방법으로 구현

    : category를 새로운 방식으로 구현 ([공식 문서](https://www.gatsbyjs.com/docs/adding-tags-and-categories-to-blog-posts/))

13. IntersectionObserver API와 이를 이용한 Infinite-Scroll 이해

    : 정리 완료

14. gatsby-image 라이브러리 관련 이해 부족

    : [gatsby-image](https://www.gatsbyjs.com/plugins/gatsby-image/) 라이브러리는 Gatsby 공식 홈페이지에서 더 이상 사용되지 않는다고 한다. 이에 대안으로 [GatsbyImage](https://www.gatsbyjs.com/docs/tutorial/part-7/ )(gatsby-image-plugin)와 [옵션](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/#image-options)을 사용해 동일한 기능을 구현하도록 만들었다. (정리 완료)
    
15. !important 속성을 주는 것은 위험하다고 한다. 왜 위험할까?

    : CSS 소스 코드를 복잡하게 만들고, 특히 !important를 남발하게 되는 경우 디버깅이 어려워져 권장되지 않는다