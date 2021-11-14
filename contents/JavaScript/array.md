---
date: '2021-11-12'
title: 'Array | 자바스크립트'
tags: ['JavaScript', 'Study']
summary: '자바스크립트에서 사용 빈도가 매우 높은 자료구조, 배열에 대해 이해하기'
thumbnail: '../thumbnails/thumbnail_array.jpg'
---

## 1. 배열이란?

배열은 여러 개의 값을 순차적으로 나열한 자료구조다. 



배열이 갖는 특성들에 대해 나열해보자

1. 배열이 갖고 있는 값을 요소(element)라고 부르고, 자바스크립트의 **모든 값**은 요소가 될 수 있다.

2. 배열의 요소는 배열에서 0 이상의 정수인 인덱스를 갖는다.

3. 배열은 배열의 길이를 나타내는 **length 프로퍼티**를 갖는다.

4. 배열은 인덱스와 length 프로퍼티를 갖기 때문에 for 문을 통해 순차적으로 요소에 접근할 수 있다.
5. 자바스크립트에 배열이라는 타입은 존재하지 않는다. **배열은 객체 타입이다.**

6. 배열은 배열 리터럴( [ ] ), Array 생성자 함수, `Array.of`, `Array.from` 메서드로 생성할 수 있다.
7. 배열의 생성자 함수는 `Array`이며, 배열의 프로토타입 객체는 `Array.prototype`이다.
8. `Array.prototype`은 배열을 위한 빌트인 메서드를 제공한다.
9. 일반 객체와 배열의 가장 큰 차이는 "**값의 순서**"와 "**length 프로퍼티**"이다.



## 2. 자바스크립트 배열은 배열이 아니다.

**자료구조**에서 말하는 배열은 동일한 크기의 메모리 공간이 빈틈없이 연속적으로 나열된 자료구조를 말한다. 배열의 요소는 **하나의 데이터 타입**으로 통일되어 있으며 서로 **연속적**으로 인접해 있다. 이를 밀집 배열(dense array)이라 한다.

자료구조의 배열은 인덱스를 통해 **random access**(시간 복잡도: O(1))가 가능하여 배열 요소에 접근하는 속도가 매우 빠르지만, 특정 요소를 검색하거나 요소를 삽입, 삭제하는 경우에 일반 배열보다 느리다. (연속성을 유지하기 위해)

**자바스크립트**의 배열은 배열의 요소를 위한 각각의 메모리 공간은 동일한 크기를 갖지 않아도 되며, 연속적으로 이어져 있지 않을 수도 있다(희소 배열). **해시 테이블**로 구현되어 있어 접근하는데 속도가 일반 배열보다 느리지만, 특정 요소를 검색하거나 요소를 삽입, 삭제하는 경우에 일반 배열보다 빠르다.

최적의 성능을 내기 위해 자바스크립트의 배열에는 같은 타입의 요소를 연속적으로 위치시키는 것이 최선이다.



## 3. 배열 생성

### 3.1 배열 리터럴

0개 이상의 요소를 쉼표로 구분하여 대괄호로 묶는 방법

```js
const arr = [1, 2, 3];
```



### 3.2 Array 생성자 함수

Array 생성자 함수를 통해 배열을 생성 가능하나, 전달된 인수의 개수에 따라 다르게 동작한다.

- 전달된 인수가 없는 경우에는 빈 배열을 생성

  ```js
  new Array();	// -> []
  ```

  

- **전달된 인수가 1개이고 숫자**인 경우, **length 프로퍼티 값이 인수**인 배열을 생성

  ```js
  const arr = new Array(10);
  
  console.log(arr);	// [empty * 10], 희소 배열
  ```



- 전달된 인수가 **2개 이상이거나 숫자가 아닌** 경우, **인수 요소**를 갖는 배열을 생성한다.

  ```js
  new Array(1, 2, 3);	// -> [1, 2, 3]
  ```



