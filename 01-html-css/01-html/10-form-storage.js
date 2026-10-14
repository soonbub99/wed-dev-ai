//정규표현식 - /패턴/.test(문자열) -> true / false
// replace, split 등 문자열 함수와 사용 가능
console.log(`^ 시작 : ${/^H/.test("Hello")}`); // H로 시작
console.log(`$ 끝 : ${/o$/.test("hello")}`);  // o로 끝
console.log(`\d 숫자 : ${/\d/.test("1")}`);  // 숫자 (0~9)
console.log(`\w 영문,숫자, _ : ${/^\w$/.test("_")}`);
console.log(`. 한 문자 : ${/H.llo/.test("H$llo")}`);
console.log(`* 0회 이상 : ${/abc*d/.test("abcccccd")}`);
console.log(`+ 1회 이상 : ${/abc+d/.test("abccd")}`);
console.log(`? 0회 이상 : ${/abc?d/.test("abd")}`);
console.log(`[A-Za-z가-힣] 문자셋 : ${/^[A-Za-z가-힣]+$/.test("나aA")}`);
console.log(`{2,4} 반복 : ${/^a{2,4}$/.test("aaaa")}`);
console.log("사과, 바나나, 오렌지" .split(/,/));
console.log("010-1234-5678" .replace(/-/g,"")); //global(전부 의미함)
// 입력할 때마다 검사 -> 회원가입(두번째 프로젝트)
const phoneCheck = document.querySelector("#phoneCheck");
document.querySelector("#phone").addEventListener("input", (e) => {
   if (/^010-\d{4}-[0-9]{4}$/.test(e.target.value)) {
    phoneCheck.textContent ="OK";
    phoneCheck.style.color = "green";
   } else {
    phoneCheck.textContent = "형식이 맞지 않아요 ㅠㅠ";
    phoneCheck.style.color = "red";
   }
});
//Wed Storage - setItem(키,값) : 저장, getItem(키) : 가져오기,
//  removeItem(키) : 삭제, clear() : 전부 삭제

document.querySelector("#saveSession").addEventListener("click", () => {
    sessionStorage.setItem("visit", "오늘 처음 방문");
});
document.querySelector("#saveLocal").addEventListener("click", () => {
    // JSON.stringify로 객체 -> 문자열 변환
    localStorage.setItem("profile", JSON.stringify({name: "테스트", age: 10 }));
});
const result = document.querySelector("#result");
document.querySelector("#readLocal").addEventListener("click", () => {
    // JSON.parse호 문자열 -> 객체 변환
    const profile = JSON.parse(localStorage.getItem("profile"));
    result.textContent = profile;
});
document.querySelector("#removeLocal").addEventListener("click", () => {
    localStorage.removeItem("profile");
});
document.querySelector("#clear").addEventListener("click", () => {
    localStorage.clear();
});