import axiosInstance from "./axiosConfig";

// 미수거 쓰레기 전체 조회
export const fetchNoPickupTrashs = async () => {
    try {
      const res = await axiosInstance.get(`/map/not-pickup`);
      return res.data.result;
    } catch (err) {
      console.log("failed to fetch data", err);
      throw new Error("미수거 쓰레기 목록 조회 실패");
    }
  };


// 가장 가까운 쓰레기 데이터 조회
export const fetchClosestTrash = async ( latitude: number, longitude: number ) => {
    try {
      const res = await axiosInstance.get(`/closest-trash`,{
        params: {
            latitude: latitude,
            longitude: longitude
        }
      });
      return res.data.result;
    } catch (err) {
      console.log("failed to fetch data", err);
      throw new Error("가장 가까운 쓰레기 조회 실패");
    }
  };

// 쓰레기 수거 완료 상태 변경
export const updatePickupStatus = async (cleanupId: number) => {
  try {
    const res = await axiosInstance.patch(`/pickup-do/${cleanupId}`);
    return res.data;
  } catch (err) {
    console.log("failed to update pickup status", err);
    throw new Error("수거 상태 완료로 변경 실패");
  }
};