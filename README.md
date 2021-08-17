## 문제점 / 궁금한점 / 해야할 일

- list 관련 오류

- IntersectionObserver에 대한 이해

- infinite scroll 완벽 이해

- gatsby-node.js에서 require 쓰는 이유, 수정 후 오류 (The "path" argument must be of type string. Received undefined at validateString)

- 콘솔 창 에러 2개: `Each child in a list should have a unique "key" prop.`, `Expected server HTML to contain a matching <picture> in <div>`

- index.tsx, PostList.tsx 간의 주고받는 데이터 확인 필요

- gatsby-image 관련 부분 이해도 부족(이걸 써도 contents에 사진 저장하고, md에서 thumbnail에 이미지 url 적어줘야하는지)

- gatsby-node.js는 뭐하는 곳인가?

- ProfileImageProps를 적용했는데 any가 계속 뜸(props validation 오류를 해결하기 위해 any를 붙여줬는데, 그것 때문인듯?)

- ...에 대한 이해 : fragment, 조금더 명확하게 이해하기

- gatsby 개발자 모드는 어떻게 실행할까?

- PostHead 부분에 인라인 속성 지정을 위해 !important 속성을 주는 것은 위험하다고 한다. 왜 위험할까?

- PostHead, post_template의 data 타입 오류 (다른곳에서는 문제없음)

- `dangerouslySetInnerHTML` 속성을 이용해 문자열 형태 HTML 코드 가져오는 것에 대한 이해

- Utterances는 script를 모든 Post에 그냥 붙여줘도 자동으로 개별 인식이 되는건가?

- EmotionJS styled뒤에 함수가 들어오는 것에 대하여 공부
  webkit의 이유: 크로스 브라우징 위해서(webkit: 크롬,사파리)

- category 클릭 시, 두 개 이상 표시되는 오류 해결(동작에는 문제x, 새로고침 시에 문제 발생.) 

  -> 원인: node.js 환경에서 url query문을 읽어오지 못한다. 카테고리 선택 방식을 다른 방법으로 구현

- CategoryList

  - 함수 파라미터 타입을 함수 return 타입의 제네릭으로 주느닞?
  - return 형태가 이상..?

- 404.tsx가 js로 변형되지 않는 이유?

  gatsby-config.js에서 'gatsby-plugin-typescript'를 변경해주었더니 해결됨. (구체적인 이해 필요)

- 메타 태그 추가 공부

- Canonical Link Element, Sitemap, robots.txt 추가 이해




- atomic design 적용
- 타입 모두 적용
- 블로그 기획단계부터 다시
  - 첫 페이지 / (About, Portfolio, Blog) 구성?
  - semantic web
  - 블로그 리스트 순서?
  
- 카카오 티스토리는 gatsby, next.js 둘다 안쓰고 구현한듯? 그렇다면 SEO 문제는 어떻게 해결했을까?



## 해결 목록

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

