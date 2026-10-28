import axios from "axios";

// POST http://localhost:4000/api/users/signup -> req.body
export const signup = async (data) => {
  await axios.post(" http://localhost:4000/api/users/signup", data);
};
// POST http://localhost:4000/api/users/login -> req.body
export const login = async (data) => {
  // 서버가 json에 값을 담았으니 -> res 변수에 가져옴!
  const res = await axios.post("http://localhost:4000/api/users/login", data);
  return res.data; // json 값이 datd에 들어있음!
};
