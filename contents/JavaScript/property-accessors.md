---
date: '2021-09-28'
title: '접근자 프로퍼티 | 자바스크립트'
tags: ['JavaScript', 'Study']
summary: '프로퍼티에는 무엇이 있는지 알아보고, 접근자 프로퍼티에 대해 이해하기'
thumbnail: '../thumbnails/thumbnail_property-accessors.jpg'
---

## 데이터 프로퍼티와 접근자 프로퍼티

자바스크립트 객체의 프로퍼티는 데이터 프로퍼티와 접근자 프로퍼티로 구분할 수 있다.

- 데이터 프로퍼티 (data property)

  : **키와 값**으로 구성된 일반적인 프로퍼티 (값으로 함수가 올 수 있다, 이를 **메서드**라 함)

- 접근자 프로퍼티 (accessor property)

  : 자체적으로 **값을 갖지 않고, 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자 함수(getter/setter 함수)**로 구성된 프로퍼티



이름의 저장 및 호출 예시

```js
const person = {
	// 데이터 프로퍼티
	firstName: 'Alex',
	lastName: 'Lee',
	
	// 접근자 프로퍼티
	get fullName() {	// getter 함수
		return `${this.firstName} ${this.LastName}`;
	},
	
	set fullName(name) {	// setter 함수
		[this.firstName, this.lastName] = name.split(' ');
	}
}
```

```js
// 데이터 프로퍼티를 통한 프로퍼티 값의 참조
console.log(person.firstName)	// Alex

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장 및 참조
person.fullName = 'Kanghyun Lee';
console.log(person);	// {firstName: 'Kanghyun', lastName: 'Lee'}

console.log(person.fullName);	// Kanghyun Lee
```



## 프로퍼티 어트리뷰트 (Property Attribute)

자바스크립트 엔진은 프로퍼티 생성 시 프로퍼티 어트리뷰트(property attribute)를 기본값으로 자동 정의한다.

### 데이터 프로퍼티

- `[[Value]]`: 프로퍼티 키를 통해 프로퍼티에 접근하면 반환되는 값
- `[[Writeable]]`: 값의 변경 가능 여부 (boolean)
- `[[Enumerable]]`: 열거 가능 여부 (boolean, false 시 `for.. in`, `Object.keys` 메서드로 열거x)
- `[[Configurable]]`: 재정의 가능 여부(boolean, false 시 삭제와 프로퍼티 어트리뷰트 값의 변경x)

### 접근자 프로퍼티

- `[[Get]]` : 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 읽을 때 호출되는 접근자 함수 (getter 함수가 호출, 프로퍼티 값이 반환)
- `[[Set]]`: 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 저장할 때 호출되는 접근자 함수(setter 함수 호출, 결과가 프로퍼티 값으로 저장됨)

- `[[Enumerable]]`: 열거 가능 여부

- `[[Configurable]]`: 재정의 가능 여부



## 접근자 프로퍼티 이해하기

데이터 프로퍼티는 자바스크립트에서 일반적으로 사용해왔기 때문에 익숙하지만 접근자 프로퍼티는 왜 필요한지 쉽게 와닿지 않는다. 아래 예제들과 함께 알아보자.



### 데이터 무결성을 지키기 위해

예제

```js
let user = {
  get age() {
    return this._age;
  },

  set age(value) {
    if (age < 1) {
      alert("올바른 값을 입력해주세요.");
      return;
    }
    this._age = value;
  }
};

user.age = 24;
user.age = -24;	// 너무 짧아 입력되지 않음

console.log(user.name);	// Kanghyun
```

위 예제처럼 올바르지 않은 값이 객체 프로퍼티의 값으로 들어올 경우, 발생할 수 있는 오류를 방지할 수 있다.



### 호환성 향상

접근자 프로퍼티는 getter와 setter를 사용해 데이터 프로퍼티의 행동과 값을 원하는 대로 조정할 수 있게 해준다는 점에서 유용하다.

birthday로 age를 만들어 사용자를 나타내는 객체 생성자 예제

```js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

  // Object.defineProperty로 프로퍼티 생성
  Object.defineProperty(this, "age", {
    get() {
      const todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear() + 1;
    }
  });
}

const user1 = new User("Kanghyun", new Date(1998, 11, 7));
console.log(user1.age);	// 24
```

age라는 접근자 프로퍼티(getter 함수)를 만들어, 기존 프로퍼티와 age 프로퍼티를 모두 사용할 수 있다.



> 참고자료
>
> - [모던 자바스크립트 Deep Dive (도서)](http://www.yes24.com/Product/Goods/92742567)
> - https://ko.javascript.info/property-accessors