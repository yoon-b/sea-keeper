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

// 청소 배정
export const assignTaskToUser = async (
  memberId: number,
  cleanups: number[]
) => {
  try {
    const res = await axiosInstance.get(`/admin/cleanup-assign`, {
      params: {
        memberId: memberId,
        cleanupIdList: cleanups,
      },
      paramsSerializer: (params) => {
        const queryString = Object.keys(params)
          .map((key) => {
            const value = params[key];
            if (Array.isArray(value)) {
              return value
                .map(
                  (v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`
                )
                .join("&");
            }
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
          })
          .join("&");
        return queryString;
      },
    });

    return res.data;
  } catch (err) {
    console.log("failed to assign task", err);
    throw new Error("작업 배정 실패");
  }
};
