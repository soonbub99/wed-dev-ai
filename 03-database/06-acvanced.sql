-- 서브쿼리 : select 안의 select
-- mileage가 평균보다 많이 탄 차들만 조회
select * from cars where mileage > avg(mileage); -- aggregate error!

select round(avg(mileage)) from cars;  -- 103,246
select * from cars where mileage > 103246;

select * from cars
where mileage > (select round(avg(mileage)) from cars);

-- 보험 수리를 받은 차 번호 목록
select distinct car_id 
from maintenance_records
where type = '보험'; --5,18,2, 19, 13, 1, 14

select * from cars where id in(5,18,2, 19, 13, 1, 14);

select * from cars
where id in(select distinct car_id 
   from maintenance_records
   where type = '보험');

-- not exists / not in -> 반대! 보험 수리를 받지 않은 차 목록
select distinct car_id from consultations; -- 상담을 한 차
 select * from cars 
 where id not in (select distinct car_id from consultations);

 select * from cars c
 where not exists (select 1 from consultations where c.id = car_id );
 
 -- any, all
 -- 모든 엔진오일보다 비싼 정비 -> 최고값
 select service_date, item , cosr from maintenance_records
 where cost > all ( select cost from maintenance_records where item = '엔진오일 교체');
 
 -- 엔진오일 교체 가격들 중 하나 -> 최저값
 select service_date, item , cosr from maintenance_records
 where cost > any ( select cost from maintenance_records where item = '엔진오일 교체');

 -- view : 자주 쓰는 select문 저장용
 create view car_views as
select * from cars
where id in(select distinct car_id 
          from maintenance_records
          where type = '보험');

select * from car_views where id = 13;
drop view car_views;

-- index : 많은 데이터에서 빨리 찾기(Primary key)
create index practice_idx on cars(plate);
select * from cars where plate = '218가 1826';


-- 트랜잭션
begin; -- 트랜잭션 시작
insert into consultations(car_id, in_date, contact)
values (3, '2026-10-15','010-1234-5678');
insert into consultation_items (consltation_id, customer_request, estimated_cost)
values(10,'차가 힘들어해요. 원인을 모르겠어요', -50000); --일부로 에러나게!
rollback; -- begin 시작 점으로 되돌아간다
commit; --반영하겠다! -> postgreSQL는 auto-commit


select count(*) from consultations;

-- 함수 : JavaScript의 함수와 유사
-- 매개변수를 받아서 값을 돌려준다.
create function car_total_cost(p_plate text) returns integer
language sql as $$
  select sum(cost)
  from maintenance_records m
    join cars c on m.car_id = c.id
    where plate = p_plate
$$;

select car_total_cost('127고 2223');
select car_total_cost('107거 7296');

-- 트리거 : 어떤 일이 생기면 자동으로 했으면 하는 것들 로직을 미리 구현 - 로그
drop trigger record_sync on maintenance_records;
drop function sync_car();

create function sync_car() returns trigger
language plpgsql as $$
begin
   update cars 
   set latest_service_date = new.service_date where id = new.car_id;
   return new;
end;
$$;

create trigger record_sync
after insert on maintenance_records
for each row execute function sync_car_to();

insert into maintenance_records (car_id, service_date, item, cost,satus, mileage)
values(15, current_date, '베터리 교체', 20000, '대기', 10000);

select * from cars where id = 15;