- new 연산자 없이 Array 생성자 함수 호출하더라도, 배열 생성하는 생성자 함수로 동작 (함수 내부에서 new.target 확인하기 때문)

  ```js
  Array(1, 2, 3);	// -> [1, 2, 3]
  ```



### 3.3 Array.of

`Array.of` 메서드는 **전달된 인수를 요소로 갖는 배열을 생성** (인수가 1개이고 숫자여도 마찬가지)

```js
Array.of(1);	// -> [1]
Array.of(1, 2, 3);	// -> [1, 2, 3]
```



### 3.4 Array.from

`Array.from` 메서드는 **유사 배열 객체** 또는 **이터러블 객체**를 인수로 전달받아 **배열로 변환하여 반환**한다.

```js
// 유사 배열 객체를 변환하여 배열 생성
Array.from({ length: 2, 0: 'a', 1: 'b' });	// -> ['a', 'b']

// 이터러블을 변환하여 배열 생성 (문자열은 이터러블)
Array.from('Hello');	// -> ['H', 'e'. 'l', 'l', 'o']
```



> **유사 배열 객체** (array-like object)
>
> : 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있고, length 프로퍼티를 갖는 객체 (for문으로 순회하는 것도 가능하다.)
>
> 
>
> **이터러블 객체** (iterable object)
>
> : Symbol.iterator 메서드를 구현하여 for ... of 문으로 순회할 수 있으며, 스프레드 문법과 배열 디스트럭처링 할당의 대상으로 사용할 수 있는 객체
>
> ex) Array, String, Map, Set, DOM 컬렉션, arguments 등



## 4. 배열 요소의 참조

참조할 때는 대괄호 표기법 사용, 대괄호 안에는 **인덱스**가 와야 한다.

존재하지 않는 요소를 참조하면 undefined를 반환 (객체와 동일!)



## 5. 배열 요소의 추가와 갱신

객체에 프로퍼티를 동적으로 추가하듯이 배열도 요소를 동적으로 추가할 수 있다. (length 프로퍼티 값은 자동 갱신)

```js
const arr = [0];

arr[1] = 1;

console.log(arr);	// [0, 1]
```



정수 이외의 값을 인덱스처럼 사용하면 요소가 생성되는 것이 아닌 프로퍼티가 생성된다. (length 프로퍼티 값에 영향x)

```js
const arr = [];

// 배열 요소 추가
arr[0] = 1;
arr['1'] = 2;

// 프로퍼티 추가
arr['foo'] = 3;
arr[-1] = 4

console.log(arr);	// [1, 2, foo: 3, '-1': 4]
```



## 6. 배열 요소의 삭제

배열은 객체이기 때문에 특정 요소 삭제를 위해 `delete` 연산자를 사용할 수 있다.

단, `delete`로 배열 요소 제거 시, 희소 배열이 생성되기 때문에 `delete` 연산자는 사용하지 않는 것이 좋다.

희소 배열을 만들지 않으면서 배열의 특정 요소를 완전히 삭제하려면 `Array.prototype.splice` 메서드를 사용한다.

```js
// delete 연산자
const arr = [1, 2, 3];

delete arr[1];
console.log(arr);	// [1, empty, 3]

// Array.prototype.splice 메서드
const arr2 = [1, 2, 3];

arr.splice(1, 1);	// arr[1]부터 1개의 요소 제거
console.log(arr);	// [1, 3]
```



## 7. 배열 메서드

자바스크립트는 배열에 대해 다양한 빌트인 메서드를 제공한다.

`Array` 생성자 함수는 정적 메서드를 제공, `Array.prototype`은 프로토타입 메서드를 제공한다. 

**원본 배열을 직접 변경하는 메서드(mutator method)**와 원본 배열을 직접 변경하지 않고 **새로운 배열을 생성하여 반환하는 메서드(accessor method)**가 있다.

### 7.1 Array.isArray

- **전달된 인수가 배열이면 true, 아니면 false 반환**
- Array 생성자 함수의 정적 메서드



### 7.2 Array.prototype.indexOf

