-- 집계 함수
-- count(열)은 null을 빼고 센다.
select count (*) as 전체, count(car_type) as "차종 있음" from cars;
select
   SUM(cost) as 총매출,round(avg(cost)) as 평균,
   min(cost) as 최저, max(cost) as 최고,
   min(service_date) as 첫정비, max(service_date) as 최근정비
from maintenance_records;

-- gaoup by : 같은 값끼리 그룹을  지어줌 -> 집게 함수 함께 사용 가능
select fuel, count(*) as 대수, round(avg(mileage)) as 평균주행거리
from cars 
gaoup by fuel
order by fuel;

-- 함수의 경우는 별칭 부여해서 그룹!
-- 주의사항! select에는 해당 그룹으로 지어진 컬럼 (또는 별칭) 또는 집계함수들만 올 수 있다
select to_char(service_date,'YYYY-MM') as 월, count(*) as 건수, sum(cost) as 매출
from maintenance_records
group by 월
order by 월;

-/*
  * select
  * from
  * where
- * */

-- where / having 의 차이 -> 둘 다 조건을 주고 싶을 때
-- 10건 이상인 해당 월들만 가지고 오고 싶다면?
select to_char(service_date,'YYYY-MM') as 월, count(*) as 건수, sum(cost) as 매출
from maintenance_records
where service_date >= '2026-01-01'
group by 월
having count(*) >= 10
order by 월;

-- car_id별 총 정비 매출(합계) - cost, 150만원 넘게 쓴 경우
select car_id, sum(cost)
from maintenance_records;
group by car_id
having sum(cost) >= 1500000;
