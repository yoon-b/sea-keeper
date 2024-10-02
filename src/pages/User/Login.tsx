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

  const navigate = useNavigate();

  return (
    <div
      className="w-[100vw] h-[100vh] bg-no-repeat bg-center bg-cover flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-[300px] bg-transparent border-2 border-white/20 backdrop-blur-[20px] shadow-lg text-white rounded-[10px] p-[30px]">
        <h1 className="text-2xl text-center mb-8">바다환경 지킴이</h1>
        {/* <h1 className="text-2xl text-center mb-8">로그인</h1> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative w-full h-[50%] my-2">
            <input
              {...register("phoneNumber")}
              className="appearance-none block w-full bg-transparent text-white border-2 border-white/20 rounded-3xl h-10 p-5 pr-11 outline-none"
              required
              type="number"
              placeholder="전화번호"
            />
            <PhoneAndroid className="absolute right-5 top-1/2 transform -translate-y-1/2 text-base" />
          </div>

          <div className="relative w-full h-[50%] my-4">
            <input
              {...register("password")}
              className="appearance-none block w-full bg-transparent text-white border-2 border-white/20 rounded-3xl h-10 p-5 pr-11 outline-none"
              required
              type="password"
              placeholder="비밀번호"
            />
            <Lock className="absolute right-5 top-1/2 transform -translate-y-1/2 text-base" />
          </div>

          <button
            type="submit"
            // className="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500"
            className="w-full h-[40px] bg-white border-0 outline-none rounded-[40px] shadow-md cursor-pointer text-base text-gray-800 font-bold"
          >
            로그인
          </button>
        </form>

        <Link to="/signup">
          {/* <button className="mb-2 md:mb-0 bg-grey-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-grey-500"> */}
          <button className="w-full h-[40px] bg-transparent border-2 border-white/20 rounded-[40px] shadow-md cursor-pointer text-base text-gray-400 mt-4">
            회원가입
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
