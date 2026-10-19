/*
  npm create vite 프로젝트명
  - Reacr, JavaScript 선택

  소스코드들은 src 폴더 안에 모두 들어있다

  실행 npm run dev

  화살표 함수 const 함수명 = () => { return }

  JSX(JavaScript XML) : JavaScript의 문법 확장
   -> HTML 같은 태그를  JavaScript 안에 쓸 수 있게 한 문법

   - .js / .jsx <-- jsx 문법을 사용한다면 (html 태그가 들어가는 파일이라면)

   JSX 규칙
    1. return 안은 부모 하나 <></>
    2. class 대신 className, for 대신 htmlFor
    3. { 변수 또는 계산식 } 중괄호 안은 JavaScript 값
    4. style은 객체로 style={{ color: 'red' }} -> 가급적으로  css 파일로 분리

    useState : 대표적인 상태 관리 리액트에서 제공하는 도구(hook)

    가상 DOM(Virtual DOM) : 리액트는 가상 DOM을 사용하여 브라우저의 실제 DOM과 상호작용
*/
import { useState } from "react";
import Counter from "./components/Counter.jsx";

const App = () => {
  const title = "정비노트";
  // waiting = 현재 값, setWaiting = 값을 바꾸는 함수, 0 = 처음 값
  // 값을 바꾸는 함수명은 앞에 정의한 변수에 set을 붙여서 만든다
  const [customer, setCustomer] = useState("");

  return (
    //  Fragment : 화면에 아무 태그도 만들지 않으면서
    //             여러 요소를 하나로 묶어 주는 투명한 포장지
    // <Raact.Fragment> --> <>로 사용 가능함
    //페이지별 body 태그 내부에 있는 태그들 그대로 와도 괜찮다!
    // 다만 JSX 규칙을 지켜야 되는 부분만 수정할 뿐
    <>
      <header className="header" style={{ color: "red" }}>
        <h1>{title}</h1>
      </header>
      <main className="main">
        <Counter label="접수 대기" />
        <Counter label="정비 중" />
        <section className="sereen">
          <label htmlFor="name">이름</label>
          <input
            id="name"
            type="text"
            onChange={(e) => setCustomer(e.target.value)}
          />
          <p>손님 : {customer}</p>
        </section>
      </main>
    </>
  );
};

export default App;
