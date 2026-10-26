import "../styles/vehicle-management.css";
import styles from "./Cars.module.css";
import { useState, useEffect } from "react";
import CarsModal from "../components/CarsModal.jsx";
import CarsCard from "../components/CarsCard.jsx";
import { getCars, deleteCar } from "../api/cars.js";
import { toast } from "@/components/ui/toast";

const Cars = () => {
  // 날짜 변환을 위한 함수 'YYYY-MM-DD'
  const toDate = (value) => {
    if (!value) return ""; //null인 경우
    const day = new Date(value);
    const month = String(day.getMonth() + 1).padStart(2, "0");
    const date = String(day.getDate()).padStart(2, "0");
    return `${day.getFullYear()}-${month}}-${date}`;
  };
  const [open, setOpen] = useState(false);
  // 서버에서 차 목록 받아올 예정 --> 처음에 가져와야 하니까 빈 배열!
  const [cars, setCars] = useState([]);

  // useEffect 뿐만 아니라 CarsModal에서도 사용하기 위해서
  const fetchCars = async () => {
    const result = await getCars();
    setCars(result);
  };

  // 삭제할 때 id가 필요
  const handleDelete = async (id) => {
    // try ~ catch : try에서 시도한 코드에서 에러가 나면 catch 구문으로 넘어감
    try {
         await deleteCar(id);
         fetchCars(); // 목록 다시 불러오기
    } catch (error) {
      toast.add({
        type: "error",
        title: "차량 정보 삭제 실패",
        description: "해당 차량 정보는  정비기록이 있기 때문에 삭제할 수 없습니다!",
      });
    }
  };

  // useEffect는  async를 바로 못 붙임 -> 함수를 만들고 호출!
  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <main>
      <section className="title-section">
        <div>
          <h1>차량 관리</h1>
          <p>등록된 고객 차량 9대</p>
        </div>
        <div>
          <button
            type="button"
            className="btn-vehicle-add"
            onClick={() => setOpen(true)}
          >
            차량 등록
          </button>
          {/* 모달에서 open 값이 필요하기 때문에 props로 전달한다 */}
          <CarsModal open={open} setOpen={setOpen} getCars={fetchCars} />
        </div>
      </section>
      <section className="vehicle-search">
        <input id="carSearch" type="text" placeholder="차량명 / 번호로 검색" />
      </section>
      <section className={styles["card-section"]}>
        {/* map : 배열의 값 하나마다 카드 하나로 바꾼다 */}
        {/* key : 목록에서 각 카드를 구분하는 이름표 (id <- RK) */}
        {/* 서버는 production_year, 카드는 year 처럼 이름이 다르면 여기서 맞춘다 */}
        {cars.map((car) => (
          <CarsCard
            key={car.id}
            plate={car.plate}
            fuel={car.fuel}
            name={car.name}
            year={car.production_year}
            serviceCount={car.service_count}
            lastDate={toDate(car.latest_service_date)}
            lastItem="엔진오일 교환"
            onDelete={() => handleDelete(car.id)}
          />
        ))}
      </section>
    </main>
  );
};
export default Cars;
