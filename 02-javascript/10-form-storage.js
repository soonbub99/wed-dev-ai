//정규표현식 - /패턴/.test(문자열) -> true / false
// replace, split 등 문자열 함수와 사용 가능
console.log(`^시작 : ${/^H/.test("Hello")}`); // H로 시작
console.log(`$ 끝 : ${/o$/.test("Hello")}`); // o로 끝
console.log(`\d 숫자 : ${/^\d\d$/.test("12")}`); // 숫자 (0~9)
console.log(`\w 영문,숫자,_ : ${/^\w$/.test("_")}`);
console.log(`. 한 문자 : ${/H.llo/.test("H1llo")}`); //.은 숫자든 글자 든 특수문자 든 들어간야 물음
console.log(`*0회 이상 : ${/abc*d/.test("abcccd")}`); // 0이상이면 true
console.log(`+1회 이상 : ${/abc*d/.test("abcd")}`); // 없으면 false이고 있으면 true
console.log(`?0~1회 이상 : ${/abc*d/.test("abcd")}`); // 한개가 돼든 아예 없든 true
console.log(`[A-Za-z가-힣]문자셋 : ${/^[A-Za-z가-힣]+$/.test("가aFG다")}`);
console.log(`{2,4} 반복 : ${/^a{2,4}$/.test("aaaaa")}`); // 숫자는 무족건 붙여 쓰야함
console.log("사과, 바나나, 오렌지".split(/,/));
console.log("010-1234-5678".replace(/-/g,"")); //global (전부)