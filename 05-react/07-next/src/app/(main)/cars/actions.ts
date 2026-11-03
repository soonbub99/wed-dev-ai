"use server"; // 이 파일 함수는  서버에서만 돈다

import { refresh } from "next/cache";
import { createCar, updateCar, deleteCar } from "@/lib/data/cars";
import type { ActionResult, CarInput } from "@/types";

// 이전 리액트에서  e.tatget.plate.value
const toCarInput = (formData: FormData): CarInput => ({
  plate: String(formData.get("carNumber")),  // get은 글자나 파일이 돠서 String
  name: String(formData.get("carName")),
  car_type: String(formData.get("carType")),
  production_year: Number(formData.get("carYear")), // 숫자는 Number
  fuel: String(formData.get("fuelType")),
  mileage: Number(formData.get("mileage")),
});

// 추가 / 수정
export const saveCar = async (
  id: number | null,
  formData: FormData,
): Promise<ActionResult> => {
  try {
    // 기존에 addCar, updateCar
    if (id) await updateCar(id, toCarInput(formData));
    else await createCar(toCarInput(formData));
  } catch {
    return { error: "저장하지 못했어요" };
  }
  refresh();
  return null;
};

// 삭제
export const removeCar = async (id: number): Promise<ActionResult> => {
  try {
    await deleteCar(id);
  } catch {
    return { error: "해당 차량 정보는 정비기록이 있기 때문에 삭제할 수 없습니다!",
    };
  }
  refresh();
  return null;
};
