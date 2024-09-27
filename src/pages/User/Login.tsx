import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { login } from "../../api/accountApi";

interface IFormInput {
  phoneNumber: number;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await login(data.phoneNumber, data.password);
      console.log(response);
      navigate("/home");
    } catch (error) {
      console.error("로그인 실패:", error);
      // 로그인 실패 toast notification?
    }
  };

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between">
          <label className="font-semibold text-gray-600 py-2">전화번호</label>
          <input
            {...register("phoneNumber")}
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
            required
            type="number"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="font-semibold text-gray-600 py-2">비밀번호</label>
          <input
            {...register("password")}
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
            required
            type="password"
          />
        </div>

        <button
          type="submit"
          className="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500"
        >
          로그인
        </button>
      </form>

      <Link to="/signup">
        <button className="mb-2 md:mb-0 bg-grey-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-grey-500">
          회원가입
        </button>
      </Link>
    </React.Fragment>
  );
};

export default Login;