- **원본 배열에서 인수로 전달된 요소를 검색하여 인덱스 반환** (존재하지 않으면 -1 반환)

- 중복되는 요소가 여러 개 있다면 첫 번째 요소의 인덱스 반환
- `Array.prototype.includes` 메서드가 더 좋음

```js
const arr = [1, 2, 3];

arr.indexOf(2);	// -> 1
arr.indexOf(4);	// -> -1
```



### 7.3 Array.prototype.push

- **인수로 전달받은 모든 값을 원본 배열의 마지막 요소로 추가, 변경된 length 프로퍼티 값을 반환**
- <u>원본 배열을 직접 변경</u> (스프레드 문법 추천)

- 성능이 좋지 않아, 추가할 요소가 하나면 length 프로퍼티를 사용해 마지막에 요소를 직접 추가

```js
const arr = [1, 2];

const result = arr.push(3, 4);

console.log(result);	// 4
console.log(arr);		// [1, 2, 3, 4]
```



### 7.4 Array.prototype.pop

- **원본 배열에서 마지막 요소를 제거하고 제거한 요소를 반환**
- 원본 배열이 빈 배열인 경우, **undefined** 반환
- <u>원본 배열을 직접 변경</u>
- pop 메서드와 push 메서를 사용해 **스택**을 쉽게 구현

```js
const arr = [1, 2, 5];

const result = arr.pop();

console.log(result);	// 5
console.log(arr);		// [1, 2]
```



### 7.5 Array.prototype.unshift

- **인수로 전달받은 모든 값을 원본 배열의 선두에 요소로 추가, 변경된 length 프로퍼티 값을 반환**

- <u>원본 배열을 직접 변경</u> (스프레드 문법  추천)

```js
const arr = [1, 2];

const result = arr.unshift(3, 4);

console.log(result);	// 4
console.log(arr);		// [3, 4, 1, 2]
```



### 7.6 Array.prototype.shift

- **원본 배열에서 첫 번째 요소를 제거하고 제거한 요소를 반환**
- 원본 배열이 빈 배열이면 **undefined** 반환
- <u>원본 배열을 직접 변경</u>
- shift 메서드와 push 메서드를 사용하면 큐를 쉽게 구현

```js
const arr = [3, 4, 5];

const result = arr.shift();

console.log(result);	// 3
console.log(arr);		// [4, 5]
```



### 7.7 Array.prototype.concat

- **인수로 전달된 값들을 원본 배열의 마지막 요소로 추가한 새로운 배열을 반환**
- 인수로 전달한 값이 배열인 경우, **배열을 해체**하여 새로운 배열의 요소로 추가
- push와 unshift 메서드의 경우, 인수로 배열을 전달받으면 배열 그대로 삽입
- <u>원본 배열은 변경되지 않는다.</u>
- concat 메서드는 스프레드 문법으로 대체 가능 (push, unshift, concat 대신 일관성 있게 스프레드 문법 사용 권장)

```js
const arr1 = [1, 2];
const arr2 = [3, 4];

const result = arr1.concat(arr2);

console.log(result);	// [1, 2, 3, 4]
console.log(arr1);		// [1, 2]
```



### 7.8 Array.prototype.splice

- **원본 배열의 중간에 요소를 추가 및 제거, 제거 요소 반환**
- <u>원본 배열을 직접 변경</u>
- 3개의 매개 변수
  - **start**: 원본 배열의 요소를 제거하기 시작할 인덱스 (음수인 경우 배열의 끝에서의 인덱스, -1: 마지막 요소)
  - **deleteCount**: start부터 제거할 요소의 개수 (0인 경우 제거x, 생략 시 start부터 모든 요소 제거)
  - **items**: 제거한 위치에 삽입할 요소들의 목록 (생략 시 제거만 진행)

```js
const arr = [1, 2, 3, 4];

const result = arr.splice(1, 2, 20, 30);

console.log(result);	// [2, 3]
console.log(arr);		// [1, 20, 30, 4]
```



