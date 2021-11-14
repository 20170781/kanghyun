---
date: '2021-10-06'
title: 'this | 자바스크립트'
tags: ['JavaScript', 'Study']
summary: '동적으로 결정되는 this 바인딩 이해하기'
thumbnail: '../thumbnails/thumbnail_this.jpg'
---

## this를 사용하는 이유

객체는 상태를 나타내는 프로퍼티와 동작을 나타내는 메서드로 구성되어 있다. 메서드는 자신이 속한 객체의 프로퍼티를 참조하고 변경할 수 있어야 하는데, 이를 위해 선행되어야 하는 것이 **자신이 속한 객체를 가리키는 식별자를 참조**해야하는 것이다.

자신이 속한 객체를 가리키는 식별자를 참조할 때, 아래와 같은 문제가 생기기 때문에 `this`를 사용하는 것이다.

- 생성자 함수 방식으로 인스턴스를 생성하는 경우, 함수 자신이 생성할 인스턴스를 가리키는 식별자를 알 수 가 없다.

- 객체 리터럴 방식으로 생성한 객체의 경우, 재귀적으로 참조하면 다른 식별자에 해당 객체를 바인딩하는 경우 정상적으로 작동하지 않는다.

```js
// 생성자 함수 방식
function Circle(radius) {
    ????.radius = radius;		// 인스턴스를 가리키는 식별자 필요!
    ????.getArea = function() {
        return Math.PI * ????.radius **2;
    };
}

const circle1 = new Circle(4);

// 객체 리터럴 방식
let user = {
  name: "Alex",
  age: 24,
  sayHi() {
    console.log(user.name);	// 재귀 방식
  }
};
user.sayHi();	// Alex

let user2 = user;
user = null;

user2.sayHi();	// TypeError!
```



**this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 참조 변수(self-referencing variable)다. this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.**



## 함수 호출 방식에 따른 this 바인딩

`this`가 가리키는 값, 즉 **`this` 바인딩은 함수 호출 방식에 의해 동적으로 결정**된다.

**함수 호출 방식 종류**

- 일반 함수 호출
- 메서드 호출
- 생성자 함수 호출
- 콜백 함수 호출
- Function.prototype.apply/call/bind 메서드에 의한 간접 호출



### 1. 일반 함수 호출

일반 함수로 호출하면 함수 내부의 `this`에 **전역객체**가 바인딩된다.

단, strict mode가 적용된 일반 함수의 내부 `this`에는 `undefined`가 바인딩된다.

```js
// 일반 함수 호출
function test() {
    console.log('this: ', this);	
}
test();  // this: window

// strict mode
function strictTest() {
    'use strict';
    console.log('this: ', this);
}
strictTest();	// this: undefined
```



**메서드 내에서 정의한 중첩 함수**를 일반 함수로 호출하게되면 this에 전역 객체가 바인딩된다.

```js
// 메서드 내에서 정의한 중첩 함수
var testValue = 1;
const testObj = {
    testValue: 100,
    testMethod() {
        console.log("이건 method의 this: ", this.testValue);
        
        // 메서드 내 중첩 함수
        function testFunction() {
            console.log("이건 일반 함수 호출 this: ", this.testValue);
        }
        testFunction();
    }
};
testObj.testMethod();	// 이건 method의 this: 100, 이건 일반 함수 호출 this: 1
```



#### 중첩 함수 해결법

메서드 내에서 정의한 중첩 함수나 콜백 함수의 `this` 바인딩을 메서드의 `this` 바인딩과 일치시키기 위해, **메서드 내부에서 `this`를 변수에 바인딩**한 후, 중첩 함수 안에서 변수를 사용할 수 있다.

아니면 arrow function을 이용해 중첩 함수를 선언하는 방법도 있다. (화살표 함수 내부의 `this`는 상위 스코프의 `this`를 가리킨다.)

