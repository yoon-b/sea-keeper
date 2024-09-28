import axios from "axios";

const axiosInstance = axios.create({
  // .env 파일에 환경변수 생성 후 사용
  baseURL: import.meta.env.VITE_BACK_URL,
  // headers: {
  //   "Content-Type": "application/json",
  // },
  withCredentials: true,
});

// Axios 인스턴스에 요청 전에 인터셉트해서 accessToken 추가
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    console.log("AccessToken이 없습니다", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
