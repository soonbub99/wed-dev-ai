-- car-service 데이터베이스 스키마 
-- 개발용 : 아래 drop이 표와 데이터를 지우고 처음부터 다시 만들기 때문에, 개발 중에만 쓰고 운영에서는 쓰지 말 것.
drop table if exists consultation_items;
drop table if exists consultations;
drop table if exists maintenance_schedules;
drop table if exists maintenance_records;
drop table if exists cars;

-- 차량: 모든 정비 기록, 일정, 상담이 이 표를 가리킨다.
create table cars (
  id bigint generated always as identity primary key,  -- 자동 번호, 다른 표가 차량을 가리킬 때 쓰는 값
  plate text not null unique,                          -- 번호판 (예: 12가 3456), 차량마다 하나라 중복 금지
  name text not null,                                  -- 차량 이름 (예: 그랜저 IG)
  car_type text,                                       -- 차종: 승용, SUV, 승합, 화물 (모르면 비워 둠)
  production_year integer,                             -- 연식 (예: 2019), 모르면 비워 둠
  fuel text,                                           -- 연료: 가솔린, 디젤, LPG, 하이브리드, 전기 (모르면 비워 둠)
  mileage integer not null default 0                   -- 주행거리(km), 입력하지 않으면 0
);
alter table cars enable row level security;

-- 정비 이력: 정비 한 건당 한 줄. 차량에 기록이 있으면 차량을 못 지움(기본 동작, 기록이 남아야 해서).
create table maintenance_records (
  id bigint generated always as identity primary key,  -- 자동 번호
  car_id bigint not null references cars(id),         -- 어느 차량의 정비인지 (cars.id를 가리키는 외래키)
  service_date date not null,                          -- 정비한 날짜 (시각은 저장하지 않음)
  item text not null,                                  -- 정비 내용 (예: 엔진오일 교환)
  cost integer not null check (cost >= 0),             -- 정비 비용(원), 소수점이 없는 정수, 음수 금지
  memo text                                            -- 선택 메모, 없으면 비워 둠
);
alter table maintenance_records enable row level security;

-- 정비 일정: 앞으로 할 정비. 대시보드의 "다가오는 일정"이 읽는다.
create table maintenance_schedules (
  id bigint generated always as identity primary key,  -- 자동 번호
  car_id bigint not null references cars(id),          -- 어느 차량의 일정인지
  due_at timestamptz not null,                         -- 정비 예정 날짜와 시각 (시간대 포함)
  item text not null,                                  -- 할 정비 내용 (예: 미션오일 교환)
  priority text not null default '보통'                -- 우선순위, 입력하지 않으면 '보통'
    check (priority in ('낮음', '보통', '높음')),
  done boolean not null default false                  -- 끝낸 일정인지, 처음에는 false
);
alter table maintenance_schedules enable row level security;

-- 고객 상담: 입고 한 번당 한 줄.
create table consultations (
  id bigint generated always as identity primary key,  -- 자동 번호
  car_id bigint not null references cars(id),         -- 어느 차량의 상담인지
  in_date date not null,                               -- 입고(또는 상담) 날짜
  contact text not null,                               -- 고객 연락처
  status text not null default '입고'                  -- 진행 상태, 입력하지 않으면 '입고'
    check (status in ('입고', '미입고', '출고'))
);
alter table consultations enable row level security;

-- 상담 항목: 상담 하나에 요청이 여러 개. 상담이 지워지면 항목도 의미가 없어서 cascade.
create table consultation_items (
  id bigint generated always as identity primary key,  -- 자동 번호
  consultation_id bigint not null                      -- 어느 상담의 항목인지
    references consultations(id) on delete cascade,
  customer_request text not null,                      -- 고객이 요청한 내용 (예: 브레이크 소리가 남)
  work_details text,                                   -- 실제로 할 작업 내용, 접수 때는 비워 둘 수 있음
  estimated_cost integer not null default 0             -- 예상 비용(원), 아직 모르면 0, 음수 금지
    check (estimated_cost >= 0)
);
alter table consultation_items enable row level security;
