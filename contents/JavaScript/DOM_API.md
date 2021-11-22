---
date: '2021-11-22'
title: 'DOM API | JavaScript'
tags: ['JavaScript', 'Study']
summary: '간단한 DOM 구조와 DOM API 이해하기'
thumbnail: '../thumbnails/thumbnail_DOM_API.jpg'
---

브라우저의 렌더링 엔진은 HTML 문서를 파싱하여 브라우저가 이해할 수 있는 자료구조인 DOM을 생성한다.

DOM(Document Object Model)은 HTML 문서의 계층적 구조와 정보를 표현하며 이를 제어할 수 있는 API, 즉 프로퍼티와 메서드를 제공하는 트리 자료구조이다.

## 1. 노드

DOM은 노드 객체의 계층적인 구조로 구성된다. 노드 객체는 종류가 있고 상속 구조를 갖는데, 핵심 노드 타입 4가지를 아래 코드와 함께 알아보자.

```html
<div class="attribute_node">텍스트 노드</div>
```

- Document Node (문서 노드)

  : DOM 트리의 최상위에 존재하는 루트 노드로서 document 객체를 가리킨다.

  → document 객체는 HTML 문서 전체를 가리키는 객체

- Element Node (요소 노드)

  : HTML 요소를 가리키는 객체

  → 위 코드에서 `div`

- Attribute Node (어트리뷰트 노드)

  : HTML 요소의 attribute를 가리키는 객체. attribute가 지정된 HTML 요소의 요소 노드와 연결되어 있음

  → 위 코드에서 `class="attribute_node"`

- Text Node (텍스트 노드)

  : HTML 요소의 text를 가리키는 객체. 요소 노드의 자식 노드이며, 자식 노드를 가질 수 없는 리프 노드(leaf node)이다.

  → 위 코드에서 `텍스트 노드`



## 2. Element Node(요소 노드) 탐색

HTML의 구조나 내용 또는 스타일 등을 동적으로 조작하려면 먼저 요소 노드를 얻어야 한다. 텍스트 노드는 요소 노드의 자식 노드이고, 어트리뷰트 노드도 요소 노드와 연결되어 있기 때문에 이들을 조작하기 위해서도 마찬가지다.

### 2.1 Element Node(요소 노드)를 탐색하는 메서드 리스트

- `Document.prototype.getElementById()` : id를 이용

- `Document.prototype/Element.prototype.getElementsByTagName()` : 태그 이름을 이용

  - HTMLCollection 객체 반환

  - Document.prototype.getElementsByTagName()은 DOM 전체에서, Element.prototype.getElementsByTagName()은 특정 요소 노드의 자손 노드에서 탐색한다.

    (앞으로 Document.prototype/Element.prototype 으로 표현된 것들은 모두 같은 방식으로 동작한다.)

- `Document.prototype/Element.prototype.getElementsByClassName()`: class 값 이용

  - 인수로 전달할 class 값은 공백으로 구분하여 여러 개의 class 지정 가능
  - HTMLCollection 객체 반환

- `Document.prototype/Element.prototype.querySelector()`: CSS 선택자를 이용

  - 하나의 요소 노드를 탐색해서 반환

  - 모든 요소를 탐색하길 원하면 

    ```
    Document.prototype/Element.prototype.querySelectorAll()
    ```

     사용

    - `querySelectorAll` 메서드는 NodeList 객체 반환

  - 인수로 전달한 CSS 선택자를 만족시키는 요소 노드가 존재하지 않으면 `null` 반환



### 2.2 HTMLCollection과 NodeList

HTMLCollection과 NodeList는 DOM API가 여러 개의 결과값을 반환하기 위한 DOM 컬렉션 객체다.

두 가지 모두 유사 배열 객체이면서 iterable이다. 따라서 `for ... of` 문으로 순회할 수 있으며, 스프레드 문법을 사용해 배열로 변환시킬 수 있다.

`getElementsByTagName`, `getElementsByClassName` 메서드가 반환하는 HTMLCollection 객체는 **노드 객체의 상태 변화를 실시간으로 반영**하는 살아 있는 DOM 컬렉션 객체다. 따라서 HTMLCollection 객체를 for 문으로 순회하면서 노드 객체의 상태를 변경해야 할 때 주의해야 한다.

