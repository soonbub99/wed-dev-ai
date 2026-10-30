import * as userService from "../services/users.js";

// 컨트롤러가 하는 일은 request -> service -> response
// signup
export const signup = async (req, res) => {
  console.log(req.body);
  // 앞서 multer로 인해서 파일은 req.file로 되어
  // multer가 읽은 파일은 req.body가 아니라 req.file에 들어 있음
  await userService.insertUser(req.body, req.file);
  res.sendStatus(201);
};

// login
export const login = async (req, res) => {
  const result = await userService.login(req.body);
  res.status(200).json(result);
};