- 배열에서 특정 요소(1개) 제거 시, `indexOf`  메서드로 특정 요소의 인덱스 추출하고 `splice` 메서드를 사용한다.
- filter 메서드를 사용해 특정 요소를 제거할 수도 있지만, 중복된 값들 모두 제거한다.

```js
const arr = [1, 2, 3, 1, 2];

function remove(array, item) {
    const index = array.indexOf(item);	// 제거할 item의 index
    
    if (index !== -1) array.splice(index, 1);	// 제거
    
    return array
}

console.log(remove(arr, 2));	// [1, 3, 1, 2]
```



### 7.9 Array.prototype.slice

- **인수로 전달된 범위의 요소들을 복사하여 배열로 반환**
- <u>원본 배열은 변경되지 않는다.</u>
- 2개의 매개 변수
  - start: 복사를 시작할 인덱스 (음수인 경우 배열의 끝에서의 인덱스를 나타낸다)
  - end: 복사를 종료할 인덱스 (해당 요소는 복사x)

- slice 메서드의 인수 모두 생략 시, 원본 배열의 복사본을 생성하여 반환
- **얕은 복사(shallow slice)를 통해 생성된다.**
- slice 메서드가 복사본을 생성하는 것을 이용해 arguments, HTMLCollection, NodeList와 같은 유사 배열 객체를 배열로 변환할 수 있다. (`Array.from` 사용하면 더욱 쉬움)

```js
const todos = [
    { id: 1, content: 'HTML'},
    { id: 2, content: 'CSS'},
    { id: 3, content: 'JS'}
];

const todos_copy = todos.slice();

console.log(todos === todos_copy);			// false
console.log(todos[0] === todos_copy[0]);	// true
```



### 7.10 Array.prototype.join

- **원본 배열의 모든 요소를 문자열로 변환 후, 인수로 전달받은 문자열(구분자)로 연결한 문자열을 반환**
- 구분자는 생략 가능하며, 기본값은 ,다.

```js
const arr = [1, 2, 3, 4];

arr.join();		// '1,2,3,4'
arr.join('');	// '1234'
arr.join(':');	// '1:2:3:4'
```



### 7.11 Array.prototype.reverse

- 원본 배열의 순서를 반대로 뒤집는다.
- <u>원본 배열을 직접 변경</u>

```js
const arr = [1, 2, 3];
const result = arr.reverse();

console.log(arr);		// [3, 2, 1]
console.log(result);	// [3, 2, 1]
```



### 7.12 Array.prototype.fill

- **인수로 전달받은 값을 배열의 처음부터 끝까지 요소로 채운다.**
- <u>원본 배열을 직접 변경</u>
- 추가 매개변수
  - 두 번째 인수: 요소 채우기를 시작할 인덱스 전달
  - 세 번째 인수: 요소 채우기를 멈출 인덱스 전달

```js
const arr = [1, 2, 3];

arr.fill(0);

console.log(arr);	// [0, 0, 0]
```



### 7.13 Array.prototype.includes

- **배열 내에 특정 요소가 포함되어 있는지 확인하여 true/false 반환**
- 2개의 arguments
  - 첫 번째 인수: 검색할 대상 지정
  - 두 번째 인수: 검색을 시작할 인덱스 전달

```js
const arr = [1, 2, 3];

arr.includes(2);	// true
arr.includes(4);	// false
```



### 7.14 Array.prototype.flat

- **인수로 전달한 깊이만큼 재귀적으로 배열을 평탄화**
- 인수의 기본값은 1

```js
[1, [2, [3, [4]]]].flat();			// -> [1, 2, [3, [4]]]
[1, [2, [3, [4]]]].flat(2);			// -> [1, 2, 3, [4]]
[1, [2, [3, [4]]]].flat(Infinity);	// -> [1, 2, 3, 4]
```





## 8. 배열 고차 함수

고차 함수(Higher-Order Function, HOF)는 함수를 인수로 전달받거나 함수를 반환하는 함수를 말한다. 고차 함수는 외부 상태의 변경이나 가변(mutable) 데이터를 피하고 **불변성을 지향하는 함수형 프로그래밍**에 기반을 두고 있다.

