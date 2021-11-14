---
date: '2021-11-11'
title: 'ES6 함수 추가기능 | 자바스크립트'
tags: ['JavaScript', 'Study']
summary: 'ES6에서의 Method, Arrow Function, Rest parameter 이해하기'
thumbnail: '../thumbnails/thumbnail_ES6함수추가기능.jpg'
---

## 1. 함수의 구분

ES6 이전까지 자바스크립트의 함수는 별다른 구분 없이 일반적인 함수로서, 생성자 함수로서, 메서드로서 호출할 수 있다. 이는 편리해보이지만 실수를 유발할 수 있으며 성능 면에서도 손해다.

이러한 문제를 해결하기 위해 ES6에서는 함수를 사용 목적에 따라 세 가지 종류로 명확히 구분했다.

|  ES6 함수의 구분   | construtor | prototype | super | arguments |
| :----------------: | :--------: | :-------: | :---: | :-------: |
| 일반 함수(Normal)  |     O      |     O     |   X   |     O     |
|   메서드(Method)   |     X      |     X     |   O   |     O     |
| 화살표 함수(Arrow) |     X      |     X     |   X   |     X     |

- 일반 함수는 함수 선언문이나 함수 표현식으로 정의한 함수 (ES6 이전 함수와 차이x)
- 메서드, 화살표 함수: non-constructor



## 2. 메서드

- ES6 사양에서 메서드는 **메서드 축약 표현**으로 정의된 함수만을 의미한다.

```js
const obj = {
    x: 1,
    
    foo() { return this.x; },			// 메서드
    bar: function() { return this.x }	// 일반 함수(메서드x)
}
```



- ES6에서 정의한 메서드는 인스턴스를 생성할 수 없는 **non-constructor**다.

```js
new obj.foo();	// TypeError
new obj.bar();	// -> bar {}
```



- ES6 메서드는 인스턴스를 생성할 수 없으므로 **prototype 프로퍼티가 없고 프로토타입도 생성하지 않는다**.

- ES6 메서드는 **자신을 바인딩한 객체를 가리키는 내부 슬롯 [[HomeObject]]를 갖는다**. super 참조는 내부 슬롯 [[HomeObject]]를 사용하여 수퍼클래스의 메서드를 참조



## 3. 화살표 함수 (Arrow Function)

화살표 함수는 콜백 함수 내부에서 this가 전역 객체를 가리키는 문제를 해결하기 위한 대안으로 유용하다.



### 3.1 화살표 함수 정의

- 함수 선언문으로 정의할 수 없고 함수 표현식으로 정의해야 한다. 호출 방식은 동일

  ```js
  const multiply = (x, y) => x * y;
  ```

- 매개변수 한 개이면 소괄호 ()를 생략, 없으면 생략 불가능

- **객체 리터럴을 반환하는 경우, 객체 리터럴을 소괄호 ()로 감싸 주어야 한다.**

  ```js
  const create = (id, content) => ({ id, content });	// { return {id, content}}와 동일
  ```




### 3.2 화살표 함수와 일반 함수의 차이

1. 화살표 함수는 인스턴스를 생성할 수 없는 **non-constructor**다.

   -> 인스턴스를 생성할 수 없으므로 prototype 프로퍼티가 없고 프로토타입도 생성하지 않는다.

2. 중복된 매개변수 이름을 선언할 수 없다.

3. 화살표 함수는 **함수 자체의 this, arguments, super, new.target 바인딩을 갖지 않는다.**

   -> 따라서 **화살표 함수 내부**에서 this, arguments, super, new.target을 참조하면 스코프 체인을 통해 **상위 스코프**의 this, arguments, super, new.target을 참조한다.



### 3.3 this

화살표 함수의 this는 일반 함수의 this와 다르게 동작한다. 이는 **"콜백 함수 내부의 this 문제"**, 즉 콜백 함수 내부의 this가 외부 함수의 this와 다르기 때문에 발생하는 문제를 해결하기 위해 의도적으로 설계된 것이다.

this 바인딩은 함수의 호출 방식, 즉 함수가 어떻게 호출되었는지에 따라 동적으로 결정된다. 함수를 호출할 때 함수가 어떻게 호출되었는지에 따라 this에 바인딩할 객체가 동적으로 결정된다는 것이다.



아래 코드는 클래스 내부의 모든 코드에 암묵적으로 strict mode가 적용되어, 일반 함수로 호출된 함수 내부의 this에 undefined가 적용되어 발생하는 오류에 대한 예시이다.

