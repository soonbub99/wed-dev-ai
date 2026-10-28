import * as userService from "../services/users.js";

// 컨트롤러가 하는 일은 request -> service -> response
// signup
export const signup = async (req, res) => {
  console.log(req.body);
  await userService.insertUser(req.body);
  res.sendStatus(201);
};

// login
export const login = async (req, res) => {
  const result = await userService.login(req.body);
  res.status(200).json(result);
};