아래는 유용한 배열 고차 함수의 종류이다.

### 8.1 Array.prototype.sort

- **배열의 요소를 오름차순으로 정렬**
- <u>원본 배열을 직접 변경</u>
- 내림차순 정렬을 원할 경우, `sort` 메서드와 `reverse` 메서드를 사용하면 된다.

```js
const fruits = ['Banana', 'Orange', 'Apple'];

fruits.sort();	// ['Apple', 'Banana', 'Orange']
```



- 정렬 순서는 유니코드 코드 포인트의 순서를 따른다. (문자열의 경우 상관없지만, 숫자 타입은 문제가 생김)
- **숫자 요소를 정렬 시 sort 메서드에 정렬 순서를 정의하는 <u>비교 함수</u>를 인수로 전달해야 한다.**
- 비교 함수는 양수나 음수 또는 0을 전달해야 한다.
- 비교 함수의 반환값이 음수이면 비교 함수의 첫 번째 인자수를 우선하여 정렬, 0이면 정렬x, 양수이면 두 번째 인수를 우선하여 정렬한다.

```js
// 숫자 요소들로 이루어진 배열 문제점
const points = [40, 100, 1, 5, 2, 25, 10];

points.sort();	
console.log(points);	// [1, 10, 100, 2, 25, 40, 5]

// 비교 함수 인수로 전달 (오름차순 정렬)
points.sort((a, b) => a - b);	
console.log(points);	// [1, 2, 5, 10, 25, 40, 100]

// 비교 함수 인수로 전달 (내림차순 정렬)
points.sort((a, b) => b - a);	
console.log(points);	// [100, 40, 25, 10, 5, 2, 1]
```

- 객체를 요소로 갖는 배열을 정렬하는 예제는 아래와 같다.

```js
const todos = [
    { id: 3, content: 'HTML'},
    { id: 1, content: 'CSS'},
    { id: 2, content: 'JS'}
];

// 비교 함수 (비교 연산 사용)
function compare(key) {
    return (a, b) => (a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0));
}

// id 기준 오름차순 정렬
todos.sort(compare('id'));
console.log(todos);

// content 기준 오름차순 정렬
todos.sort(compare('content'));
console.log(todos);
```



### 8.2 Array.prototype.forEach

- **반복문을 추상화한 고차 함수로서, 배열의 요소를 순회하면서 수행해야할 처리를 콜백함수로 전달받아 <u>반복 호출</u>한다.**
- forEach 메서드의 콜백 함수는 배열의 **요소값, 인덱스, 배열 자체(this)**를 전달받을 수 있다.
- <u>원본 배열은 변경되지 않는다.</u> (but 콜백 함수를 통해 변경 가능)
- **forEach 메서드의 반환값은 언제나 undefined**
- 희소 배열의 경우 존재하지 않는 요소는 순회 대상에서 제외된다. (`map`, `filter`, `reduce` 메서드에서도 마찬가지)
- `forEach` 메서드의 두 번째 인수로 `forEach` 메서드의 콜백 함수 내부에서 this로 사용할 객체를 전달할 수 있다. (첫 번째 인수는 콜백 함수)

```js
const numbers = [1, 2, 3];
const poew = [];

numbers.forEach(item => pows.push(item ** 2));
console.log(pows);	// [1, 4, 9]

numbers.forEach((item, index, arr) => {
    console.log(`${item}, ${index}, ${JSON.stringify(arr)}`);
})

/*
1, 0, [1, 2, 3]
2, 1, [1, 2, 3]
3, 2, [1, 2, 3]
*/
```



### 8.3 Array.prototype.map

- **배열의 요소를 순회하면서 콜백함수를 호출하여, 콜백 함수의 반환값들로 구성된 새로운 배열을 반환한다.**
- <u>원본 배열은 변경되지 않는다.</u>
- `map` 메서드를 호출한 배열과 `map` 메서드가 생성하여 반환한 배열은 1:1 매핑
- 콜백 함수의 인수는 `forEach` 메서드와 동일