```js
class Prefixer {
    constructor(prefix) {
        this.prefix = prefix;
    }
    
    add(arr) {
        console.log(this);	// 메서드를 호출한 객체
        return arr.map(function (item) {
            console.log(this);	// undefined
            return this.prefix + item;	// Error
        });
    }
}

const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transition', 'user-select']));	// Error
```



ES6에서는 화살표 함수를 사용하여 "콜백 함수 내부의 this 문제"를 해결할 수 있다.

```js
class Prefixer {
    constructor(prefix) {
        this.prefix = prefix;
    }
    
    add(arr) {
        console.log(this);	// 메서드를 호출한 객체
        return arr.map((item) => {
            console.log(this);	// 상위 스코프의 this 참조
            return this.prefix + item;	
        });
    }
}

const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transition', 'user-select']));	
```

**화살표 함수는 함수 자체의 this 바인딩을 갖지 않는다. 따라서 화살표 함수 내부에서 this를 참조하면 상위 스코프의 this를 그대로 참조한다. 이를 lexical this라 한다.**



### 3.4 super

화살표 함수는 함수 자체의 super 바인딩을 갖지 않는다. 따라서 화살표 함수 내부에서 super를 참조하면 this와 마찬가지로 상위 스코프의 super를 참조한다.

따라서 메서드를 정의할 때는 ES6 축약 표현으로 정의한 ES6 메서드를 사용하는 것이 좋다.

### 3.5 arguments

화살표 함수는 함수 자체의 arguments 바인딩을 갖지 않는다. 따라서 화살표 함수 내부에서 arguments를 참조하면 this와 마찬가지로 상위 스코프의 arguments를 참조한다.

따라서 화살표 함수로 가변 인자 함수를 구현해야 할 때는 반드시 Rest 파라미터를 사용해야 한다.



## 4. Rest 파라미터

### 4.1 기본 문법

**Rest 파라미터는 함수에 전달된 인수들의 목록을 배열로 전달받는다.**

```js
function foo(...rest) {
	console.log(rest);	// [1, 2, 3, 4, 5]
}

foo(1, 2, 3, 4, 5)
```



- 일반 매개변수와 Rest 파라미터는 함께 사용할 수 있다. 이때 함수에 전달된 인수들은 매개변수와 Rest 파라미터에 순차적으로 할당된다.

  ```js
  function bar(p1, p2, ...rest) {
      console.log(p1);	// 1
      console.log(p2);	// 2
      console.log(rest)l	// [3, 4, 5]
  }
  
  bar( 1, 2, 3, 4, 5);
  ```

  

- Rest 파라미터는 반드시 마지막 파라미터이어야 한다.

- Rest 파라미터는 단 하나만 선언할 수 있다.

- Rest 파라미터는 함수 정의 시 선언한 매개변수 개수를 나타내는 함수 객체의 length 프로퍼티에 영향을 주지 않는다.

  ``` js
  function foo(...rest) {}
  console.log(foo.length);	// 0
  
  function foo(x, ...rest) {}
  console.log(foo.length);	// 1
  
  function foo(x, y, ...rest) {}
  console.log(foo.length);	// 2
  ```



### 4.2 Rest 파라미터와 arguments 객체

arguments 객체는 함수 호출 시 전달된 인수들의 정보를 담고 있는 순회 가능한 유사 배열 객체이며, 함수 내부에서 지역 변수처럼 사용할 수 있다.

하지만 arguments 객체는 배열이 아닌 유사 배열 객체이므로 배열 메서드를 사용하려면 `Function.prototype.call`이나 `Function.prototype.apply` 메서드를 사용해 arguments 객체를 배열로 변환해야 하는 번거로움이 있었다.

```js
function sum() {
	const array = Array.prototype.slice.call(arguments);
    
    return array.reduce(function(pre, cur) {
        return pre + cur;
    }, 0);
}

console.log(sum(1, 2, 3, 4, 5));	// 15
```



ES6에서는 rest 파라미터를 사용하여 가변 인자 함수의 인수 목록을 배열로 직접 전달받을 수 있다. 이를 통해 arguments 객체를 배열로 변환하는 귀찮음을 덜 수 있다.



> 참고자료
>
> - [모던 자바스크립트 Deep Dive (도서)](http://www.yes24.com/Product/Goods/92742567)

