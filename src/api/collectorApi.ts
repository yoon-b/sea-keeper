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