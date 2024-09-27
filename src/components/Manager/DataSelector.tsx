import React from "react";
import { Controller, Control } from "react-hook-form";

interface DataSelectorProps {
  control: Control;
}

const DataSelector: React.FC<DataSelectorProps> = ({ control }) => {
  return (
    <Controller
      control={control}
      name="selectedOption"
      rules={{ required: true }}
      render={({ field }) => (
        <select
          {...field}
          className="border border-gray-600 rounded w-full h-[40px] text-white"
          id="data-selector"
        >
          <option value="" disabled>
            조회 데이터 선택
          </option>
          <option value="option1">옵션 1</option>
          <option value="option2">옵션 2</option>
          <option value="option3">옵션 3</option>
        </select>
      )}
    />
  );
};

export default DataSelector;
