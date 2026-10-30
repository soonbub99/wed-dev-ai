// TanStack Query (구 React Query)
// --> 서버에서 받아 온 데이터(서버 상태)를 대신 관리해 주는 도구
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getCars, addCar, deleteCar, updateCar } from "../api/cars.js";

// useQuery : 서버에서 데이터 가져오기 (조회)
// queryKey : 이 데이터의 이름표
// queryFn : 데이터를 가져오는 함수
export const useCars = () => {
  return useQuery({ queryKey: ["cars"], queryFn: getCars });
};

// useMutation : 서버 데이터 바꾸기 (등록, 수정 , 삭제)
// useQueryClient : 받아 온 데이터 보관함 꺼내기
// mutationFn :서버에 보낼 요청 함수
// onSuccess : 요청이 성공한 뒤에 할 일
// invalidateQueries : 현재 데이터가 낡았으니 다시 받아 와라
export const useAddCar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (car) => addCar(car),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cars"] }),
  });
};

export const useDeleteCar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteCar(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cars"] }),
  });
};

// mutationFn은 파라미터 1개 밖에 못 옴
export const useUpdateCar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateCar(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cars"] }),
  });
};
