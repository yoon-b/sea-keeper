import axios from "axios";

interface LoginResponse {
  status: number;
  result: {
    name: string;
    role: string;
    tokenInfo: {
      grantType: string;
      accessToken: string;
      refreshToken: string;
    };
  };
  message: string;
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
      `${import.meta.env.VITE_BACK_URL}/login`,
      {
        phoneNumber: phoneNumberString,
        password,
      }
    );
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
      `${import.meta.env.VITE_BACK_URL}/signup`,
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
