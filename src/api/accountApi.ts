import axios from "axios";

interface LoginResponse {
  name: string;
  role: string;
  tokenInfo: {
    grantType: string;
    accessToken: string;
    refreshToken: string;
  };
}

interface SignupResponse {
  id: number;
  name: string;
  phoneNumber: string;
}

export const login = async (
  phoneNumber: number,
  password: string
): Promise<LoginResponse> => {
  try {
    const phoneNumberString = String(phoneNumber);

    const res = await axios.post<LoginResponse>(
      `${process.env.REACT_APP_BACK_URL}/login`,
      {
        phoneNumber: phoneNumberString,
        password,
      }
    );

    localStorage.setItem("accessToken", res.data.tokenInfo.accessToken);

    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error("로그인 요청 실패");
  }
};

export const signup = async (
  name: string,
  phoneNumber: number,
  password: string
): Promise<SignupResponse> => {
  try {
    const phoneNumberString = String(phoneNumber);

    const res = await axios.post<SignupResponse>(
      `${process.env.REACT_APP_BACK_URL}/signup`,
      {
        phoneNumber: phoneNumberString,
        password,
        name,
        roles: ["USER"],
      }
    );
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error("회원가입 요청 실패");
  }
};
