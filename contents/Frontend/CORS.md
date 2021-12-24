---
date: '2021-12-24'
title: 'CORS 이해하기'
tags: ['FrontEnd', 'Study', 'CORS']
summary: 'CORS 동작방식을 이해하고 관련 오류 해결방법 알아보기'
thumbnail: '../thumbnails/thumbnail_cors.jpg'
---



<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/1ebbd07a-def8-4eb2-816f-a2e2a35555f7/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20211224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211224T053236Z&X-Amz-Expires=86400&X-Amz-Signature=da581e677f666e9ee484ac44117fbd2693ffc929a7e0577d16ad006a03145183&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject" alt="img"  />

진행하던 플젝에서 url을 이용해 html 파일을 불러오는 작업을 진행했었는데, 위와 같은 오류가 발생했다. 지난 플젝에서도 CORS 정책과 관련된 오류를 마주친 적이 있었고 이를 해결했지만, 또 다시 마주친 김에 깊게 이해하고 이를 남기고 싶어 글을 쓰게 되었다.



## CORS란?

리소스를 자신의 출처(도메인, 프로토콜, 포트)와 다른 출처에 요청을 보내는 것을 **Cross-Origin Request** 라고 한다. 그리고  Cross-Origin Request를 보내려면 **remote origin에서 전송받은 특별한 헤더(Access-Control-Allow-Origin)**가 필요하다. 만약 해당 헤더를 받지 못한 경우, 브라우저는 보안 상의 이유로 Cross-Origin Request를 차단한다.

이러한 브라우저 상의 정책을 **CORS(Cross-Origin Resource Sharing)** 정책이라고 부른다.

예를 들어, `domain-a.com` 상의 JS 코드에서 `domain-b.com` 에서의 데이터를 요청한 경우, `domain-b.com` 에서 `domain-a.com` 의 요청을 허락해주는 헤더(Access-Control-Allow-Origin)를 전달해주지 않는 경우 위 이미지와 같은 오류가 발생하는 것이다.

<img src="https://user-images.githubusercontent.com/70627979/147323135-4a1ccc04-cf07-44e4-8335-467d84aaa151.png" alt="image" style="zoom: 33%;" />

이미지 출처) https://developer.mozilla.org/ko/docs/Web/HTTP/CORS

> 도메인(domain): naver.com
>
> 오리진(origin): https://www.naver.com/PORT (프로토콜, 도메인, 포트 포함)
>
> origin에 포함된 것들 중 하나라도 다르면 cross-origin



## CORS 동작 방식

CORS는 3가지의 요청 방식(Simple, Preflight, Credentiaed Request)에 따라 다르게 동작한다.



### 1. Simple Request

> 우선 모든 Cross-Origin Request를 보낼 때, request 안에  **`Origin` 헤더를 추가**해야한다. `Origin` 이라는 헤더 명을 보면 알 수 있듯이, 해당 헤더 내용에는 **오리진(프로토콜, 도메인, 포트) 정보**를 담아야 한다.
>
> (추가를 하지 않고 요청을 보내는 경우, `Missing required request header. Must specify one of: origin,x-requested-with` 이라는 오류를 마주칠 수 있다!)

##### 

