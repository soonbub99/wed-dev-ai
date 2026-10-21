// 모든 페이지의 클래스명이 겹치지 않으면 css 파일 import만 해도 끝!
// css 파일을 해당 페이지 컴포넌트에 import해도 전체 반영 된다
import "../styles/vehicle-management.css";
import styles from "./Cars.module.css";
import closeIcon from "../assets/close.svg";
import { useState } from "react";
import CarsModal from "../components/CarsModal.jsx";
import CarsCard from "../components/CarsCard.jsx";

// vehicle-management.html의 body 안에 태그들
const Cars = () => {
  // 모달이 열렸는지(true) 닫혔는지(false), 처음은 닫힘
  const [open, setOpen] = useState(false);
  return (
    <main>
      <section className="title-section">
        <div>
          <h1>차량 관리</h1>
          <p>등록된 고객 차량 9대</p>
        </div>
        <div>
          <button
            type="button"
            className="btn-vehicle-add"
            onClick={() => setOpen(true)}
          >
            차량 등록
          </button>
          {/* 모달에서 open 값이 필요하기 때문에 props로 넘김 */}
          <CarsModal open={open} setOpen={setOpen} />
        </div>
      </section>
      <section className="vehicle-search">
        <input id="carSearch" type="text" placeholder="차량명 / 번호로 검색" />
      </section>
      <section className={styles["card-section"]}>
        {/* 카드마다 다른 값들만 props로 넘긴다 */}
        <CarsCard
          plate="13가 5827"
          fuel="가솔린"
          name="그랜저 IG"
          year={2019}
          serviceCount={7}
          lastDate="2026-09-01"
          lastItem="엔진오일 교환"
        />
        <div className="card vehicle-card">
          <div className="card-header">
            <span className="plate">29나 6103</span>
            <span className="fuel-type">디젤</span>
          </div>
          <div className="card-body">
            <p className="car-name">스포티지</p>
            <p>
              <span className="car-year">2021년식</span>
              <span className="service-count">정비 4건</span>
            </p>
          </div>
          <div className="card-footer">
            마지막 정비 <span className="last-service-date">2026-08-28</span>
            <span className="last-service-item">브레이크 패드 교체</span>
          </div>
        </div>
        <div className="card vehicle-card">
          <div className="card-header">
            <span className="plate">17바 4085</span>
            <span className="fuel-type">가솔린</span>
          </div>
          <div className="card-body">
            <p className="car-name">아반떼 CN7</p>
            <p>
              <span className="car-year">2022년식</span>
              <span className="service-count">정비 3건</span>
            </p>
          </div>
          <div className="card-footer">
            마지막 정비 <span className="last-service-date">2026-08-31</span>
            <span className="last-service-item">정기점검</span>
          </div>
        </div>
        <div className="card vehicle-card">
          <div className="card-header">
            <span className="plate">60사 3317</span>
            <span className="fuel-type">디젤</span>
          </div>
          <div className="card-body">
            <p className="car-name">카니발</p>
            <p>
              <span className="car-year">2020년식</span>
              <span className="service-count">정비 6건</span>
            </p>
          </div>
          <div className="card-footer">
            마지막 정비 <span className="last-service-date">2026-08-31</span>
            <span className="last-service-item">타이어 4본 교체</span>
          </div>
        </div>
        <div className="card vehicle-card">
          <div className="card-header">
            <span className="plate">24아 6659</span>
            <span className="fuel-type">하이브리드</span>
          </div>
          <div className="card-body">
            <p className="car-name">쏘렌토 하이브리드</p>
            <p>
              <span className="car-year">2023년식</span>
              <span className="service-count">정비 2건</span>
            </p>
          </div>
          <div className="card-footer">
            마지막 정비 <span className="last-service-date">2026-09-05</span>
            <span className="last-service-item">냉각수 보충</span>
          </div>
        </div>
        <div className="card vehicle-card">
          <div className="card-header">
            <span className="plate">88자 1204</span>
            <span className="fuel-type">전기</span>
          </div>
          <div className="card-body">
            <p className="car-name">EV6</p>
            <p>
              <span className="car-year">2024년식</span>
              <span className="service-count">정비 1건</span>
            </p>
          </div>
          <div className="card-footer">
            마지막 정비 <span className="last-service-date">2026-09-10</span>
            <span className="last-service-item">타이어 공기압 점검</span>
          </div>
        </div>
        <div className="card vehicle-card">
          <div className="card-header">
            <span className="plate">05차 7731</span>
            <span className="fuel-type">가솔린</span>
          </div>
          <div className="card-body">
            <p className="car-name">K5</p>
            <p>
              <span className="car-year">2018년식</span>
              <span className="service-count">정비 9건</span>
            </p>
          </div>
          <div className="card-footer">
            마지막 정비 <span className="last-service-date">2026-08-20</span>
            <span className="last-service-item">브레이크 오일 교환</span>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Cars;
