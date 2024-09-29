import axiosInstance from "./axiosConfig";
import axios from "axios";

export const fetchCleanupForMap = async (
  startTime: string,
  endTime: string
) => {
  try {
    const res = await axiosInstance.get(`/map/cleanups`, {
      params: {
        startTime,
        endTime,
      },
    });
    // console.log(res.data.result);
    return res.data.result;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        console.log("서버 응답 오류: ", err.response);
      } else if (err.request) {
        console.log("요청 성공 & 응답 없음: ", err.request);
      } else {
        console.log("failed to fetch data", err);
        throw new Error("수거 기록 조회 실패");
      }
    }
  }
};