요청을 보낼 때 [preflight](https://developer.mozilla.org/ko/docs/Glossary/Preflight_request)라는 사전 요청 없이 서버에 바로 request를 보내는 것을 **Simple Request** 라고 한다. 해당 request를 받은 서버는 응답 헤더에 `Access-Control-Allow-Origin`  내용을 포함해서 보내면, 브라우저가 CORS 정책 위반 여부를 검사하는 방식이다.

물론 모든 요청이 이에 해당하지 않고, 아래의 조건을 모두 만족시키는 요청을 Simple Request 라고 부른다.

1. `GET`, `HEAD`, `POST` 메서드 중 하나인 경우

2. 유저 에이전트가 자동으로 설정한 헤더 외에, 수동으로 설정할 수 있는 헤더는 아래뿐이다. 

   (Fetch 명세에서 "CORS-safelisted request-header"로 정의한 헤더)

   - [`Accept`](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Accept) , [`Accept-Language`](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Accept-Language) , [`Content-Language`](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Content-Language) , [`Content-Type`](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Content-Type)

3. `Content-Type` 을 사용하는 경우 `application/x-www-form-urlencoded` , `multipart/form-data` , `text/plain` 값들만 허용된다.



![image](https://user-images.githubusercontent.com/70627979/147328288-8d3630df-b6e5-47b6-90c0-e1a021cc0dce.png)

이미지 출처) https://ko.javascript.info/fetch-crossorigin#ref-354



### 2. Preflight Request

일반적으로 서버에 요청을 보낼 때, 브라우저에서 해당 요청이 안전한 요청인지 확인하기 위해 **사전 요청**을 먼저 보내고, 이후 안전한 요청인 것이 확인되면 본 요청을 서버에 전송한다.

본 요청 이전에 보내는 사전 요청을 [preflight](https://developer.mozilla.org/ko/docs/Glossary/Preflight_request) 라고 하며, `OPTIONS` 라는 HTTP 메서드가 사용된다.

![image](https://user-images.githubusercontent.com/70627979/147367600-1191b37d-a512-490f-bbd0-06ecbef25518.png)

이미지 출처) https://developer.mozilla.org/ko/docs/Web/HTTP/CORS

##### 

이제 Preflight Request에 어떤 내용이 포함되고, 서버에서는 어떻게 응답하는지 알아보자.

Preflight Request에는 `Origin` 뿐만 아니라 사전 요청 이후에 보낼 본 요청에 대한 정보들이 포함되어 있다. 

대표적으로 본 요청에서 **어떤 헤더를 사용할 것인지 알려주는 `Access-Control-Request-Headers`** 와 **어떤 메서드를 사용할 것인지 알려주는 `Access-Control-Request-Method`** 가 있다.

```
Origin: https://foo.example
Access-Control-Request-Method: POST
Access-Control-Request-Headers: X-PINGOTHER, Content-Type
...
```

Preflight Request를 받은 서버에서 해당 내용들을 모두 받을 수 있다면, `Access-Control-Allow-Origin` ,  `Access-Control-Allow-Methods` , `Access-Control-Allow-Headers` 를 포함한 응답을 브라우저로 다시 전송한다.

```
Access-Control-Allow-Origin: http://foo.example
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
Access-Control-Max-Age: 86400  // 다른 preflight request를 보내지 않고 응답을 캐시할 수 있는 시간
```



### 3. Credentialed Request

기본적으로 브라우저가 제공하는 `XMLHttpRequest` 객체나 `fetch` API는 별도의 옵션 없이 브라우저의 쿠키 정보나 인증과 관련된 헤더를 함부로 요청에 포함시키지 않는다.

이때 요청에 브라우저의 쿠키 정보나 인증과 관련된 헤더를 포함시킬 수 있게 해주는 것이 `credentials` 옵션이다.

- credentials 옵션 종류
  - same-origin (default): 같은 출처 간 요청에만 인증 정보 포함
  - include: 모든 요청에 인증 정보 포함
  - omit: 모든 요청에 인증 정보 포함 x

#####  

`credentials: include` 옵션을 사용하여 Cross-Origin Request를 보내 서버로부터 데이터를 받길 원하는 경우, 두 가지를 신경써야 한다.

1. 응답 헤더에는 `Access-Control-Allow-Credentials: true` 가 포함되어 있어야 한다.
2. 응답 헤더의 `Access-Control-Allow-Origin` 의 값에는 `*` 를 사용할 수 없다. (명시적으로 지정 필요)



## CORS 관련 오류 해결 방법

이제 CORS 관련 오류가 떴을 때, 해결할 수 있는 방법들을 알아보자.

### 1. Access-Control-Allow-Origin 설정

응답해주는 서버를 컨트롤 할 수 있는 경우 사용하는 방법으로, `Access-Control-Allow-Origin` 헤더의 값에 현재 요청을 보내는 `Origin`을 추가하여 CORS 정책 상에 문제가 없게 만드는 방법이다.

만약 개발 단계이거나 모든 요청을 서버에서 받아들여도 상관없다면(보안에 취약해짐!) `Access-Control-Allow-Origin: *`로 설정하여도 해결된다.

나는 프론트엔드 서버와 백엔드 서버를 따로 만들었을 때 CORS 관련 오류를 처음 봤었는데, 다음과 같이 해결했었다.

```js
const app = express();
app.use(
  cors({
    origin: true, // 추후에 변경함
    credentials: true,
  })
);
```

NodeJS의 Express를 사용해 백엔드 서버 구축을 했었는데, 개발 단계에서 CORS 관련 설정을 위와 같이 쉽게 할 수 있었다. 그런데 `*` 이 아닌 `true` 값으로 준 이유는 쿠키를 사용했었는데 위에서 말했듯이 CORS 정책 상 `*` 의 값으로 넘겨줄 수 없었고, 이를 해결하기 위해 `true` 값으로 넘겨준 것이다. (사실 이 글을 정리하기 전까지는 왜 안되는지 명확히 몰랐다...ㅎ)



### 2. 프록시 서버로 우회하기

응답해주는 서버를 컨트롤 할 수 없는 경우 사용하는 방법으로 프록시 서버의 활용이 있다.

CORS는 브라우저 정책이다. 즉, 서버에서 서버로 데이터를 요청하는 경우 CORS 정책 관련 문제가 발생하지 않는다는 것이다. 

구체적으로 이야기하자면, `Access-Control-Allow-Origin: *` 로 설정되어 있는 임의의 서버에서 내가 원하는 서버에 데이터를 요청해 가져온 다음 브라우저로 정보를 보내준다면 CORS 정책 관련 오류가 발생하지 않는다는 것이다.

오픈 프록시 서버가 여러개 존재해 사용하는 방법도 있지만, 여러모로 까다로워 프록시 서버를 직접 배포하는 방법도 존재한다.

-  오픈 프록시 서버
  - https://cors-anywhere.herokuapp.com/
  - https://app.cors.bridged.cc/

- 배포
  - 오픈 소스: https://github.com/Rob--W/cors-anywhere/
  - 참고 자료: https://donggov.tistory.com/132





참고자료

- https://ko.javascript.info/fetch-crossorigin
- https://developer.mozilla.org/ko/docs/Web/HTTP/CORS
- https://developer.mozilla.org/ko/docs/Glossary/Preflight_request
- https://evan-moon.github.io/2020/05/21/about-cors/#credentialed-request