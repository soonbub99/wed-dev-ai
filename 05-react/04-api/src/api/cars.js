import axios from "axios";

//차량 목록 조회
export const getCars = async () => {
  // fetch : 서버에 요청을 보낸다 -> fetch로 사용하는 건 나중에 next!
  //const res = await fetch("http://localhost:4000/api/cars");
  //return res.json();
  // axios : 서버에 요청을 보낸다 (메서드+주소)
  const res = await axios.get("http://localhost:4000/api/cars");
  return res.data;
};

// 차량 추가
// 객체를 그대로 넘기면 axios가 JSON으로 바꿔 보냄
export const addCar = async (data) => {
  await axios.post("http://localhost:4000/api/cars", data);
};
// 차량 삭제 DELETE http://localhost:4000/api/cars/:id
export const deleteCar = async (id) => {
  await axios.delete(`http://localhost:4000/api/cars/${id}`);
};
