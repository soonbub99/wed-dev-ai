import { useState } from "react";

//컴포너트 : 함수 하나가 화면 한 조각, jsv를 return하는 함수, 이름은 대문자로 시작
//props(properties) : 부모 컴포넌트가 자식 컴포넌트에게 넘겨 주는 값
// 단방향 데이터 흐름 : 데이터 흐름이 컴포넌트 계층 구조에서 위에서 아래로 흐른다
const Counter = ({ label }) => {
   const [waiting, setWaiting] = useState(0);
  return(
    <search className="sereen">
        <h2>{label}</h2>
        <p>대기 중인 차량 : {waiting}대</p>
        <button onClick={()=> setWaiting( waiting +1 )}>한 대 접수</button>
        <button onClick={()=> setWaiting(waiting-1)}>한 대 출고</button>
        <button onClick={()=> setWaiting(0)}>비우기</button>
      </search>
  );
};

export default Counter;