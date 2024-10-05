import axiosInstance from "./axiosConfig";

// 전체 사용자 목록 반환
export const fetchUserList = async () => {
  try {
    const res = await axiosInstance.get(`/admin/user-list`);
    return res.data.result;
  } catch (err) {
    console.log("failed to fetch data", err);
    throw new Error("전체 사용자 목록 조회 실패");
  }
};
