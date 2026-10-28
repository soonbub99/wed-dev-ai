import "../styles/dashboard.css";

const Dashboard = () => {
  return (
    <main>
      <section className="title-section">
        <div>
          <h1>대시보드</h1>
          <p>오늘 정비소 현황 한눈에 보기</p>
        </div>
        <span className="today-date">2026년 9월 2일 (수)</span>
      </section>

      <section className="stat-grid">
        <div className="card stat-card">
          <p className="stat-label">총 차량 수</p>
          <p className="stat-value point">42</p>
          <p className="stat-desc green">이번 달 신규 +3</p>
        </div>
        <div className="card stat-card">
          <p className="stat-label">오늘 입고</p>
          <p className="stat-value point">3</p>
          <p className="stat-desc">정비 중 2 · 대기 1</p>
        </div>
        <div className="card stat-card">
          <p className="stat-label">정비 예정</p>
          <p className="stat-value orange">7</p>
          <p className="stat-desc">이번 주 4건</p>
        </div>
        <div className="card stat-card">
          <p className="stat-label">이번달 완료</p>
          <p className="stat-value point">128</p>
          <p className="stat-desc green">지난달 대비 +12</p>
        </div>
      </section>

      <section className="dashboard-content">
        <div className="card history-card">
          <div className="card-header">
            <div className="header-title">
              <h2>최근 정비 이력</h2>
              <span className="count-badge">3건</span>
            </div>
            <a href="./maintenance-history.html" className="btn-more">
              전체보기
            </a>
          </div>
          <div className="table-container">
            <table className="history-table">
              <thead>
                <tr>
                  <th className="col-date">날짜</th>
                  <th className="col-car">차량</th>
                  <th className="col-item">정비 항목</th>
                  <th className="col-cost">비용</th>
                  <th className="col-status">상태</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="col-date">09.01</td>
                  <td className="col-car">
                    <div className="car-info">
                      <span className="car-name">그랜저 IG</span>
                      <span className="car-number">13가 5827</span>
                    </div>
                  </td>
                  <td className="col-item">엔진오일 교환 외 1건</td>
                  <td className="col-cost">73,000원</td>
                  <td className="col-status">
                    <span className="status-badge status-done">
                      <span className="status-dot"></span>완료
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="col-date">09.01</td>
                  <td className="col-car">
                    <div className="car-info">
                      <span className="car-name">스포티지</span>
                      <span className="car-number">29나 6103</span>
                    </div>
                  </td>
                  <td className="col-item">앞 브레이크 패드 교체 외 1건</td>
                  <td className="col-cost">180,000원</td>
                  <td className="col-status">
                    <span className="status-badge status-process">
                      <span className="status-dot"></span>진행중
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="col-date">08.31</td>
                  <td className="col-car">
                    <div className="car-info">
                      <span className="car-name">쏘렌토</span>
                      <span className="car-number">41다 2298</span>
                    </div>
                  </td>
                  <td className="col-item">에어컨 가스 충전 및 누설 점검</td>
                  <td className="col-cost">88,000원</td>
                  <td className="col-status">
                    <span className="status-badge status-wait">
                      <span className="status-dot"></span>대기
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card schedule-card">
          <div className="card-header">
            <div className="header-title">
              <h2>다가오는 정비 일정</h2>
              <span className="count-badge">2건</span>
            </div>
          </div>
          <ul className="schedule-list">
            <li className="schedule-item">
              <span className="badge-dday">D-DAY</span>
              <div className="schedule-info">
                <p className="schedule-title">투싼 정기점검</p>
                <p className="schedule-desc">35라 7740 · 오늘 10:00 예약</p>
              </div>
            </li>
            <li className="schedule-item">
              <span className="badge-d1">D-1</span>
              <div className="schedule-info">
                <p className="schedule-title">레이 타이어 위치교환</p>
                <p className="schedule-desc">52마 9163 · 내일 14:00 예약</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};
export default Dashboard;
