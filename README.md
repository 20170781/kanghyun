## 문제점

- 콘솔 창 에러 2개: `Each child in a list should have a unique "key" prop.`, `Expected server HTML to contain a matching <picture> in <div>`
- index.tsx, PostList.tsx 간의 주고받는 데이터 확인 필요
- gatsby-image 관련 부분 이해도 부족(이걸 써도 contents에 사진 저장하고, md에서 thumbnail에 이미지 url 적어줘야하는지)


- atomic design 적용
- 타입 모두 적용
- semantic web
- ...파라미터 가 뭐징? : fragment??

EmotionJS styled뒤에 함수가 들어오는 것에 대하여 공부
webkit의 이유: 크로스 브라우징 위해서(webkit: 크롬,사파리)

블로그 기획단계부터 다시
첫 페이지 / (About, Portfolio, Blog) 구성?

CategoryList

- 함수 파라미터 타입을 함수 return 타입의 제네릭으로 주느닞?
- return 형태가 이상..?



## 해결 목록

1. GraphQL 설명 파트에서 metadataQuery를 따로 사용한게 없는데 내부 데이터를 가져옴. 
   : 아래와 같이 변수에 Query를 담아주고, 이를 Export 해주면 Gatsby 내부적으로 요청을 보냅니다. 그럼 보낸 요청에 대한 응답으로 데이터를 Props로 전달해줍니다

2. eslint, prettier가 정상작동 x
   ... 오류 내용
   ESLint: Failed to load config "airbnb" to extend from. 
   : airbnb-base를 설치해서 사용중이었는데, .eslintrc.js의 extends에서 airbnb로 설정하고 실행해서 생긴 오류
   ...

3. @emotion/styled, 절대 경로 오류
   : @emotion/styled 라이브러리를 재다운로드, eslintrc.js의 rules에 'import/no-unresolved': 0, 추가

4. GraphiQL은 뭐고, GraphQL이랑 뭐가 다른거지?

   : 사이트의 GraphQL 데이터 레이어에 어떤 데이터가 있는지 쉽게 알 수 있도록 도와주는 브라우저 내 도구가 GraphiQL이다. 이를 이용해 데이터 탐색 및 쿼리 작성을 할 수 있다.

   +원래 GraphQL을 사용하기 위해서는 GraphQL Server가 있고, 스키마를 정해준 후에 resolve 이용해서 데이터를 가져올 수 있는데, Gatsby 내 GraphQL은 파일을 GraphQLd의 Data Layer에 저장하고, GraphQL 쿼리문을 이용해 불러오는 형태로 이루어져있다.

5. graphql`뒤에 query 변수명 {} 하는 이유, sort 안 order, limit은 뭐지?

   : query 변수명 {}은 고유한 쿼리명을 지정할 경우 생기는 것, `sort` 필드를 이용해 GraphQL 쿼리에서 결과의 순서 제어

6. graphql 불러와서 바로 사용 하는 방법은 왜 안쓰는지?

   : 바로 가져와 쓰기 위해서는 `useStaticQuery` hook을 이용해야 한다. 두 가지의 목적이 다르기 때문에 상황에 맞게 사용하면 된다.

   - `useStaticQuery` hook: to pull data into a 'building block' component

   - page query: to pull data into a page component