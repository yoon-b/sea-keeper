import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api/accountApi";

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

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      console.log("data: ", data);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="font-semibold text-gray-600 py-2">이름</label>
        <input
          {...register("name", { required: "이름은 필수입니다." })}
          className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
          required
          type="text"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <label className="font-semibold text-gray-600 py-2">전화번호</label>
        <input
          {...register("phoneNumber", { required: "전화번호는 필수입니다." })}
          className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
          required
          type="number"
        />
        {errors.phoneNumber && (
          <p className="text-red-500">{errors.phoneNumber.message}</p>
        )}

        <label className="font-semibold text-gray-600 py-2">비밀번호</label>
        <input
          {...register("password", { required: "비밀번호는 필수입니다." })}
          className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
          required
          type="password"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <label className="font-semibold text-gray-600 py-2">
          비밀번호 확인
        </label>
        <input
          {...register("confirmPassword", {
            required: "비밀번호 확인은 필수입니다.",
            validate: (value) =>
              value === password || "비밀번호가 일치하지 않습니다.",
          })}
          className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
          required
          type="password"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}

        <button
          type="submit"
          className="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500"
        >
          가입하기
        </button>
      </form>
    </React.Fragment>
  );
};

export default SignUp;
