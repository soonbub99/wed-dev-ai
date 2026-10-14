import express from "express";

const app = express();

app.get("/", (req,res) => {
    res.send("express 시작!!!");
});

app.listen(4000, () => {
    console.log("서버 실행 중 : http://localhost:4000");
});

/*
브라우저(React) -- HTTP 요청 --> Express서버 --> pg --> Supabase DB
              <-- HTTP 응답 (JSON) ---
HTTP
   - 브라우저와 서버가 주고받는 약속
   - 요청 하나에 응답 하나
   - 요청 = 메서드 + 주소 + (필요하면 본문)
   - 응답 = 상태 코드 + 본문 (JSON -JavaScript의 배열과 객체 형태)

   http://localhost:4000/api/cars?q=스포티지
   - http:// 프로토콜. 어떤 약속으로 말할지 (https : HTTP + 암호화)
   - localhost 호스트. 어느 컴퓨터에 요청할지
     - "지금 쓰고 있는 이 컴퓨터 자신" (IP로는 127.0.0.1)
   - :4000 포트. 이 컴퓨터 안의 어느 프로그램 문으로 들어갈지 지정
   - /api/cars 경로. 서버 안에서 무엇을 달라는지
   - ?q=스포티지 쿼리스트링. 덧붙이는 조건

API
     - 프로그램끼리 대화하는 창구
     - 화면(React)이 요청하는 주소들의 모음
     
REST API
     - API를 만드는 대표 규칙
     - 주소는 "무엇"을 가리키는지 : /api/cars (차 목록), /api/cars/1
     - 메서드는 "무엇"을 할지 : 같은 주소라도 GET이면 조회, DELETE면 삭제
     - RESTful : 규칙을 잘 지켰을 때 쓰는 말

CRUD와 메서드
        SQL      HTTP 메서드
Create  insert   POST
Read    select   GET
Update  update   PATCH - 일부 / PUT - 전체
Delete  delete   DELETE

상태코드
200-성공, 201-추가
400-요청 잘못됨, 401-인증 문제, 404-없음
500-서버가 잘못됨

*/ 