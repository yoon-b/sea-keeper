import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./data-form.module.css";

interface DataFormProps {
  onDataFetch: (
    selectedOption: string,
    startTime: string,
    endTime: string
  ) => void;
}

interface DataFormData {
  selectedOption: string;
  startDate: Date;
  endDate: Date;
}

const DataForm = ({ onDataFetch }: DataFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DataFormData>({
    defaultValues: {
      selectedOption: "",
      startDate: new Date("2017-11-29"),
      endDate: new Date(),
    },
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const onSubmit = async (data: DataFormData) => {
    const adjustedStartDate = new Date(data.startDate);
    adjustedStartDate.setHours(0, 0, 0, 0);

    const adjustedEndDate = new Date(data.endDate);
    adjustedEndDate.setHours(23, 59, 59, 999);

    onDataFetch(
      data.selectedOption,
      adjustedStartDate.toISOString(),
      adjustedEndDate.toISOString()
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <select
          {...register("selectedOption", { required: true })}
          className="border border-gray-600 rounded w-full h-[40px] text-white"
        >
          <option value="" disabled>
            조회 데이터 선택
          </option>
          <option value="estimatedAmount">쓰레기 예측량</option>
          <option value="realizedAmount">쓰레기 실 수거량</option>
          <option value="type">주요 쓰레기 종류</option>
          <option value="average">거리 대비 평균 수거량</option>
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
            calendarClassName={styles["calendar-popup"]}
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

        <button type="submit" className="text-white rounded-full p-2">
          <SearchIcon />
        </button>
      </div>
    </form>
  );
};

export default DataForm;
