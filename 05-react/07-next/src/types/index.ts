/*
  TypeScript(TS) : JS + 타입
  - 값이 어떤 종류(글자, 숫자, 객체 모양)인지 미리 적어 두는 JS
  - 브라우저는 TS를 못 읽음 -> Next가 실행 전에 타입을 지운 JS로 바꿔줌

  기본 타입 : string, number, boolean, null
  type 이름 = { ... } : 객체 모양
  | : 또는 (string | null), ? : 없어도 되는 칸
  배열 : Car[], 함수 : (id: number) => void
  제네릭 <> : 안에 들어갈 타입 알려 주기
  타입 추론 : 처음 값을 보고 TS가 알아서 정함
*/
// 설계도 : type 이름 = { 칸 : 타입 } -> 이름은 대문자
// DB 테이블 하나 (화면에 맞춰서) -> type 하나 거의 필수 !
export type Car = {
  id: number;
  plate: string;
  name: string;
  car_type: string;
  production_year: number;
  fuel: string;
  mileage: number;
  service_count: number;
  latest_service_date: string | null; // | 또는 -> 정비기록이 없는 차는 null
  latest_service_item: string | null;
};

// 등록, 수정할 때 받는 값 = Car에서 몇개만 고르기
// Pick <원래타입, "칸" | "칸"> : 필요한 칸만 뽑은 새 타입
export type CarInput = Pick<
  Car,
  "plate" | "name" | "car_type" | "production_year" | "fuel" | "mileage"
>;

// 로그인한 사람
export type User = {
  id: string;
  email: string;
  name: string;
  profile_image?: string | null; // ? : 있어도 되고 없어도 되는 칸
};

// 서버 함수가 화면에 돌려주는 결과 (실패하면 error 글자, 성공하면 null)
export type ActionResult = { error: string } | null;