```js
const numbers = [1, 4, 9];

const roots = numbers.map(item => Math.sqrt(item));
console.log(roots);	// [1, 2, 3]
```



### 8.4 Array.prototype.filter

- **배열의 요소를 순회하면서 콜백함수를 호출하여, 콜백 함수의 반환값이 true인 요소로만 구성된 새로운 배열을 반환한다.**
- <u>원본 배열은 변경되지 않는다.</u>
- 콜백 함수의 인수는 `forEach` 메서드와 동일

```js
class Users {
    constructor() {
        this.users = [
            {id: 1, name: 'Lee'},
            {id: 2, name: 'Kim'},
            {id: 3, name: 'Kim'}
        ];
    }
    
    findById(id) {
        return this.users.filter(user => user.id === id);
    }
    
    removeById(id) {
        return this.users.filter(user => user.id !== id);
    }
}

const users = new Users();

const user1 = users.findById(1);
const groupWithoutLee = users.removeById(1);
```



### 8.5 Array.prototype.reduce

- **배열의 요소를 순회하면서 콜백함수를 호출하여, <u>콜백 함수의 반환값을 다음 순회 시에 콜백 함수의 첫 번째 인수로 전달</u>하면서 콜백 함수를 호출하여 하나의 결과값을 만들어 반환한다.**

- <u>원본 배열은 변경되지 않는다.</u>
- reduce 메서드는 첫 번째 인수로 **콜백 함수**, 두 번째 인수로 **초기값**을 전달 받는다. (초기값은 생략가능하지만 전달하는 것이 안전하다.)
- reduce 메서드의 콜백 함수에는 4개의 인수가 있다. 
  - **초기값 or 콜백 함수의 이전 반환 값 (accumulator)**
  - **reduce 메서드를 호출한 배열의 요소값 (currentValue)**
  - reduce 메서드를 호출한 배열의 인덱스 (index)
  - 배열 자체 (array)
- reduce는 하나의 결과값을 반환한다.

```js
const sum = [1, 2, 3, 4].reduce((accumulator, currentValue, index, array) => accumulator + currentvalue, 0);
console.log(sum);
```

|     구분     | accumulator | currentValue | 콜백 함수 반환값 (acc + cur) |
| :----------: | :---------: | :----------: | :--------------------------: |
| 첫 번째 순회 | 0 (초기값)  |      1       |              1               |
| 두 번째 순회 |      1      |      2       |              3               |
| 세 번째 순회 |      3      |      3       |              6               |
| 네 번째 순회 |      6      |      4       |              10              |



