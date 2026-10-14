/*
모델링
1. 개념 : 관리할 대상과 관계, 서비스 규칙
 - 고객명, 고객전화, 음식명, 음식가격, 가게명, ...
2. 논리 : 대상별 항목, PK와 FK, 중복을 줄이는 구조( 정규화 )
 - 주문서 테이블, 고객 테이블, 가계 테이블, ... ( 1: N )
3. 물리 : 테이블 실질적으로 구성

DBMS(Database Management System) : 데이터베이스 관리 시스템
 - Oracle, MySQL, PostgreSQL, MariaDB ...

SQL(Structured Query Language)
: 관계형 데이터베이스에서 데이터를 조회하거나 조작하기 위해 사용하는 표준 검색 언어

DDL (Data=Definition Langugage) : 데이터 정의어
 - DBMS의 구조를 정의하거나 변경, 삭제하기 위해 사용하는 언어
 (CREATE : 생성, ALTER : 수정, EROP : 삭제 )

*/
-- CREATE TEBLE은 표 이름, 괄호 안의 열 이름과 자료형, 제약조건을 정한다.
/*
  자료형
  - bigint / int8 : 큰 범위의 정수, 보통 행 ID와 외래키에 사용 (PK/FK)
  - integer / int4 : 정수, 소수점 없는 값
  - text : 길이를 미리 정하지 않는 문자열
  - numeric(12, 0) : 정확한 숫자 (전체 12자리, 소수점 아래 0자리)
  - date : 날짜만
  - timestamptz : 날짜와 시간
  - boolean : true 또는 false

  제약조건
  - primary key (PK) : 각 행을 식별하여 null과 중복을 허용하지 않는다.(not null + unique)
  - references (FK, foreign key) : 다른 테이블의 키를 연결
  - not null : null 금지
  - unique : 값의 중복 금지
  - check : 값이 조건을 만족하는지 검사
  - default : 열을 생략할 때 채움
  - generated always as identity는 ID를 자동으로 만든다.
*/
create table stores(
   id bigint generated always as identity primary key,
   name text not null,
   addr text not null
);
-- RLS(Row Level Security)는 행 단위 접근 정책을 적요하는 PostgreSQL 기능
alter table stores enable row level security;

create table orders(
    id bigint primary key,
    cuwtomer_id bigint not null neferences customers(id),
    store_id bigint not null references stores(id),
    food_name text not null,
    food_price integer not null check (food_price >= 0),
    quantity integer not null check (quantity > 0),
    ordered_at timestamptz default now()
    );

    -- ALTER : 처음 개발시 구조 잡을 때는 alter로 계속 변경하기 보다는 drop+create
    -- 이후 삭제해서는 안되는 데이터가 추가된 이후부터는 alter로 변경
    create table ddl_notes(
        id bigint generated always as identity primary key,
        label text,
        amount text,
        status text default '대기'
    );
    create table ddl_notes(
        id bigint generated always as identity primary key,
        label text,
        amount text,
        status text default '대기'
    );
-- 데이터 추가
insert into ddl_notes(label, amount)
values('점검','12000');
-- 데이터 조회
select * from ddl_notes;

-- 컬럼 추가 : 기존 행의 memo는 NULL
alter table ddl_notes add column memo text;
-- 기존 행에 '일반'이 들어감
alter table ddl_notes add column category text default '일반';

-- 자료형 변경 : 문자열 -> 정수(바꿀 수 없는 값이 있으면 using 설정)
alter table ddl_notes
alter column memo type integer
using memo::integer;

-- 컬럼 이름 변경
alter table ddl_notes rename column memo to count;

-- 컬럼 삭제
alter table ddl_notes drop column count;

-- 제약조건 추가 (제약조건명 갗이 추가하는 걸 추천)
alter table ddl_notes add constraint ddl_notes_label_uq unique(label);

-- 제약조건 삭제
alter table ddl_notes 
   drop constraint ddl_notes_label_uq;

-- 테이블 이름 변경
alter table ddl_notes rename to ddl_change;

--테이블 삭제 (if exists를 추가하면 있을때만 삭제)
drop table if exists ddl_change;