```jsx
// HTML
<ul id="test">
	<li class="red">1번</li>
	<li class="red">2번</li>
	<li class="red">3번</li>
</ul>

// CSS
.red {color: red;}
.blue {color: blue;}

// JavaScript
const $nodes = document.getElementByClassName('red');
console.log($nodes);  // HTMLCollection(3) [li.red, li.red, li.red]

for (let i = 0; i < $nodes.length; i++) {
  $nodes[i].className = 'blue';
}

console.log($nodes);  // HTMLCollection(1) [li.red]

// 화면
- 1번  // 파란색
- 2번  // 빨간색
- 3번  // 파란색
```

`querySelectorAll` 메서드가 반환하는 NodeList 객체는 실시간으로 노드 객체의 상태 변경을 반영하지 않는 객체다. 하지만 `childNodes` 프로퍼티가 반환하는 NodeList 객체는 HTMLCollection와 같이 live 객체로 동작하므로 주의해야 한다.

따라서 안전하게 DOM 컬렉션을 사용하려면, **HTMLCollection과 NodeList 객체를 배열로 변환하여 사용**하는 것을 권장한다.



## 3. 자식, 부모, 형제 노드 탐색

### 3.1 자식 노드 탐색 프로퍼티

**(요소 노드만)**

- `Element.prototype.children`: 자식 노드 중 요소 노드만 탐색하여 HTMLCollection에 담아 반환
- `Element.prototype.firstElementChild`: 첫 번째 자식 노드 반환
- `Element.prototype.lastElementChild`: 마지막 자식 노드 반환
- `Element.prototype.childElementCount`: 자식 노드 중 요소 노드 개수 확인 (이걸 이용해 존재 확인 가능)



(텍스트 노드 or 요소 노드)

- `Node.prototype.childNodes`: 자식 노드 모두 탐색하여 NodeList에 담아 반환
- `Node.prototype.firstChild`: 첫 번째 자식 노드 반환
- `Node.prototype.lastChild`: 마지막 자식 노드 반환
- `Node.prototype.hasChildNodes`: 자식 노드 존재 확인 (메서드)



### 3.2 부모 노드 탐색 프로퍼티

- `Node.prototype.parentNode`



### 3.3 형제 노드 탐색 프로퍼티

**(요소 노드만)**

- `Element.prototype.previousElementSibling`: 형제 노드 중 자신의 이전 형제 요소 노드 반환
- `Element.prototype.nextElementSibling`: 형제 노드 중 자신의 다음 형제 요소 노드 반환



(텍스트 노드 or 요소 노드)

- `Node.prototype.previousSibling`: 형제 노드 중 자신의 이전 형제 노드 반환
- `Node.prototype.nextSibling`: 형제 노드 중 자신의 다음 형제 노드 반환



## 4. Element Node(요소 노드)의 텍스트 조작

### 4.1 textContent

`Node.prototype.textContent` 프로퍼티는 **요소 노드와 모든 자손의 텍스트 콘텐츠를** 표현한다.

즉, 요소 노드의 textContent 프로퍼티를 참조하면 요소 노드의 시작 태그와 종료 태그 사이의 콘텍츠 영역 내의 모든 텍스트를 반환한다. (HTML 마크업 무시)

```jsx
// HTML
<div id="test">Hello <span>World!</span></div>

// JavaScript
console.log(document.getElementById('test').textContent)  // Hello World!
```



### 4.2 innerText

Node.prototype.innerText 프로퍼티는 **요소 노드와 모든 자손의 렌더링 된 텍스트 콘텐츠**를 표현한다. `Node.prototype.textContent` 프로퍼티와 유사하지만, 렌더링 후의 모습을 인식할 수 있다는 점에서 차이점을 갖는다.

렌더링 후의 모습을 인식할 수 있다는 것은 CSS가 반영된 결과를 인식할 수 있다는 것인데, `<br>` 태그를 인식하고 숨겨진 요소(`visibility: hidden;` 등)를 무시한다.



