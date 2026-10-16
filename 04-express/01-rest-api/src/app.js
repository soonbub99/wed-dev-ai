/*
폴더 들어가는 건 : cd 폴더명(server 또는 backend)
    나오는 건 : cd ..

package.json 생성 : npm init -y
package.json에서 고쳐야 되는 부분 (확인해야 되는 부분)
- "type": "module"
- "scripts": { "dev": "nodemon src/app.js" }
- "main" : "index" <-- 있다면 삭제해주세요!

패키지 설치
npm i express pg dotenv
npm i -D nodemon

- express : 서버
- pg : DB 접속
- dotenv : .env 파일 읽기
- nodemon : 저장하면 서버 자동 재시작 (개발할 때 쓰는 도구라 -D)

폴더와 파일 구조
backend/
   - node_moduoes <-무수히 많은 설치한 패키지에 해당하는 폴더와 파일들이 존재
     src <-소스 코드들이 들어가는 폴더 (이거만 신경쓰시면 됩니다.!)
     .env <- DB_URL (보안상의 이유)
     .gitignore <- .env와 node_modules (깃허브에는 올리지 않기 위해)
     package-lock.json
     package.json

     --> node_modules랑 package-lock.json은
         package.json에 의해 npm i만 하면 언제든 설치 가능합니다.

*/
// import는 설치한 패키지나 외부 직접 만들 파일들 가져오기 위해

import express from "express"; //서버
import pg from "pg"; // DB 연결
import "dotenv/config"; // .env 파일 읽어냄

const app = express(); // 서버를 만드는 함수 - 서버 1대

// DB 연결
// Pool : DB로 가는 연결을 열어 놓는 통로
const pool = new pg.Pool({
  // connectionString: 데이터베이스 URL - .env의 DB_URL 가져옴
  connectionString: process.env.DB_URL,
  // ssl : 인터넷으로 주고받는 데이터를 암호화해서 중간에 훔쳐 읽지 못하게 하는 기술
  ssl: { rejectUnauthorized: false },
});

// use : 모든 요청이 라우트에 닿기 전에 먼저 거치는 공통 처리를 등록
app.use(express.json()); // 요청 본문(JSON)을 읽어 req.body에 추가

// 라우트(route) : 이 주소로 이 메서드가 오면 이 함수를 실행해라!
// app.get("주소", async (req, res) => {}), app.post, app.put, app.delete
// async : 이 함수 안에 시간이 걸리는 일 (DB 응답)이 있어서 기다릴 수 있게
// req (request, 요청) : 손님이 보낸 요청서. 누가 무엇을 보냈는지 들어있음
// -> req.params :  /api/cars/1  <- 주소 안의 바뀌는 값을 넣어요 (PK -id)
//    ---> 해당 데이터를 꼭 집엇 가져와야 할 때 (get, put, delete)
// -> req.query : /api/cars?q=스포티지  <- 물음표 뒤에 키=값
//    ---> 가져오는 값이 필수가 아닌 경우 (get)-> 검색이나 필터
// -> req.body : 본문으로 보낸 데이터(JSON) -> post, put
// res (response, 응답) : 손님에게 답하는 도구
// -> res.status(상태코드).json(본문 - JSON)
// 차량 목록 - select * from cars GET http://localhost:4000/api/cars
app.get("/api/cars", async (req, res) => {
  // await pool.query("SQL문 - select, insert, update, delete") <- SQL 주문서 전달
  // await : 주문한 음식이 나올 때까지 기다림
  // const { rows } : 결과 묶음에서 rows (결과 행들)만 꺼내서 변수에 담음
  const { rows } = await pool.query("select * from cars");
  res.status(200).json(rows);
});

// 정비이력 목록(maintenance_records) 목록
//  GET http://localhost:4000/api/records
app.get("/api/records", async (req, res) => {
  const { rows } = await pool.query(
    `select plate, name, service_date, item, memo, cost
     from maintenance_records m 
     join cars c on c.id = m.car_id`,
  );
  res.status(200).json(rows);
});
// 차량  정보 1개 조회
// GET http://localhost:4000/api/cars/1
app.get("/api/cars/:id", async (req, res) => {
  // :id는 주소에서 바뀌는 자리 - /api/cars/3 이면 id는 '3'이고 req.params.id로 꺼낸다
  const id = Number(req.params.id);
  const { rows } = await pool.query(`select * from cars where id = ${id}`);
  // 정보가 어차피 1개니까 배열 중에 첫번째 값(인덱스 0)만 가죠온다
  res.status(200).json(rows[0]);
});

// 정비이력(maintenance_records) 1개 조회 (cars pk id로 조회)
// GET http://localhost:4000/api/records/1
app.get("/api/records/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { rows } = await pool.query(
    `select * from maintenance_records where id = ${id}`,
  );
  res.status(200).json(rows[0]);
});

// 정비이력 차량번호로 조회 (심화) - 결과가 여러개일 수도 있고 아닐 수도 있고
// GET http://localhost:4000/api/records/car/1



// ---> 개인 프로젝트에서는 테이블 1개에
// 샘플 데이터 몇개만 추가해서 확인해보는 것도 좋습니다!

// 차량추가 - POST http://localhost:4000/api/cars
// insert into cars(plate, name, car_type, production_year, fuel, mileage)
// Values('111가 1234','투싼','SUV','2025','가솔린','10')
app.post("/api/cars", async (req, res) => {
  // 예외처리 : DB가 죽어도 서버는 죽지 않게
  try {
    const { plate, name, car_type, production_year, fuel, mileage } = req.body;
    await pool.query(
      `insert into cars(plate, name, car_type, production_year, fuel, mileage) 
    values($1, $2, $3, $4, $5, $6)`,
      [plate, name, car_type, production_year, fuel, mileage],
    );
    res.status(201).json({ massage: "차량 등록 완료" });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ massage: "이미 있는 번호판입니다" });
    }
    res.status(500).json({ message: "차량 등록하지 못했습니다" });
  }
});

// listen : 서버 켜기 - npm run dev : nodemon src/app.js  (예;가계오픈입니다)
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
