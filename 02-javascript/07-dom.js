//HTML이라 DOM 차이가 뭐예요?
//문서 객체 가져오기
console.log(document.body);

//태그로 가져오기
console.log(document.getElementsByTagName("h1"));

//class로 가져오기
console.log(document.getElementsByClassName("testClass"));

// name으로 가져오기
console.log(document.getElementsByName("testName"));

//id로 가져오기
console.log(document.getElementById("testId"));

//querySelector(선택자)
//querySelectorAll(선택자)
// -> 이 두 가지만 아셔도 괜찮아요!
console.log(document.querySelector("#testId2"));
console.log(document.querySelectorAll("div"));

// 문서 객체 조작하기
// textContent와 inerHTML의 차이는?
// textContent는 문자 그대로, innerHTML은 태그는 태그로 인식

const divs = document.querySelectorAll("div");
divs[0].textContent = "<span>안녕하세요</span>";
divs[1].innerHTML = "<span>안녕하세요</span>";

// 속성 조작
const editDiv = document.querySelector("#testId");
editDiv.setAttribute("data-test", "테스트"); //속성 추가 및 수정
console.log(editDiv.getAttribute("data-test"));//속성 값 가져오기
editDiv.removeAttribute("data-test"); //속성 삭제

//텍스트 출력
const result1 = document.querySelector("#result1");
function printText(){
 result1.textContent = "안녕하세요";
};

//input 값 출력
const result2 = document.querySelector("#result2");
const customer = document.querySelector("#customer");
const printInputValue = function(){
   result2.textContent = customer.value;
};

//문자열 길이 출력
const result3 = document.querySelector("#result3");
const text = document.querySelector("#text");
const stringLength = () => {
    result3.textContent = text.value.length;
};

// 스타일 조작
editDiv.style.color = "orange";
editDiv.style.backgroundColor ="yellow";

// div 색상 변경
const colorBox = document.querySelector("#colorBox");
const changeColor = () => {
    colorBox.style.backgroundColor="yellow";
};

// classList 조작
const div2 = document.querySelector("#testId2");
div2.classList.add("active");
console.log(div2.classList.contains("active")); //해당 클래스명을 가지고 있니?
div2.classList.remove("active"); //클래스 삭제
console.log(div2.classList.contains("active")); //false
div2.classList.toggle("active"); //있으면 삭제, 없으면 추가

//클래스 토글
const result4 = document.querySelector("#result4");
const toggleClass = () => {
result4.classList.toggle("toggle");
if(result4.classList.contains("toggle")){

}
console.log(div2.classList.contains("active"));
div2.classList.toggle("active"); 
}

// 문서 객체 추가 / 삭제
const testId3 = document.querySelector("#testId3");
// testId3.innerHTML = "<p>택스트 추가</p>"
const p = document.createElement("p"); // p 태그 생성
p.textContent = "텍스트 추가"; // <p>텍스트 추가</p>
testId3.appendChild(p);

const pTarget = document.querySelector("#testId3 p");
pTarget.remove();

// 문자열 분리 ul 출력
const la = document.querySelector("#la");
const result5 = document.querySelector("#result5");
const stringsp = () => {
  const arr = la.textContent.split(",");
  const ul = document.createElement("ul");
  for (const value of arr ) {
    const li = document.createElement("li");
    li.textContent = value.trim();
    ul.appendChild(li);
  }
result5.appendChild(ul);
};   

//li요소 추가&삭제
const list = document.querySelector("#list");
const addItem = () => {
    const li = document.createElement("li");
    li.textContent = "아이템 추가";
    list.appendChild(li);
    };
    const removeItem = () => {
        const item = document.querySelector("#list li");
        item.remove();
    };
