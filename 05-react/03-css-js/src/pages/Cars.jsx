// 모든 페이지의 클래스명이 겹치지 않으면 css파일 import만 해도 끝!
// css 파일을 해당 페이지 컴포넌트에 import해도 전체 반영 된다
import "../styles/vehicle-management.css";
import style from "./cars.module.css";
import closeIcon from "../assets/close.svg";
import { X } from "lucide-react";

const Cars = () => {
  return (
    <main>
      <section className="title-section">
        <div>
          <h1>차량 관리</h1>
          <p>등록된 고객 차량 9대</p>
        </div>
        <div x-data="{open:false}">
          <button type="button" className="btn-vehicle-add">
            차량 등록
          </button>
          <div className="">
            <form className="vehicle-modal">
              <div className="vehicle-modal-header">
                <h2>차량 등록</h2>
                <button>
                  <X color="#0d0d0d" />
                </button>
              </div>
              <div className="vehicle-modal-body">
                <div>
                  <label htmlFor="carNumber">
                    차량번호<span>*</span>
                  </label>
                  <input
                    id="carNumber"
                    name="carNumber"
                    type="text"
                    placeholder="예: 12가 3456"
                  />
                </div>
                <div>
                  <label htmlFor="carName">
                    차량명<span>*</span>
                  </label>
                  <input
                    id="carName"
                    name="carName"
                    type="text"
                    placeholder="예: 그랜저IG"
                  />
                </div>
                <div>
                  <label htmlFor="carType">차종</label>
                  <select name="carType" id="carType">
                    <option value="승용">승용</option>
                    <option value="SUV">SUV</option>
                    <option value="승합">승합</option>
                    <option value="화물">화물</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="carYear">연식</label>
                  <input id="carYear" type="number" placeholder="2022" />
                </div>
                <div>
                  <label htmlFor="fuelType">연료</label>
                  <select name="fuelType" id="fuelType">
                    <option value="가솔린">가솔린</option>
                    <option value="디젤">디젤</option>
                    <option value="LPG">LPG</option>
                    <option value="하이브리드">하이브리드</option>
                    <option value="전기">전기</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="mileage">주행거리 (km)</label>
                  <input
                    id="mileage"
                    name="mileage"
                    type="number"
                    placeholder="82000"
                  />
                </div>
              </div>
              <div className="vehicle-modal-footer">
                <button type="reset">취소</button>
                <button type="submit">저장</button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section className="vehicle-search">
        <input id="carSearch" type="text" placeholder="차량명 / 번호로 검색" />
      </section>
      <section className="card-section">
        <div className={style["card-section"]}>
          <div className="card-header">
            <span className="plate">13가 5827</span>
            <span className="fuel-type">가솔린</span>
          </div>
          <div className="card-body">
            <p className="car-name">그랜저 IG</p>
            <p>
              <span className="car-year">2019년식</span>
              <span className="service-count">정비 7건</span>
            </p>
          </div>
          <div className="card-footer">
            마지막 정비 <span className="last-service-date">2026-09-01</span>
            <span className="last-service-item">엔진오일 교환</span>
          </div>
        </div>
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
