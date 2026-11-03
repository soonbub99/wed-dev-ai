import "server-only";
import { createClient } from "@/lib/supabase"; //방금 만든 연결
import type { Car, CarInput } from "@/types"; // 어제 직접 만든 타입들

// DB에서 오는 모양
type CarRow = Omit<
  Car,
  "service_count" | "latest_service_date" | "latest_service_item"
> & {
  records: { count: number }[];
  latest: { item: string; service_date: string }[];
};

export const getCars = async (): Promise<Car[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("cars")
    .select(
      "id, plate, name, car_type, production_year, fuel, mileage, records:maintenance_records(count), latest:maintenance_records(item, service_date)",
    )
    .order("id")
    .order("service_date", { referencedTable: "latest", ascending: false })
    .limit(1, { referencedTable: "latest" })
    .returns<CarRow[]>();
  if (error) throw new Error(error.message);

  console.log(data);

  // 화면에서 쓰는 Car 모양 그대로
  return data.map(({ records, latest, ...car }) => ({
    ...car,
    service_count: records[0]?.count ?? 0,
    latest_service_date: latest[0]?.service_date ?? null,
    latest_service_item: latest[0]?.item ?? null,
  }));
};

// 추가 -> insert
export const createCar = async (input: CarInput) => {
  const supabase = await createClient();
  const { error } = await supabase.from("cars").insert(input);
  if (error) throw new Error(error.message);
};

// 수정 -> updata
export const updateCar = async (id: number, input: CarInput) => {
  const supabase = await createClient();
  const { error } = await supabase.from("cars").update(input).eq("id", id);
  if (error) throw new Error(error.message);
};

// 삭제 -> delete
export const deleteCar = async (id: number) => {
  const supabase = await createClient();
  const { error } = await supabase.from("cars").delete().eq("id", id);
  if (error) throw new Error(error.message);
};
