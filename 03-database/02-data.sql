-- DML(Data Manipulation Language) : 데이터 조작 언어
-- insert(추가), select(조회), update(수정), delete(삭제)
-- CRUD : Create(생성), Read(읽기), Update(수정), Delete(삭제)

select * from cars;
-- insert
insert into cars (plate, name, car_type, production_year, fuel, mileage)
values ('12거 3456','그랜저 IG', '승용', 2019, '가솔린', 4800000);

-- 여러 줄을 한꺼번에 추가
insert into cars (plate, name, car_type, production_year, fuel, mileage)
values ('56다 1122', '레이', '승용', 2023, '가솔린', 12000),
     ('34나 7800','포터2', '화물', 2020, '디젤', 95000);

-- unique 제약조건 : 이미 있는 번호판
insert into cars (plate, name)
values ('12거 3456','쏘나타');

-- not null 제약조건 : 이름이 null
insert into cars (plate, name)
values ('99마 0000', null);

-- foreign key 제약조건 : 없는 차량 번호
insert into maintenance_records (car_id, service_date, item, cost)
values (99,'2026-10-13','엔진오일 교환', 50000);

-- check 제약조건 : 음수 비용
insert into maintenance_records (car_id, service_date, item, cost)
values (1, '2026-10-14','엔진오일 교환', -50000);

-- column을 기재하지 않는다면? 값은 무조건 순서대로 전부 다 넣어야 한다.
-- 추천하기는 column 기재 하는 걸 추천!
insert into cars 
values (default,'11하 1111','스포티지','suv', 2022, '가솔린', 5000);

-- on conflict를 붗이면 중복일 때 할 일을 정할 수 있다
-- excluded는 넣으려는 값
insert into cars (plate, name, car_type, production_year, fuel, mileage)
values ('56다 1122','레이','승용', 2023, '가솔린',12500)
on conflict (plate) do update set mileage = excluded.mileage ;

-- update : set 수정할 것들 where 어떤 걸?
update cars 
set mileage = 40000
where id = 1;

--  여러 column을 수정할 시 , (콤마) 사용
update cars 
set mileage = 20000, fuel = '디젤'
where car_type ='승용'; -- 조건에 맞으면 여러 행 수정 가능 (추천하지 않음)

-- delete
delete from cars where id = 3;

-- 부모를 삭제하려고 하면? 다른 테이블 기록들로 인해 못 지원다.
-- 만약 삭제하고 싶다면 자식들릐 기록들을 먼저 삭제해야 한ㅇ다(기본 : on delete)
delete from cars where id =1;

-- on delete cascade 로 인해 consultation_items도 삭제
delete from consultations where id =1;

insert into maintenance_records (car_id, service_date, item, cost)
values (9, '2026-10-14','엔진오일 교환', 50000);
insert into consultations (car_id,in_date ,contact)
values (1, '2026-10-14', '010-2222-3333');
select * from consultations;
insert into consultation_items (consultation_id, customer_request, estimated_cost)
values (1, '타이어 공기압 경고등', 0);

-- delete / truncate / drop : 삭제 해당
-- delete 조건에 맞는 행 / truncate 모든 행 / drop 테이블 자체
-- where은 delete에서만 사용 가능
-- delete / 화면의 삭제 버트(기능 구현)/ truncate 개발 중 데이터만 초기화 / drop구조를 처음부터 다시

-- truncate 사용시 restart identity는 PK를 1부터 다시 시작
truncate maintenance_records restart identity;

-- delete에서 where를 빼먹으면 전부 다 삭제되므로 주의!
delete from cars;







