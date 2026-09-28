// 1. 매개변수 X, 리턴값 X
function sayHello() {
  console.log("안녕하세요!!");
}

sayHello(); // 함수 호출
sayHello();

// 2. 매개변수(parameter) O, 리턴값 X
// 기본값이 없으면 undefined
function greet(name = "게스트") {
  console.log(`${name}님, 안녕하세요!`);
}
greet("나혜진");
greet("변예담");
greet();

// 3. 매개변수 X, 리턴값 O
// return : 함수 호출 결과, 함수 종료
function getNumber() {
  return 1049;
}
console.log(getNumber());

// 4. 매개변수 o, 리턴값 o
function add(a, b) {
  return a + b;
}
console.log(add(10, 20));
console.log(add(30, 50));
//1부터 100까지의 랜덤 숫자를 생성하고
// 변수의 유효범위(Scope)
const num1 = 100; // 전역변수
function sample1() {
  const num1 = 200; // 지역변수 -> 함수 안에서만 유효
  console.log(`sample1 내부 : ${num1}`); // 200 -> 100
}
sample1();
console.log(`sample1 외부 : ${num1}`); // 100

// 선언적 함수(Function Declaration)
// 호이스팅 : 선언 이전에 호출 가능
console.log(multiply(3, 4));
function multiply(a, b) {
  return a * b;
}

// 익명 함수(Function Expression)
// 함수 이름이 없음, 변수에 할당
const subtract = function (a, b) {
  return a - b;
};
console.log(subtract(5, 8));

// 화살표 함수(Arrow Function)
// function 대신 => 사용
const divide = (a, b) => a / b;
console.log(divide(12, 3));

// 콜백 함수
function callFunc(callback) {
  console.log("함수 호출 전~");
  callback();
  console.log("함수 호출 후!");
}
function call() {
  console.log("안녕하세요~ 콜백 함수 호출!");
}
callFunc(call);

// 배열 관련 콜백 함수들
const numbers = [1, 2, 3, 4, 5];
// forEach - 배열의 각 요소마다 콜백 실행
numbers.forEach((value, index, array) => {
  console.log(value, index, array);
});

// map - 각 요소를 콜백으로 변형해서 "새 배열"을 만들어 반환
const doubled = numbers.map((num) => {
  return num * 2;
});
console.table(doubled);

// filter - 콜백이 true를 반환하는 요소만 골라서 "새 배열"을 만들어 반환
const even = numbers.filter((value) => value % 2 === 0);
console.log(even);

// reduce - 배열의 각 값들을 누적하여 하나의 값으로 반환
// accumulator - 누적된 값, value, index, array
const sum = numbers.reduce((acc, value) => {
  return acc + value;
}, 0); // acc = 0 초기값
console.log(sum);
