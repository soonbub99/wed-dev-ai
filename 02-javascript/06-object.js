/* 
사람{
   이름,
   나이,
   사는곳,

   // 행동들 => 함수 (기능)
   일어난다,
   밥먹는다,
   씻는다,
   옷입는다,
   나간다

   } 
*/
// 변수끼리 서로 관련이 있다는게 보이지
const name = "성시원";
const age = 10;
const addr = "서울";
// 벼열은 서로 관련이 있다는게 0, 각 값들이 뭘 의미하는지 모름
const personArr = ["성시원", 10, "서울"];

const person = {
  // 변수 (키 : 값)
  name: "성시원",
  age: 10,
  addr: "서울",
  // 함수
  hello() {
    // this : 본인 자체
    console.log(`안녕하세요, ${this.name}입니다.`);
  },
};

console.log(person);
console.log(person.name);
person.hello();

// 빈 객체와 속성/함수 추가
const person1 = {}; // new object(); - 거의 안 씀 !
person1.name = "홍순법";
person1["age"] = 9;
person1.hello = function () {
  console.log(`나는 ${this.name}이고, 나이는 ${this.age}살이야`);
};
person1.hello();
// 일반 함수와 화살표 함수의 this 차이는?
const person2 = {
  name: "나혜진",
  hello: function () {
    console.log(`익명 함수 : ${this.name}`);
  }, //익명함수는 hello(){} 축약 가능
};
const person3 = {
  name: "김미래",
  //객체 함수로 화살표 함수 비권장
  hello: () => {
    console.log(this); // 전역의 객체인 Window
    console.log(`화살표 함수: ${this.name}`);
  },
};
person2.hello();
person3.hello();

// 객체 구조분해 할당
const { name: name1, age: age1 } = person1;
console.log(name1, age1);

// 생성자 함수, 클래스 -> 변수와 함수는 소문자, 클래스는 대문자!
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.hello = function () {
    console.log(`안녕? ${this.name}야, 나이는 ${this.age}살이야`);
  };
}
const p1 = new Person("김진아", 5);
p1.hello();

// 함수 형식보다는 클래스 형식을 더 사용!
class Person2 {
  // 객체 생성시 호출
  constructor() {
    this.name = name;
    this.age = age;
  }
  hello() {
    console.log(`안년 ? ${this.name}야, 나이는 ${this.age}살이야`);
  }
}

person2.hello();

// 내장 객체
// Set
const arr = [1, 2, 2, 3, 3, 4, 4, 4, 5];
console.log(arr);
const unique = new Set(arr);
console.log(unique);
console.log([...unique]); // 다시 배열로

//Math- 계산용(수학적인 것들)
console.log(Math.max(5, 7, -1, -8)); // 최대값
console.log(Math.min(5, 7, -1, -8)); // 최소값
console.log(Math.round(2.897)); // 3-반올림
console.log(Math.floor(2.897)); // 2-내림
console.log(Math.ceil(2.897)); // 3-올림
console.log(Math.random()); // 0~1 까지의 랜덤(소수점 포함)

// 1 ~ 10까지의 랜덤 숫자
// 0 <= Math.random() < 1
// *10
// 0 <= Math.random() * 10 < 10
console.log(Math.random() * 10);
// Math.floor()
console.log(Math.floor(Math.random() * 10)); //0~9
// + 1
// 1 <= Math.random() * 10+1<11
console.log(Math.floor(Math.random() * 10) + 1); //1~10

// 5~15까지으 랜덤 숫자
// 5 <= Math < 16 뒤의 가격과의 차이
console.log(Math.floor(Math.random() * 11) + 5);

// Date 객체
const now = new Date();
console.log(now);
// gatMonth : 0~11월
console.log(
  `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일`,
);

// const date = new Date(2027, 0, 28, 14, 20, 0);
const date = new Date("2027-01-28T14:20:00");
console.log(date.toLocaleDateString("ko-KR"));

//Timer
// 1000=1초
//일정 시간 후 1회 실행
setTimeout(() => {
  console.log("3초 후 실행!");
}, 3000);

//일정 시간마다 반복 실행
let sec = 0;
setInterval(() => {
  console.log(`${++sec}초!`);
}, 1000);

if (sec === 5) {
  clearInterval(timer);
}

// JSON(JataScript Object Notation)
// 서버에서  클라이언트로 JSON 객체로 통신
// 객체 -> 문자열
const jsonStr = JSON.stringify(person);
console.log(typeof jsonStr);
// 문자열 -> 객체
const jsonObj = JSON.parse(jsonStr);
console.log(typeof jsonObj); // opject
