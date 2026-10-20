import { Link, useNavigate } from "react-router";
//Link는 바로 이동, useNavigate는 코드를 걸쳐서 이동
const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //지금 서버가 없어서 원래는 서버 갔다가 온 후
    navigate("/");
  };

  return (
    <section className="login-screen">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-brand">정비노트</div>
        <p className="login-title">자동차검사정비 · 관리자</p>

        <div className="field">
          <label htmlFor="lg-id">아이디</label>
          <input
            className="input"
            id="lg-id"
            type="text"
            placeholder="아이디를 입력하세요"
            autoComplete="username"
          />
        </div>
        <div className="field">
          <label htmlFor="lg-pw">비밀번호</label>
          <div className="pw-wrap">
            <input
              className="input"
              id="lg-pw"
              type="password"
              placeholder="비밀번호를 입력하세요"
              autoComplete="current-password"
            />
            <button type="button" className="pw-toggle" data-target="lg-pw">
              보기
            </button>
          </div>
        </div>

        <button className="btn-login" type="submit">
          로그인
        </button>
        <p className="form-result error" id="login-result"></p>

        <p className="login-foot">
          <Link to="/signup.html">계정 신청</Link>
          <span className="sep">·</span>
          <a href="#">비밀번호를 잊으셨나요?</a>
        </p>
      </form>
    </section>
  );
};

export default Login;
