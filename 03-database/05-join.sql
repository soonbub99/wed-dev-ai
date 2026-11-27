select id name, plate from cars where id = 13 -- 차 정보
select car_id, service_date, item, memo from maintenance_records; -- 정비 이력

-- 테이블의 별칭을 부여하시는게 편함!
select c.id, name, plate, car_id, service_date, item, memo
from cars c
   join maintenance_records m on c.id = m.car_id;  -- inner join(교집합, 공통으로 일치하는 값)

-- consultations + cars
-- 
select * 
from consultations s
    right join cars c on c.id = s.car_id;  -- 오른쪽 테이블 기준 (없으면 null)

select * 
from cars c
    left join consultations s on c.id = s.car_id;  -- 왼쪽 테이블 기준 (없으면 null)

select * 
from cars c
    full join consultations s on c.id = s.car_id;  -- 합집합(모든 데이터)   

-- maintenance_schedules랑 cars 정보에서 plate, name, item, priority 조회
select plate, name, item, priority
from maintenance_schedules m
    join cars c on m.car_id = c.id;

-- cars, consultations, consultation_items 에서
-- plate, contact, in_date, customer_request, work_details 조회
select plate, contact, in_date, customer_request, work_details 
from cars car
    join consultations c on c.car_id = car.id
    join consultation_items ci on ci.consultation_id = c.id;



-- 테이블 : cars, maintenance-records
-- 정비 상태(status)rk '완료'인 정비를 차 이름별로 세어 건수가 많은 상위 5대

select name, count(*) as count
from maintenance_records m
   join cars c on m.car_id = c.id
where status = '완료'
group by name
order by count desc
limit 5;

-- 차 이름별 마지막 정비일(service_date)
select name, max(m.service_date ) as count
from maintenance_records m
   join cars c on m.car_id = c.id
group by name;