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

const App = () => {
  const title = "정비노트"
  // waiting = 현재 값, setWaiting = 값을 바꾸는 함수, 0 = 처음 값
  let [waiting, setWaiting] = useState(0);
    return (
      //  Fragment : 화면에 아무 태그도 만들지 않으면서
      //             여러 요소를 하나로 묶어 주는 투명한 포장지
      // <Raact.Fragment> --> <>로 사용 가능함
  <>
    <header className ="header" style={{ color: "red" }}>
      <h1>{title}</h1>
    </header>
    <main className="main">
      <search className="sereen">
        <h2>접수 대기</h2>
        <p>대기 중인 차량 : {waiting}대</p>
        <button onClick={()=> setWaiting( waiting +1 )}>한 대 접수</button>
      </search>
      <section className="screen">
        <label htmlFor="name">이름</label>
        <input id="name" type="text" />
      </section>
    </main>
  </>
  );
};

export default App;
