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
import cors from "cors";

const app = express(); // 서버를 만드는 함수 - 서버 1대

// DB 연결
// Pool : DB로 가는 연결을 열어 놓는 통로
const pool = new pg.Pool({
  // connectionString: 데이터베이스 URL - .env의 DB_URL 가져옴
  connectionString: process.env.DB_URL,
  // ssl : 인터넷으로 주고받는 데이터를 암호화해서 중간에 훔쳐 읽지 못하게 하는 기술
  ssl: { rejectUnauthorized: false },
});

// cors : 이 주소에서 오는 요청은 받아도 된다고 브라우저에 허락
app.use(cors({ origin: "http://localhost:5173" }));

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
  /* 백앤드에서 날짜 처리시
  const { rows: cars } = await pool.query(`select_id, plate, name, car_type,
                                           production_year, fuel, mileage,
                                           to_char(latest_service_date, 'YYYY-MM-DD') as service_cate
                                           from cars`);
  */
  const { rows: cars } = await pool.query(`select * from cars`);
  // 방법 1. JS에서 합치기
  // 차마다의 정비 건수
  const { rows: counts } =
    await pool.query(`select car_id, count(*) as service_count
                    from maintenance_records
                    group by car_id`);

  // 각 차에  맞는 개수를 찾아서  붙인다
  const rows = cars.map((car) => {
    // counts에서 car_id와 cars의 id가 같은 첫번째 항목을 찾아냄
    const found = counts.find((c) => c.car_id === car.id);
    return {
      ...car,
      service_count: found ? found.service_count : 0,
    };
  });

  res.status(200).json(rows);
});

// 정비이력 목록(maintenance_records) 목록
//  GET http://localhost:4000/api/records
//  GET http://localhost:4000/api/records?pl=218가 1826
app.get("/api/records", async (req, res) => {
  const plate = req.query.plate; // undefined 이거나 아니거나 -> 조건문
  const { rows } = await pool.query(
    `select plate, name, service_date, item, memo, cost
             from maintenance_records m 
             join cars c on c.id = m.car_id
             where plate = coalesce($1, plate)`,
    [plate],
  );
  /*
     const { rows } =
    await pool.query(`select plate, name, service_date, item, memo, cost
     from maintenance_records m 
     join cars c on c.id = m.car_id`
     ${plate ? "where plate = $1::text" : ""}`,
     plate ? [plate] : [],
     ); */
  /*
  let query tevt =`select plate, name, service_date, item, memo, cost
     from maintenance_records m 
     join cars c on c.id = m.car_id`;
  let values = [];
  if(plate !== undefined) {
       querytext += ` where plate = $1::text`;
       values.push(plate);
       }
    const { rows } = await pool.query(querytext, values); */
  res.status(200).json(rows);
});

// 차량  정보 1개 조회
// GET http://localhost:4000/api/cars/1
app.get("/api/cars/:id", async (req, res) => {
  // :id는 주소에서 바뀌는 자리 - /api/cars/3 이면 id는 '3'이고 req.params.id로 꺼낸다
  const id = Number(req.params.id);
  const { rows } = await pool.query(`select * from cars where id = $1`, [id]);
  // 정보가 어차피 1개니까 배열 중에 첫번째 값(인덱스 0)만 가죠온다
  res.status(200).json(rows[0]);
});

// 정비이력(maintenance_records) 1개 조회 (cars pk id로 조회)
// GET http://localhost:4000/api/records/1
app.get("/api/records/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { rows } = await pool.query(
    `select * from maintenance_records where id = $1`,
    [id],
  );
  res.status(200).json(rows[0]);
});

// ---> 개인 프로젝트에서는 테이블 1개에
// 샘플 데이터 몇개만 추가해서 확인해보는 것도 좋습니다!

// 차량추가 - POST http://localhost:4000/api/cars
// insert into cars(plate, name, car_type, production_year, fuel, mileage)
// Values('111가 1234','투싼','SUV','2025','가솔린','10')
app.post("/api/cars", async (req, res) => {
  const { plate, name, car_type, production_year, fuel, mileage } = req.body;
  // returning의 경우 해당하는 값이 바로 필요한 경우들 사용(대체로 PK인 id값)
  const { rows } = await pool.query(
    `insert into cars(plate, name, car_type, production_year, fuel, mileage) 
    values($1, $2, $3, $4, $5, $6) returning id, plate`,
    [plate, name, car_type, production_year, fuel, mileage],
  );
  res.status(201).json({ massage: "차량 등록 완료", rows: rows });
});

// 차량 수정
// PUT http://localhost:4000/api/cars/3
app.put("/api/cars/:id", async (req, res) => {
  const id = req.params.id;
  const { plate, name, car_type, production_year, fuel, mileage } = req.body;
  await pool.query(
    `update cars 
    set plate = $1, name = $2,
                  car_type=$3, production_year = $4,
                  fuel = $5, mileage = $6
    where id = $7`,
    [plate, name, car_type, production_year, fuel, mileage, id],
  );
  //res.status(200).json({message:"차량등록완료"});
  //status  부분을 생략함ㄴ 알아서 200 코드 성공 처리!
  //res.json({message: 차량등록완료});
  res.sendStatus(200); //상태 코드만 보내고자 할 때
});

// 차량 삭제
// DELETE http://localhost:4000/api/cars/2
// listen : 서버 켜기 - rpm run dev : nodemon src/app.js
app.delete("/api/cars/:id", async (req, res) => {
  const id = req.params.id;
  // rowCount : 해당 쿼리문을 실행했을 때 반영된 개수
  const { rowCount } = await pool.query(`delete from cars where id = $1`, [id]);
  if (rowCount === 0) {
    const err = new Error("그런 차량이 없어요 ㅠㅠ");
    err.status = 404;
    throw err; //에러를 일부로 발생시키는
  }
  /* if ( rowCount === 0) {
    return res.status(404).json({ message: "그런 차량이 없어요 ㅠㅠ"});
    } */
  res.sendStatus(204);
});

//라우트에서 난 오류가 전부 여기로 오기 때문에 라우트들 보다는 아래에 있으면 된다
//app.use 안에 파라미터가 4개면 에러 처리기로 인식한다
app.use((error, req, res, next) => {
  console.log(error);
  if (error.code === "23505") {
    // unique 위반
    return res.sratus(409).json({ message: "이미 존재하는 값입니다." });
  }
  if (error.status === 404) {
    return res.status(404).json({ message: error.message });
  }
  console.log(error);
  res.status(500).json({ message: "서버 문제 발생", error: error });
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
