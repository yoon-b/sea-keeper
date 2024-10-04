import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../../recoil/userAtom";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { login } from "../../api/accountApi";
import PhoneAndroid from "@mui/icons-material/PhoneAndroid";
import Lock from "@mui/icons-material/Lock";
// import backgroundImage from "../../assets/image/login-background.jpg";
import backgroundImage from "../../assets/image/login-background-2.jpg";

interface IFormInput {
  phoneNumber: number;
  password: string;
}

const Login = () => {
  const setUser = useSetRecoilState(userAtom);
  const { register, handleSubmit } = useForm<IFormInput>();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const res = await login(data.phoneNumber, data.password);
      localStorage.setItem("accessToken", res.result.tokenInfo.accessToken);

      setUser({
        name: res.result.name,
      });

      navigate("/home");
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return (
    <div
      className="page-container bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-[300px] bg-transparent border-2 border-white/20 backdrop-blur-[20px] shadow-lg text-white rounded-[10px] p-[30px]">
        <h1 className="text-2xl text-center mb-8">바다환경 지킴이</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative w-full h-[50%] my-2">
            <input
              {...register("phoneNumber")}
              className="account-input-field"
              required
              type="number"
              placeholder="전화번호"
            />
            <PhoneAndroid className="report-input-unit" />
          </div>

          <div className="relative w-full h-[50%] my-4">
            <input
              {...register("password")}
              className="account-input-field"
              required
              type="password"
              placeholder="비밀번호"
            />
            <Lock className="report-input-unit" />
          </div>

          <button
            type="submit"
            className="w-full h-[40px] bg-white border-0 outline-none rounded-[40px] shadow-md cursor-pointer text-base text-gray-800 font-bold"
          >
            로그인
          </button>
        </form>

        <Link to="/signup">
          <button className="w-full h-[40px] bg-transparent border-2 border-white/20 rounded-[40px] shadow-md cursor-pointer text-base text-gray-400 mt-4">
            회원가입
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
