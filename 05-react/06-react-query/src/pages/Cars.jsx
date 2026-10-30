import "../styles/vehicle-management.css";
import styles from "./Cars.module.css";
import { useState } from "react";
import CarsModal from "../components/CarsModal.jsx";
import CarsCard from "../components/CarsCard.jsx";
import { toast } from "@/components/ui/toast";
import { useCars, useDeleteCar } from "../queries/cars.js";

const Cars = () => {
  // isPending : 받아 오는 중인지, isError : 실패
  const { data: cars = [], isPending, isError } = useCars();
  const deleteCar = useDeleteCar();

  // 수정 중인 차의 정보 -> 객체인 경우는 보통 기본값을 null
  const [editingCar, setEditingCar] = useState(null);

  // 날짜 변환을 위한 함수 'YYYY-MM-DD'
  const toDate = (value) => {
    if (!value) return ""; //null인 경우
    const day = new Date(value);
    const month = String(day.getMonth() + 1).padStart(2, "0");
    const date = String(day.getDate()).padStart(2, "0");
    return `${day.getFullYear()}-${month}}-${date}`;
  };
  const [open, setOpen] = useState(false);

  // mutate(값, {}) : 성공하면 목록은  로 다시 불러오고,
  // 실패하면  (기존  문에서  )
  const handleDelete = async (id) => {
    deleteCar.mutate(id, {
      onError: () => {
        toast.add({
          type: "error",
          title: "차량 정보 삭제 실패",
          description:
            "해당 차량 정보는  정비기록이 있기 때문에 삭제할 수 없습니다!",
        });
      },
    });
  };

  if (isPending) {
    return <main>불러오는 중...</main>;
  }
  if (isError) {
    return <main>아직 개발중이라 죄송합니다.</main>;
  }

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
            onClick={() => {
              setOpen(true);
              setEditingCar(null); // 등록일 때는 수정 정보 null
            }}
          >
            차량 등록
          </button>
          <CarsModal
            key={editingCar ? editingCar.id : "new"}
            open={open}
            setOpen={setOpen}
            car={editingCar}
          />
        </div>
      </section>
      <section className="vehicle-search">
        <input id="carSearch" type="text" placeholder="차량명 / 번호로 검색" />
      </section>
      <section className={styles["card-section"]}>
        {cars?.map((car) => (
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
            onEdit={() => {
              setOpen(true);
              setEditingCar(car); //어느 차를 고칠지 담기!
            }}
          />
        ))}
      </section>
    </main>
  );
};
export default Cars;
