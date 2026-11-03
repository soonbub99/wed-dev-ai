"use client";
import styles from "@/components/Cars.module.css";
import { useState } from "react";
import CarsModal from "@/components/CarsModal";
import CarsCard from "@/components/CarsCard";
import { toast } from "@/components/ui/toast";
import { removeCar } from "@/app/(main)/cars/actions";
import type { Car } from "@/types";

const CarsBoard = ({ cars }: { cars: Car[] }) => {
  // useState(null)만 쓰면 TS는 "항상 null"로 안다 -> 제네릭 표시!
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const toDate = (value: string | null): string => {
    if (!value) return "";
    const day = new Date(value);
    const month = String(day.getMonth() + 1).padStart(2, "0");
    const date = String(day.getDate()).padStart(2, "0");
    return `${day.getFullYear()}-${month}-${date}`;
  };
  const [open, setOpen] = useState(false);
  const handleDelete = async (id: number) => {
    const result = await removeCar(id);
    if (result?.error) {
      toast.add({ type: "error", title: "차량 정보 삭제 실패", description: result.error });
    }
  };

  return (
    <>
      <section className="title-section">
        <div>
          <h1>차량 관리</h1>
          <p>등록된 고객 차량 {cars.length}대</p>
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
      <section className={styles["card-section"]}>
        {cars.map((car) => (
          <CarsCard
            key={car.id}
            plate={car.plate}
            fuel={car.fuel}
            name={car.name}
            year={car.production_year}
            serviceCount={car.service_count}
            lastDate={toDate(car.latest_service_date)}
            lastItem={car.latest_service_item}
            onDelete={() => handleDelete(car.id)}
            onEdit={() => {
              setOpen(true);
              setEditingCar(car);
            }}
          />
        ))}
      </section>
    </>
  );
};
export default CarsBoard;
