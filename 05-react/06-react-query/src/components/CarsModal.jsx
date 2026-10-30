import { X } from "lucide-react";
import { useAddCar, useUpdateCar } from "../queries/cars.js";

const CarsModal = ({ open, setOpen, car }) => {
  const addCar = useAddCar();
  const updateCar = useUpdateCar();

  const handleSubmit = async (e) => {
    e.preventDefault(); //기존 바로 품 제출하는 이벤트 막기
    // 추가시 받는 body -> 수정시에도 사용 가능!
    const newCar = {
      plate: e.target.carNumber.value,
      name: e.target.carName.value,
      car_type: e.target.carType.value,
      production_year: Number(e.target.carYear.value),
      fuel: e.target.fuelType.value,
      mileage: Number(e.target.mileage.value),
    };
    // car가 있으면 수정, 없으면 등록
    if (car) {
      updateCar.mutate({ id: car.id, data: newCar });
    } else {
      addCar.mutate(newCar);
    }
    e.target.reset();
    setOpen(false);
  };
  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setOpen(false);
        }
      }}
      className={`vehicle-modal-overlay ${open ? "open" : ""}`}
    >
      <form className="vehicle-modal" onSubmit={handleSubmit}>
        <div className="vehicle-modal-header">
          {/* 같은 모달이라 제목만 바꿈 */}
          <h2>{car ? "차량 수정" : "차량 등록"}</h2>
          <button type="button" onClick={() => setOpen(false)}>
            <X size={16} color="#0d0d0d" />
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
              defaultValue={car?.plate}
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
              defaultValue={car?.name}
            />
          </div>
          <div>
            <label htmlFor="carType">차종</label>
            <select name="carType" id="carType" defaultValue={car?.car_type}>
              <option value="승용">승용</option>
              <option value="SUV">SUV</option>
              <option value="승합">승합</option>
              <option value="화물">화물</option>
            </select>
          </div>
          <div>
            <label htmlFor="carYear">연식</label>
            <input
              id="carYear"
              type="number"
              placeholder="2022"
              defaultValue={car?.production_year}
            />
          </div>
          <div>
            <label htmlFor="fuelType">연료</label>
            <select name="fuelType" id="fuelType" defaultValue={car?.fuel}>
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
              // defaultValue : 처음 한 번만 채우는 값 (useState 없이)
              defaultValue={car?.mileage}
            />
          </div>
        </div>
        <div className="vehicle-modal-footer">
          <button type="reset" onClick={() => setOpen(false)}>
            취소
          </button>
          <button type="submit">{car ? "수정" : "저장"}</button>
        </div>
      </form>
    </div>
  );
};
export default CarsModal;
