import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api/accountApi";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import PhoneAndroid from "@mui/icons-material/PhoneAndroid";
import Lock from "@mui/icons-material/Lock";
import Person from "@mui/icons-material/Person";
import backgroundImage from "../../assets/image/login-background-2.jpg";

interface IFormInput {
  name: string;
  phoneNumber: number;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();

  const goBack = () => {
    navigate(-1);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await signup(data.name, data.phoneNumber, data.password);
      console.log(response);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const password = watch("password");

  return (
    <React.Fragment>
      <div onClick={goBack} className="absolute top-0 left-0 p-2 m-2 w-11 h-11">
        <ArrowBackIosNew />
      </div>

      <div
        className="page-container bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="w-[300px] bg-transparent border-2 border-white/20 backdrop-blur-[20px] shadow-lg text-white rounded-[10px] p-[30px]">
          <h1 className="text-2xl text-center mb-8">바다환경 지킴이</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative w-full h-[50%] my-2">
              <input
                {...register("name")}
                className="account-input-field"
                required
                type="text"
                placeholder="이름"
              />
              <Person className="account-icon" />
            </div>

            <div className="relative w-full h-[50%] my-2">
              <input
                {...register("phoneNumber")}
                className="account-input-field"
                required
                type="number"
                placeholder="전화번호"
              />
              <PhoneAndroid className="account-icon" />
            </div>

            <div className="relative w-full h-[50%] my-2">
              <input
                {...register("password")}
                className="account-input-field"
                required
                type="password"
                placeholder="비밀번호"
              />
              <Lock className="account-icon" />
            </div>

            <div className="relative w-full h-[50%] mt-2 mb-4">
              <input
                {...register("confirmPassword", {
                  required: "비밀번호 확인은 필수입니다.",
                  validate: (value) =>
                    value === password || "비밀번호가 일치하지 않습니다.",
                })}
                className="account-input-field"
                required
                type="password"
                placeholder="비밀번호 확인"
              />
              <Lock className="account-icon" />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full h-[40px] bg-white border-0 outline-none rounded-[40px] shadow-md cursor-pointer text-base text-gray-800 font-bold"
            >
              가입하기
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
