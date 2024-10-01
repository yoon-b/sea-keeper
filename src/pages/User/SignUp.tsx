import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api/accountApi";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";

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
      // console.log("data: ", data);
      const response = await signup(data.name, data.phoneNumber, data.password);
      console.log(response);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const password = watch("password");

  const commonInputClass =
    "appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4";

  return (
    <React.Fragment>
      <div onClick={goBack} className="absolute top-0 left-0 p-2 m-2 w-11 h-11">
        <ArrowBackIosNew />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="font-semibold text-gray-600 py-2">이름</label>
        <input
          {...register("name", { required: "이름은 필수입니다." })}
          className={commonInputClass}
          required
          type="text"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <label className="font-semibold text-gray-600 py-2">전화번호</label>
        <input
          {...register("phoneNumber", { required: "전화번호는 필수입니다." })}
          className={commonInputClass}
          required
          type="number"
        />
        {errors.phoneNumber && (
          <p className="text-red-500">{errors.phoneNumber.message}</p>
        )}

        <label className="font-semibold text-gray-600 py-2">비밀번호</label>
        <input
          {...register("password", { required: "비밀번호는 필수입니다." })}
          className={commonInputClass}
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
          className={commonInputClass}
          required
          type="password"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}

        <button
          type="submit"
          className="my-4 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full"
        >
          가입하기
        </button>
      </form>
    </React.Fragment>
  );
};

export default SignUp;