아래는 [MDN에 나와있는 예시 코드](https://developer.mozilla.org/ko/docs/Web/API/HTMLElement/innerText)이다.

```js
// HTML
<h3>원본 요소:</h3>
<p id="source">
  <style>#source { color: red; }</style>
아래에서<br>이 글을<br>어떻게 인식하는지 살펴보세요.
  <span style="display:none">숨겨진 글</span>
</p>
<h3>textContent 결과:</h3>
<textarea id="textContentOutput" rows="6" cols="30" readonly>...</textarea>
<h3>innerText 결과:</h3>
<textarea id="innerTextOutput" rows="6" cols="30" readonly>...</textarea>
// JavaScript
// console.log 결과
const $element = document.getElementById('source');

console.log($element.textContent);
'\n  #source { color: red; }\n아래에서이 글을어떻게 인식하는지 살펴보세요.\n  숨겨진 글\n'

console.log($element.innerText);
'아래에서\n이 글을\n어떻게 인식하는지 살펴보세요.'

// 실제로 어떻게 보이는지는 링크에 들어가서 확인!
const source = document.getElementById('source');
const textContentOutput = document.getElementById('textContentOutput');
const innerTextOutput = document.getElementById('innerTextOutput');

textContentOutput.innerHTML = source.textContent;
innerTextOutput.innerHTML = source.innerText;
```

`innerText`는 CSS를 고려해야 하므로 `textContent` 프로퍼티보다 느리다.



### 4.3 nodeValue

`Node.prototype.nodeValue` 프로퍼티는 텍스트 노드의 텍스트를 반환한다. 즉, 텍스트 노드에 직접 접근해서 가져오는 방식으로 다른 노드 객체의 nodeValue 프로퍼티를 참조하면 null을 반환한다.



## 5. DOM 조작

DOM 조작은 새로운 노드를 생성하여 DOM에 추가하거나 기존 노드를 삭제 또는 교체하는 것을 말한다. DOM 조작은 새로운 노드가 추가 및 삭제되면 리플로우와 리페인트가 발생해 성능에 영향을 주므로 **성능 최적화를 위해 주의**해야 한다.



### 5.1 innerHTML

`Element.prototype.innerHTML` 프로퍼티는 요소 노드의 HTML 마크업을 취득하거나 변경할 수 있다. 즉, 요소 노드의 시작 태그와 종료 태그 사이의 컨텐츠 영역 내에 포함된 **모든 HTML 마크업을 문자열로 반환**한다.

```jsx
// HTML
<div id="test">Hello <span>World!</span></div>

// JavaScript
console.log(document.getElementById('test').innerHTML)  
// => 'Hello <span>World!</span>'
```



요소 노드의 `innerHTML` 프로퍼티에 문자열을 할당하면, 요소 노드의 모든 자식 노드가 제거되고 할당한 문자열에 포함되어 있는 HTML 마크업이 파싱되어 요소 노드의 자식 노드 DOM에 반영된다.

```jsx
// HTML
<div id="test">Hello <span>World!</span></div>

// JavaScript
document.getElementById('test').innerHTML = 'Hi <span>World!</span>'

// 결과
<div id="test">Hi <span>World!</span></div>
```



아래는 innerHTML 프로퍼티의 문제점 3가지를 정리하였다.

1. 사용자로부터 입력받은 데이터를 그대로 `innerHTML` 프로퍼티에 할당하는 것은 **크로스 사이트 스크립팅 공격(XSS: Cross-Site Scripting Attacks)**에 취약해지므로 위험하다. (ex. `input` 태그를 이용)

   ```jsx
   document.getElementById('test').innerHTML = '<img src="x" onerror="alert(document.cookie)">'
   ```

2. `innerHTML` 프로퍼티에 HTML 마크업 문자열을 할당하면, 기존의 자식 노드까지 모두 제거하고 처음부터 새롭게 자식 노드를 생성하여 DOM에 반영한다.

3. innerHTML 프로퍼티는 새로운 요소를 삽입할 때, 삽입될 위치를 지정할 수 없다.

→ 1번 문제점은 DOMPurify 라이브러리를 이용해 방지할 수 있고, 2, 3번의 문제점은 `c`를 사용해 해결할 수 있다.



### 5.2 insertAdjacentHTML

`Element.prototype.insertAdjacentHTML(position, DOMString)` 메서드는 **기존 요소를 제거하지 않으면서 원하는 위치를 지정해 새로운 요소를 삽입**할 수 있다.

- 첫 번째 인수: 생성한 노드를 전달할 위치, 아래 4가지만 가능
  - 'beforebegin': 시작 태그 앞
  - 'afterbegin': 시작 태그 뒤
  - 'beforeend': 종료 태그 앞
  - 'afterend': 종료 태그 뒤
- 두 번째 인수: HTML 마크업 문자열(DOMString)



### 5.3 노드 생성 및 추가

위에서 살펴본 `innerHTML` 프로퍼티와 `insertAdjacentHTML()` 메서드는 **HTML 마크업 문자열을 파싱**하여 노드를 생성하고 삽입했다. DOM은 노드를 **직접** 생성/삽입/삭제/치환하는 메서드를 제공하니 알아보자.

#### 5.3.1 요소 노드 생성

`Document.prototype.createElement('tagName')` 메서드는 요소 노드를 생성해서 반환한다.

```jsx
const $li = document.createElement('li');  // 요소 노드 생성 (li 태그)
```

요소 노드에 텍스트를 추가하는 방법은

1. `Document.prototype.createTextNode()` 메서드를 사용해 텍스트 노드를 생성하고, `Node.prototype.appendChild()` 메서드를 이용해 텍스트 노드를 요소 노드의 자식 노드로 추가할 수 있다.
2. 자식 노드가 하나도 없는 경우에는 `textContent` 나 `innerText` 프로퍼티를 이용해 직접 추가할 수 있다.

```jsx
const $li = document.createElement('li');  // 요소 노드 생성 (li 태그)

// 방법1: 텍스트 노드 생성 및 자식 노드로 추가
const $text = document.createText('test2');
$li.appendChild($text);

// 방법2: 직접 추가
$li.textContent = 'test2';  // or $li.innerText = 'test2'
```



#### 5.3.2 노드를 DOM에 추가

위에서 언급한 `Node.prototype.appendChild(childNode)` 메서드를 사용해 인수로 전달한 노드를 `appendChild` 메서드를 호출한 노드의 마지막 자식 요소로 추가할 수 있다.

위치를 지정해 추가하고 싶다면 `Node.prototype.insertBefore(newNode, childNode)` 메서드를 사용하면 된다.

→ 첫 번째 인수로 전달받은 노드를 두 번째 인수로 전달받은 노드 앞에 삽입

노드를 DOM에 추가하면 리플로우와 리페인트가 발생하므로, 복수의 노드 생성 및 추가시에 유의해야 한다.

```jsx
// HTML
<ul id="list">
	<li>test1</li>
</ul>

// JavaScript
const $ul = document.getElementById('list');

const $li = document.createElement('li');
$li.innerText = 'test2';

$ul.appendChild($li);  // $li 요소 노드를 $ul 요소 노드의 마지막 자식 노드로 추가

// 결과
<ul id="list">
	<li>test1</li>
	<li>test2</li>
</ul>
```



#### 5.3.3 복수의 노드 생성과 추가

```jsx
// HTML
<ul id="list"></ul>

// JavaScript
const $ul = document.getElementById('list');

['test1', 'test2', 'test3'].forEach(text => {
	const $li = document.createElement('li'); // 1. 요소 노드 생성
	$li.innerText = text;  // 2. 텍스트 추가
	$ul.appendChild($li);  // 3. $li 요소 노드를 $ul 요소 노드의 마지막 자식 노드로 추가
});
```

위 코드는 3개의 요소 노드를 생성하고 DOM에 3번 추가하므로 DOM이 3번 변경되어 효율적이지 못하다. 이 코드를 효율적으로 변경하기 위해 `DocumentFragment` 노드를 컨테이너 요소로 활용해 DOM이 1번만 변경되도록 만들 수 있다.

```jsx
// HTML
<ul id="list"></ul>

// JavaScript
const $ul = document.getElementById('list');
const $fragment = document.createDocumentFragment();

['test1', 'test2', 'test3'].forEach(text => {
	const $li = document.createElement('li');
	$li.innerText = text;
	$fragment.appendChild($li);  // $li 요소 노드를 $fragment에 추가
});

$ul.appendChild($fragment);
```



#### 5.3.4 노드 이동

DOM에 이미 존재하는 노드를 `appendChild`, `insertBefore` 메서드를 사용해 DOM에 다시 추가하면 현재 위치에서 노드를 제거하고 새로운 위치에 노드를 추가한다. 즉, 이동한다.

```jsx
// HTML
<ul id="list">
	<li>test1</li>
	<li>test2</li>
</ul>

// JavaScript
const $ul = document.getElementById('list');

const [$test1, $test2] = $ul.children;

$ul.appendChild($test1);  // $test1 요소 노드를 마지막 자식 노드로 이동

// 결과
<ul id="list">
	<li>test2</li>
	<li>test1</li>
</ul>
```



#### 5.3.5 노드 복사

`Node.prototype.cloneNode()` 메서드는 노드의 사본을 생성하여 반환한다. 인수로 `true`를 전달하면 깊은 복사, `false` 전달 및 생략 시 얕은 복사하여 사본 생성한다.

얕은 복사로 생성된 요소 노드는 자손 노드를 복사하지 않았으므로 텍스트 노드도 없다.



#### 5.3.6 노드 교체

`Node.prototype.replaceChild(newChild, oldChild)` 메서드는 메서드를 호출한 노드의 인수로 전달한 자식 노드를 다른 노드로 교체한다.



#### 5.3.7 노드 삭제

`Node.prototype.removeChild(child)` 메서드는 메서드를 호출한 노드의 인수로 전달한 자식 노드를 삭제한다.



## 6. Attribute(속성)

HTML 요소는 여러 개의 attribute(속성, 이하 어트리뷰트)를 가질 수 있다.

글로벌 어트리뷰트(id, class, title, style 등)와 이벤트 핸들러 어트리뷰트(onclick, onchange, onfocus 등)는 모든 HTML 요소에서 공통적으로 사용되고, 특정 HTML 요소에만 사용 가능한 어트리뷰트도 있다.

요소 노드의 모든 어트리뷰트 노드는 `Element.prototype.attributes` 프로퍼티로 확인할 수 있다.

- 읽기 전용
- NamedNodeMap 객체(유사배열객체) 반환

`Element.prototype.getAttribute/setAttribute()` 메서드를 사용해 HTML 어트리뷰트 값을 취득 및 변경할 수 있다.



HTML 어트리뷰트는 **어트리뷰트 노드**와 **DOM 프로퍼티** 두 군데에서 관리된다.

- HTML 어트리뷰트로 지정한 **HTML 요소의 초기 상태**는 어트리뷰트 노드에서 관리
- 사용자가 입력한 **최신 상태**는 HTML 어트리뷰트에 대응하는 요소 노드의 DOM 프로퍼티가 관리

```jsx
// HTML
<input id="user" type="text" value="입력">

// JavaScript
const $input = document.getElementById('user');

$input.oninput = () => {
	console.log('value 프로퍼티 값', $input.value);  // 최신값
}

console.log('value 어트리뷰트 값', $input.getAttribute('value')); // 초기값
```



##### HTML 어트리뷰트와 DOM 프로퍼티의 대응 관계

- id 어트리뷰트와 `id` 프로퍼티는 대응, 동일한 값으로 연동
- input 요소의 value 어트리뷰트는 `value` 프로퍼티와 대응, value 어트리뷰트는 초기값 / value 프로퍼티는 최신 상태
- class 어트리뷰트는 `className`, `classList` 프로퍼티와 대응
- for 어트리뷰트는 `htmlFor` 프로퍼티와 대응



##### 클래스 조작

- `Element.prototype.classList`: class 어트리뷰트의 정보를 담은 DOMTokenList 객체(유사배열객체) 반환
  - **DOMToken 객체가 제공하는 메서드**
    - `add(...className)`: 인수로 전달한 1개 이상의 문자열을 클래스 값으로 추가
    - `remove(...className)`: 인수로 전달한 1개 이상의 문자열과 일치하는 클래스를 삭제
    - `contains(className)`: 인수로 전달한 문자열과 일치하는 클래스 값이 존재하는지 확인
    - `replace(oldClassName, newClassName)`: 첫 번째 인수로 전달한 클래스 값을 두 번째 인수로 전달한 클래스 값으로 변경
    - `toggle(className, 조건식)`: 첫 번째 인수로 전달하는 클래스 존재하면 삭제, 존재하지 않으면 추가. 두 번째 인수 true로 평가되면 클래스 값 추가, false로 평가되면 제거(두번째 인수 생략 가능)
- `Element.prototype.className` : class 어트리뷰트 값들을 하나의 문자열로 반환 및 변경



> 참고자료
>
> - [모던 자바스크립트 Deep Dive (도서)](http://www.yes24.com/Product/Goods/92742567)
> - https://developer.mozilla.org/ko/docs/Web/API/HTMLElement/innerText
> - https://developer.mozilla.org/ko/docs/Web/API/Element/classList