- reduce의 다양한 활용법 예시

  - 평균 구하기

    ```js
    const values = [1, 2, 3, 4, 5, 6];
    
    const average = values.reduce((acc, cur, i, {length}) => {
        return i === length - 1 ? (acc + cur) / length : acc + cur;	// 마지막 순회 때 누적값으로 평균 구하기
    }, 0);
    console.log(average);	// 3.5
    ```

    

  - 최대값 구하기

    ```js
    const values = [1, 2, 3, 4 ,5];
    
    const max = values.reduce((acc, cur) => (acc > cur ? acc : cur), 0);
    console.log(max);	// 5
    
    const max2 = Math.max(...values);	// Math.max 메서드 추천 (변수가 배열이므로 스프레드 문법 사용)
    ```

    

  - 요소의 중복 횟수 구하기

    ```js
    const values = ['a', 'b', 'c', 'c', 'd', 'b'];
    
    const count = values.reduce((acc, cur) => {
        acc[cur] = (acc[cur] || 0) + 1;
        return acc;
    }, {})
    
    console.log(count);	// { a: 1, b: 2, c: 2, d: 1 }
    
    /*
    첫 번째 순회 시 acc는 {}, cur은 'a'
    초기값으로 전달받은 빈 객체에 요소값인 cur을 프로퍼티 키로, 요소의 개수를 프로퍼티 값으로 할당한다.
    만약 프로퍼티 값이 undefined(빈 객체이므로)이면 프로퍼티 값을 1로 초기화
    */
    ```

    

  - 중첩 배열 평탄화

    ```js
    const values = [1, [2, 3], 4, [5, 6]];
    
    const flatten = values.reduce((acc, cur) => acc.concat(cur), []);
    console.log(flatten);	// [1, 2, 3, 4, 5, 6]
    
    [1, [2, 3], 4, [5, 6]].flat();	// flat 메서드 추천
    ```

  

  - 중복 요소 제거

    ```js
    const values = [1, 2, 1, 5, 3, 4, 4];
    
    const result = values.reduce((acc, cur, i, arr) => {
        if (arr.indexOf(cur) === i) acc.push(cur);	// indexOf 메서드는 인자로 받은 값에 대한 인덱스 값 반환(처음 나오는 1개만)
        return acc;
    }, []);
    console.log(result);	// [1, 2, 5, 3, 4]
    
    const result2 = values.filter((v, i, arr) => arr.indexOf(v) === i);	// filter 메서드 추천
    
    const result3 = [...new Set(values)];	// 중복 허용하지 않는 Set 객체 특성 활용 방법
    ```

    

### 8.6 Array.prototype.some

- **배열의 요소 중에 콜백 함수를 통해 정의한 조건을 만족하는 요소가 1개 이상 존재하는지 확인하여 그 결과를 불리언 타입으로 반환**
- 빈 배열에 `some` 메서드를 적용한 경우, 언제나 false 반환

```js
[5, 10, 15].some(item => item > 10);		// true
['a', 'b', 'c'].some(item => item === 'b');	// true
```



### 8.7 Array.prototype.every

- **배열의 모든 요소가 콜백 함수를 통해 정의한 조건을 모두 만족하는지 확인하여 그 결과를 불리언 타입으로 반환**
- 빈 배열에 `every` 메서드를 적용한 경우, 언제나 true 반환

```js
[5, 10, 15].some(item => item > 3);		// true
[5, 10, 15].some(item => item > 10);	// false
```



### 8.8 Array.prototype.find

- **배열의 요소를 순회하면서 콜백함수를 호출하여 반환값이 true인 첫 번째 <u>요소를 반환</u>**
- 콜백함수의 반환값이 true인 요소가 존재하지 않는다면, undefined를 반환

```js
const users = [
    {id: 1, name: 'Lee'},
    {id: 2, name: 'Kim'},
    {id: 3, name: 'Park'}
];

users.find(user => user.id === 2);	// {id: 2, name: 'Kim'}
```



### 8.9 Array.prototype.findIndex

- **배열의 요소를 순회하면서 콜백함수를 호출하여 반환값이 true인 첫 번째 요소의 인덱스를 반환한다.**
- 콜백 함수의 반환값이 true인 요소가 존재하지 않는다면 -1을 반환

```js
const users = [
    {id: 1, name: 'Lee'},
    {id: 2, name: 'Kim'},
    {id: 3, name: 'Park'}
];

users.findIndex(user => user.id === 2);	// 1

// 콜백 함수 추상화
function predicate(key, value) {
    return item => item[key] === value;
}

users.findIndex(predicate('id', 2));		// 1
users.findIndex(predicate('name', 'Park'));	// 3
```



### 8.10 Array.prototype.flatMap

- **map 메서드를 통해 생성된 새로운 배열을 평탄화한다.** (map 메서드와 flat 메서드 순차적으로 실행하는 효과)
- 1단계만 평탄화

```js
const arr = ['hello', 'world'];

arr.flatMap(x => x.split(''));		// ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']

arr.map(x => x.split('')).flat();	// 평탄화 깊이 지정해야 한다면 이렇게 사용
```





> 참고자료
>
> - [모던 자바스크립트 Deep Dive (도서)](http://www.yes24.com/Product/Goods/92742567)

