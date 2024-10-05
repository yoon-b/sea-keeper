import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./data-form.module.css";
import Remove from "@mui/icons-material/Remove";

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
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const setDateRange = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);

    setValue("startDate", start);
    setValue("endDate", end);
  };

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
          className="border border-gray-600 rounded-xl w-full h-[40px] bg-transparent pl-2"
        >
          <option value="" disabled>
            조회 데이터 선택
          </option>
          <option value="estimatedAmount">[조사] 쓰레기 예측량</option>
          <option value="estimatedType">[조사] 주요 쓰레기 종류</option>
          <option value="" disabled>
            --------------------
          </option>
          <option value="realizedAmount">[청소] 쓰레기 수거량</option>
          <option value="realizedType">[청소] 주요 쓰레기 종류</option>
          <option value="average">[청소] 거리 대비 평균 수거량</option>
        </select>
        {errors.selectedOption && (
          <p className="text-red-500">조회 데이터 선택은 필수입니다.</p>
        )}
      </div>

      <div className="flex space-x-2">
        <button
          type="button"
          onClick={() => setDateRange(7)}
          className="custom-chip"
        >
          1주일
        </button>
        <button
          type="button"
          onClick={() => setDateRange(30)}
          className="custom-chip"
        >
          1개월
        </button>
        <button
          type="button"
          onClick={() => setDateRange(90)}
          className="custom-chip"
        >
          3개월
        </button>
        <button
          type="button"
          onClick={() => setDateRange(180)}
          className="custom-chip"
        >
          6개월
        </button>
      </div>

      <div className="flex space-x-2">
        <div>
          <DatePicker
            locale={ko}
            selected={startDate}
            onChange={(date) => setValue("startDate", date as Date)}
            dateFormat="yyyy.MM.dd"
            className="border border-gray-600 rounded-xl w-full h-[40px] bg-transparent text-center"
            placeholderText="시작일"
            minDate={new Date(2020, 0, 1)}
            maxDate={new Date()}
            calendarClassName={styles["calendar-popup"]}
          />
          {errors.startDate && (
            <p className="text-red-500">시작일은 필수입니다.</p>
          )}
        </div>

        <Remove className="text-gray-600 mt-2" />

        <div>
          <DatePicker
            locale={ko}
            selected={endDate}
            onChange={(date) => setValue("endDate", date as Date)}
            dateFormat="yyyy.MM.dd"
            className="border border-gray-600 rounded-xl w-full h-[40px] bg-transparent text-center"
            placeholderText="종료일"
            minDate={new Date(2020, 0, 1)}
            maxDate={new Date()}
          />
          {errors.endDate && (
            <p className="text-red-500">종료일은 필수입니다.</p>
          )}
        </div>

        <button
          type="submit"
          className="text-white rounded-full pl-2 pt-1 w-[36px] h-[36px]"
          style={{ backgroundColor: "#1d2268" }}
        >
          <SearchIcon />
        </button>
      </div>
    </form>
  );
};

export default DataForm;
