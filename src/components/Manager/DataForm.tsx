import { useForm } from "react-hook-form";
import DataSelector from "./DataSelector";
import DateRangePicker from "./DateRangePicker";

interface DataFormData {
  selectedOption: string;
  startDate: Date;
  endDate: Date;
}

const DataForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DataFormData>({
    defaultValues: {
      selectedOption: "",
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const onSubmit = (data: DataFormData) => {
    console.log("Selected dates:", data.startDate, data.endDate);
    console.log("Selected option:", data.selectedOption);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
      <div>
        <DataSelector control={control} />
        {errors.selectedOption && (
          <p className="text-red-500">조회 데이터 선택은 필수입니다.</p>
        )}
      </div>

      <div>
        <DateRangePicker control={control} />
        {errors.startDate && (
          <p className="text-red-500">시작일은 필수입니다.</p>
        )}
        {errors.endDate && <p className="text-red-500">종료일은 필수입니다.</p>}
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
