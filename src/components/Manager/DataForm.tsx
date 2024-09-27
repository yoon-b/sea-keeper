import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";

interface DataFormData {
  selectedOption: string;
  startDate: Date;
  endDate: Date;
}

const DataForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DataFormData>({
    defaultValues: {
      selectedOption: "",
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const onSubmit = (data: DataFormData) => {
    console.log("Selected dates:", data.startDate, data.endDate);
    console.log("Selected option:", data.selectedOption);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
      <div>
        <select
          {...register("selectedOption", { required: true })}
          className="border border-gray-600 rounded w-full h-[40px] text-white"
        >
          <option value="" disabled>
            조회 데이터 선택
          </option>
          <option value="option1">옵션 1</option>
          <option value="option2">옵션 2</option>
          <option value="option3">옵션 3</option>
        </select>
        {errors.selectedOption && (
          <p className="text-red-500">조회 데이터 선택은 필수입니다.</p>
        )}
      </div>

      <div className="flex space-x-2">
        <div>
          <DatePicker
            locale={ko}
            selected={startDate}
            onChange={(date) => setValue("startDate", date as Date)}
            dateFormat="yyyy.MM.dd"
            className="border border-gray-600 rounded w-full h-[40px] text-white text-center"
            placeholderText="시작일"
            minDate={new Date(2020, 0, 1)}
            maxDate={new Date()}
          />
          {errors.startDate && (
            <p className="text-red-500">시작일은 필수입니다.</p>
          )}
        </div>

        <p>-</p>

        <div>
          <DatePicker
            locale={ko}
            selected={endDate}
            onChange={(date) => setValue("endDate", date as Date)}
            dateFormat="yyyy.MM.dd"
            className="border border-gray-600 rounded w-full h-[40px] text-white text-center"
            placeholderText="종료일"
            minDate={new Date(2020, 0, 1)}
            maxDate={new Date()}
          />
          {errors.endDate && (
            <p className="text-red-500">종료일은 필수입니다.</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white rounded py-2 px-4"
      >
        조회하기
      </button>
    </form>
  );
};

export default DataForm;
