// 미들웨어 : 요청이 들어와서 응답이 나가기 전에 중간에 끼어 있는 함수
// 에러 처리기 : 오류가 났을 때만 일하는 미들웨어
export const errorHandler = (error, req, res, next) => {
  if (error.status) {
    return res.status(error.status).json({ message: error.message });
  }
  if (error.code === "23505") {
    return res.status(409).json({ message: "이미 존재하는 값입니다." });
  }
  if (error.code === "23503") {
    return res
      .status(409)
      .json({ message: "정비 기록이 있는 차는 지울 수 없어요" });
  }
  res.status(500).json({ message: "서버 문제 발생", error: error });
};