```js
// this 바인딩 기법
var testValue = 1;
const testObj = {
    testValue: 100,
    testMethod() {
        console.log("이건 method의 this: ", this.testValue);
        const objThis = this;	// objThis에 바인딩!!
        
        function testFunction() {
            console.log("이건 일반 함수 호출 this: ", objThis.testValue);
        }
        testFunction();
    }
};
testObj.testMethod();	// 이건 method의 this: 100, 이건 일반 함수 호출 this: 100

// arrow function
const obj = {
    outer: function() {
        console.log(this);		// obj, 메서드 방식
        const innerFunc = () => {
            console.log(this);	
            // obj, arrow function 사용해서 스코프체인에서 가장 가까운 this에 접근 
        }
        innerFunc();
    }
}
obj.outer();
```



### 2. 메서드 호출

메서드 내부의 this는 메서드를 소유한 객체가 아닌, **메서드를 호출한 객체**에 바인딩 된다.

왜 그런지 알기 위해서는 객체의 메서드 구조를 이해해야 한다. 아래의 예시를 봐보자.

```js
const test = {
    name: 'KangHyun',
    getName() {				// 원래는 getName: getName() { ... }
        return this.name;
    }
}
console.log(test.getName());	// KangHyun
```

위의 `getName`  메서드는 `test`  객체의 메서드로 정의되어 있다. 이렇게 보면 `getName`이라는 함수 객체가 `test`  객체에 포함되어 있는 것처럼 보이지만, **함수 객체는 독립적으로 존재하는 별도의 객체**이다.

`getName` 프로퍼티가 가리키는 함수 객체인 `getName` 메서드는 다른 객체의 프로퍼티에 할당하는 것이 가능하다.

```js
const test2 = {
    name: 'Alex'
}

test2.getName = test.getName;
console.log(test2.getName());	// Alex
```

**따라서 메서드 내부의 `this`는 프로퍼티로 메서드를 가리키고 있는 객체와는 관계가 없고, 메서드를 호출한 객체에 바인딩된다.**



### 3. 생성자 함수 호출

생성자 함수 내부의 `this`에는 **생성자 함수가 생성할 인스턴스**가 바인딩된다.

```js
function Test(num) {
    this.num = num;
    this.makeDouble = function() {
        return 2 * this.num;
    };
}

const test1 = new Test(10);
console.log(test1.makeDouble());	// 20
```



### 4. 콜백 함수 호출

**콜백 함수의 제어권을 가지는 함수(메서드)가 콜백 함수에서의 this를 무엇으로 할지 정한다.**

(특별히 정의하지 않으면 전역 객체 가리킴)

```js
setTimeout(function() { console.log(this); }, 300);  // 전역 객체

[1, 2, 3, 4, 5].forEach(function(x) {				  
    console.log(this, x);				// 전역 객체, 1~5
})

document.body.innerHTML += '<button id="a">클릭</button>';
document.bodyquerySelector('#a')
	.addEventListener('click', function(e) {
		console.log(this, e);			  // 앞서 지정한 Element, 클릭 이벤트 정보
	});

```



### 5. Function.prototype.apply/call/bind 메서드에 의한 간접 호출

Function.prototype.apply/call/bind 메서드를 사용하면, 사용한 함수의 this를 명시적으로 정할 수 있다.

```js
// Function.prototype.bind 예시

function getThisBinding() {
    return this;
}

const thisArg = {a: 1};		// this로 사용할 객체

console.log(getThisBinding.bind(thisArg)());	// {a: 1}, 즉시 실행 해줘야 출력
```



#### apply, call, bind 메서드 차이점

- bind: 함수를 호출하지 않고 this로 사용할 객체만 전달
- apply: 함수를 호출, this로 사용할 객체 전달, arguments를 배열로 묶어 전달
- call: 함수를 호출, this로 사용할 객체 전달, arguments를 쉼표로 구분한 리스트 형식으로 전달

apply와 call 메서드의 본질적인 기능은 함수를 호출하는 것이며, 유사 배열 객체에 배열 메서드를 사용할 때 유용하다.



> 참고자료
>
> - [모던 자바스크립트 Deep Dive (도서)](http://www.yes24.com/Product/Goods/92742567)
> - [코어 자바스크립트 (도서)](http://www.yes24.com/Product/Goods/78586788)

