select plate, contact, in_date, customer_request, work_details
from cars car
   join consultations c on c.car_id = car.id
   join consultation_items ci on ci.consultation_id = c.id ;

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