---
date: '2021-10-13'
title: 'closure | 자바스크립트'
tags: ['JavaScript', 'Study']
summary: '함수와 그 함수가 선언된 렉시컬 환경과의 조합인 클로저 이해하기'
thumbnail: '../thumbnails/thumbnail_closure.jpg'
---

> MDN 정의)
>
> "A closure is the combination of a function and the lexical environment within which that function was declared." 
>
> 클로저는 함수와 그 함수가 선언된 렉시컬 환경과의 조합이다.

클로저를 이해하기 위해서는 자바스크립트가 **렉시컬 스코프**를 따르는 프로그래밍 언어라는 것을 알고 있어야 한다.



## 1. 렉시컬 스코프

자바스크립트 엔진은 함수를 어디서 호출했는지가 아닌, **어디에 정의**했는지에 따라 상위 스코프를 결정한다. 이를 렉시컬 스코프라 한다.

```js
const x = 1;

function test1() {
    console.log(x);
}

function test2() {
    const x = 10;
    test1();
}

test1();	// 1
test2();	// 1, 10이 아님!!
```

만약 자바스크립트가 상위 스코프를 결정할 때 함수가 정의된 곳이 아닌 호출된 곳에서 결정되었다면 두 번째 결과는 10이 되었을 것이다.

(아래 내용을 이해하기 위한 [실행 컨텍스트](https://kanghyun.netlify.app/blog/2021-10-11/execution-context) 글 읽으러가기)

렉시컬 스코프에 대해 더 정확히 이야기하자면, **렉시컬 환경의 `Outer Lexical Environment Reference` (외부 렉시컬 환경에 대한 참조)에 저장할 참조값, 즉 상위 스코프에 대한 참조는 함수 정의가 평가되는 시점에 함수가 정의된 환경(위치)에 의해 결정된다.**



그렇다면 함수가 호출될 때마다 매번 실행 컨텍스트가 생성될텐데, 자신이 정의된 환경을 어떻게 알 수 있는 것일까?

그 방법은 바로 **함수 객체의 내부 슬롯 `[[Environment]]`**를 이용하는 것이다. 

함수 정의가 평가되어 함수 객체를 생성할 때, 자신이 정의된 환경에 의해 결정된 상위 스코프의 참조를 함수 객체 자신의 내부 슬롯 `[[Environment]]`에 저장한다. 그리고 함수가 호출될 때, 생성될 실행 컨텍스트의 함수 렉시컬 환경의 `Outer Lexical Environment Reference` (외부 렉시컬 환경에 대한 참조)에 저장될 참조값으로 사용한다.



## 2. 클로저와 렉시컬 환경

**외부함수보다 중첩 함수가 더 오래 유지되는 경우, 중첩 함수는 이미 생명 주기가 종료한 외부 함수의 변수를 참조할 수 있다. 이러한 중첩 함수를 클로저라고 부른다.**

```js
const x = 1;

function test() {
	const x = 10;
    const innerTest = function () {
        console.log(x);
    }
    return innerTest;
}

const myFun = test();
myFun();	// 10
```

test 함수를 호출하면 innerTest 함수를 반환하고 생명 주기(life cycle)가 마감된다. 즉, test 함수의 실행 컨텍스트가 실행 컨텍스트 스택에서 제거되는 것인데, 어떻게 myFun 함수는 test 함수 안에서 선언된 x에 계속 접근할 수 있을까?

그 이유는 **test 함수의 실행 컨텍스트는 실행 컨텍스트 스택에서 제거되지만, test 함수의 렉시컬 환경(Lexical Environment)까지 제거되는 것은 아니기 때문**이다.

만약 innerTest 함수가 test 함수 내부에 존재하지 않았다면, test 함수의 실행 컨텍스트가 제거되고 렉시컬 환경(Lexical Environment)은 garbage collector에 의해 제거된다. 하지만, **innerTest 함수의 `[[Environment]]`에서 test 함수의 렉시컬 환경을 참조**하고 있어, garbage collector에 의해 처리되지 않는 것이다.

여기서 메모리가 걱정이 될 수 있는데, 모던 자바스크립트 엔진은 최적화가 잘 되어 있어서 클로저가 참조하고 있지 않는 식별자는 기억하지 않으니 걱정하지 않아도 된다!



## 3. 클로저의 활용

**클로저는 상태(state)를 안전하게 변경하고 유지하기 위해 사용한다.**

즉, 상태가 의도치 않게 변경되지 않도록 **상태를 안전하게 은닉**하고 **특정 함수에게만 상태 변경을 허용**하기 위해 사용한다.



```js
let num = 0;	// 상태

const increase = function() {		// 상태 변경 함수
    return ++num;
};

const decrease = function() {		// 상태 변경 함수
    return --num;
};

console.log(increase());	// 1
console.log(increase());	// 2
console.log(decrease());	// 1
```

위 코드는 동작에 큰 문제는 없지만, num 변수가 전역 변수를 통해 관리되고 있어 누구나 접근 및 변경할 수 있다. 즉, 의도치 않게 상태가 변경될 수 있고 이로 인한 오류가 발생할 수 있다.

따라서 num 변수, 즉 상태를 안전하게 변경하고 유지하기 위해 increase, decrease 함수만이 num 변수를 참조하고 변경할 수 있게 만들어야 한다.

```js
const counter = (function() {	// 즉시 실행 함수
    let num = 0;
    
    return function() {
        return {
        	increase() {
                return ++num;
            }
            decrease() {
                return --num;
            }
        }
    };
}());

console.log(counter.increase());	// 1
console.log(counter.increase());	// 2
console.log(counter.decrease());	// 1
```

위 코드를 실행하면 즉시 실행 함수가 호출되고, 즉시 실행 함수가 반환한 함수가 counter 변수에 할당된다. counter 변수에 할당된 함수는 자신이 정의된 위치에 의해 결정된 상위 스코프인 즉시 실행 함수의 렉시컬 환경을 기억하는 클로저이다.

이제 num 변수는 외부에서 직접 접근할 수 없는 은닉된 private 변수이므로 의도치 않은 변경을 막을 수 있어 안정적인 프로그래밍이 가능해졌다.



> <u>캡슐화</u>(encapsulation)는 객체의 상태를 나타내는 프로퍼티와 프로퍼티를 참조하고 조작할 수 있는 동작인 메서드를 하나로 묶는 것을 말한다. 캡슐화는 객체의 특정 프로퍼티나 메서드를 감출 목적으로 사용하기도 하는데 이를 <u>정보 은닉</u>(information hiding)이라고 한다.
>
> 객체의 상태가 변경되는 것을 방지해 **정보를 보호**하고, 객체 간의 상호 의존성, 즉 **결합도를 낮추는 효과**가 있다.





> 참고자료
>
> - [모던 자바스크립트 Deep Dive (도서)](http://www.yes24.com/Product/Goods/92742567)

