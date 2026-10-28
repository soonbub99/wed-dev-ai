import express from "express";
import cors from "cors";
import carsRouter from "./routes/cars.js";
import recordsRouter from "./routes/records.js";
import usersRouter from "./routes/users.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// routes 폴더의 각 파일들로 옮김
// /api/cars 로 시작하는 요청은 carsRouter로
app.use("/api/cars", carsRouter);
app.use("/api/records", recordsRouter);
app.use("/api/users", usersRouter);

app.use(errorHandler);

app.listen(4000, () => {
  console.log("서버 실행 중 : http://localhost:4000");
});
