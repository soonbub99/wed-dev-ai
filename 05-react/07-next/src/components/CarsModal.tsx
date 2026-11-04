"use client"; //클라이언트 컴포넌트 : 브라우저에서 실행
import { Car } from "@/types";
import { X } from "lucide-react";
import { toast } from "@/components/ui/toast"; // 실패 알림
//서버 함수 (Server Action) : 클라이언트에서 import 해도 실행은 서버
import { saveCar } from "@/app/(main)/cars/actions";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  car: Car | null;
};

const CarsModal = ({ open, setOpen, car }: Props) => {
  // form action에 넣은 함수 : form을 보내면 FormData가 자동으로 들어옴
  const handleAction = async (formData: FormData) => {
    // car 정보가 있다면 수정 -> 그 차 id, 등록이면 null (?? : 앞이 없으면 뒤)
    const result = await saveCar(car ?.id ?? null, formData);
    if (result?.error) {
      // 서버가 {error} 를 돌려주면 실패
      toast.add({ type: "error", title: result.error });
      return; // 함수는 return을 만나면 종료
    }
    setOpen(false);  // 성공하면 모달 닫기
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
      {/* onSubmit --> action : FormData를 보내줌 */}
      <form className="vehicle-modal" action={handleAction}>
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
              name="carYear"
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
