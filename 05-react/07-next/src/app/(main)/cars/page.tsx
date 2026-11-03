// "use client"가 없으면 서버 컴포넌트 ( app 폴더의 기본 )
// : 서버에서 실행되고  HTML만 브라우저로 갑니다
import "@/styles/vehicle-management.css";
// 서버에서만 도는 데이터 함수 (서버 컴포넌트라 바로 부를 수 있음)
import { getCars } from "@/lib/data/cars";
import CarsBoard from "@/components/CarsBoard";

// 서버 컴포넌트는 async 가능 (클라이언트 컴포넌트는 안 됨)
const Cars = async () => {
  // 기존에 useEffect, useState, axios 없이도 await 한 줄!
  const cars = await getCars();
  console.log(cars);
  return (
    <main>
      {/* 서버에서 받은 값을 props로 클라이언트에 넘기기 */}
      <CarsBoard cars={cars} />
    </main>
  );
};
export default Cars; // /cars의 화면
