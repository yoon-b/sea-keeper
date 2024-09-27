import { Controller, Control } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateRangeFormData {
  startDate: Date;
  endDate: Date;
}

interface DateRangePickerProps {
  control: Control<DateRangeFormData>;
}

const DateRangePicker = ({ control }: DateRangePickerProps) => {
  return (
    <div className="flex">
      <Controller
        control={control}
        name="startDate"
        rules={{ required: true }}
        render={({ field }) => (
          <DatePicker
            dateFormat="yyyy.MM.dd"
            shouldCloseOnSelect
            minDate={new Date("2000-01-01")}
            maxDate={new Date()}
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            className="flex items-center border border-gray-600 rounded w-full h-[24px] text-white text-center"
            placeholderText="시작일"
            id="start-date"
          />
        )}
      />

      <p className="px-2">-</p>

      <Controller
        control={control}
        name="endDate"
        rules={{ required: true }}
        render={({ field }) => (
          <DatePicker
            dateFormat="yyyy.MM.dd"
            shouldCloseOnSelect
            minDate={new Date("2000-01-01")}
            maxDate={new Date()}
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            className="flex items-center border border-gray-600 rounded w-full h-[24px] text-white text-center"
            placeholderText="종료일"
            id="end-date"
          />
        )}
      />
    </div>
  );
};

export default DateRangePicker;
