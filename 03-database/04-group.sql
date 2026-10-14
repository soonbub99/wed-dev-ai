-- 집계 함수
-- count(열)은 null을 빼고 센다.
select count (*) as 전체, count(car_type) as "차종 있음" from cars;
select
   SUM(cost) as 총매출,round(avg(cost)) as 평균,
   min(cost) as 최저, max(cost) as 최고,
   min(service_date) as 첫정비, max(service_date) as 최근정비
from maintenance_records;

select * from cars;
