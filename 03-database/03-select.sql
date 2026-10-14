-- DML 중 하나 이기도 하면서, DQL(Data Query Language) : 데이터 조회
-- * : 모든 column들 
select * 
from cars;

-- 내가 필요한 column만 기재
select name, plate, mileage from cars;

-- as : 결과에 보일 column 별칭 부여
select name as 차종, mileage as 주행거리 from cars;

-- 계산식도 가능하다
select item, cost, cost * 1.1 as 부가세포함
from maintenance_records;

-- 겹치는 값은 한 번만
select distinct fuel from cars;

-- where : 조건에 맞는 행만
-- mileage가 150000 이상인 경우 - 주행거래가 15만이 넘는 차는?
select name, mileage 
from cars
where mileage >= 150000;

-- cars 데이블에서 car_type이 'SUV'이면서 fuel가 '가솔린' (and)
select * from cars where car_type = 'SUV' and fuel = '가솔린';

-- cars 데이블에서 fuel가 '전기'이거나 '하이브리드' (or)
select * from cars where fuel = '전기' or fuel = '하이브리드';
select * from cars where fuel in ('전기','하이브리드');

-- maintenance_records 테이블에서  cost가 100000 이상이면서 200000 이하
select * from maintenance_records
where cost >= 100000 and cost <= 200000;
select * from maintenance_records
where cost between 100000 and 200000;

-- like + % : 0글자 이상 --> 검색 기능으로 사용
select name, plate from cars where name like '%티%';

-- null : = 로 못 찾음 / is null 또는 is not null로 찾음
-- cars 테이블에서 production_year가 null인 경우 / null이 아닌 경우
select * from cars where production_year is not null;  -- not 은 부정을 뜻함

-- order by : 정렬 / 기본 asc - 작은 순서 (생략 가능) / desc - 큰 순서
select name, mileage from cars order by mileage desc;
select name, car_type, mileage from cars cars 
order by car_type, mileage desc;

-- limit 숫자 (한페이지 당 개수 ) offset 숫자 (몇 번째 데이터부터) --> 페이징 처리
select id, item, cost, service_date from maintenance_records limit 5;
select id, item, cost, service_date from maintenance_records limit 5 offset 5;

-- 기본 함수 : upper-대문자, lower-소문자
select name, length(name) as 글라수, lower(name) from cars;

-- substring(글자 form 시작 for 개수) : 일부만 잘라내기
select plate, substring(plate from 6 for 4) as 뒷번호 from cars;
-- position('찾을글자' in 글자) : 글자 위치 찾기
select plate, position(' ' in plate) +1,
substring(plate from position(' ' in plate) +1 for 4) as 뒷번호
from cars;
-- split_part(글자, '구분자', 번호) : 구분자로 나눈 몇 번째
select plate, split_part(plate, ' ',2)as 뒷번호 from cars;

-- 숫자 : round - 반올림(소수점가능)
select avg(cost),
round(avg(cost)),
round(avg(cost),2)
from maintenance_records;

-- 날짜 : extract(year/month/day.. from 글자(크럼명)) : 년/월/일 ..
select service_date, extract(year from service_date) from maintenance_records;
select current_date, now(); --현재 날짜
select current_date + 7 as 일주일뒤,
(current_date + interval '1 month')::date as 한달뒤;
select service_date, to_char(service_date, 'Dy')as 요일
from maintenance_records;

-- 조건에 따른 다른 값
select name, coalesce(car_type, '미분류') from cars; -- null인 경우 '미분류'
-- 주행거리가 15만이 넘으면 '점검 필요', 10만이 넘으면 '주의', 그외에는 '양호'
select name, mileage,
  case when mileage >= 150000 then '점검 필요'
       when mileage >= 100000 then '주의'
       else '양호'
  end
from cars;





























