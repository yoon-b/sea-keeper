import React from "react";

const colors = ["#267EC3", "#46B3A9", "#FDBB3A", "#FF6178", "#8B75D7"];

interface ChartChipProps {
  value: string;
  color: string; // 색상 추가
}

const ChartChip: React.FC<ChartChipProps> = ({ value, color }) => {
  return (
    <div className="flex items-center p-1 text-xs text-black rounded-md mx-1 mb-1">
      <div
        className="w-2 h-2 mr-1 rounded"
        style={{ backgroundColor: color }}
      />
      <p>{value}</p>
    </div>
  );
};

interface ChartChipContainerProps {
  chipsFor: "Volume" | "Type" | "Avg";
}

const ChartChipContainer: React.FC<ChartChipContainerProps> = ({
  chipsFor,
}) => {
  let values: string[];

  if (chipsFor === "Type") {
    values = [
      "폐어구류",
      "부표류",
      "생활쓰레기류",
      "대형 투기쓰레기류",
      "초목류",
    ];
  } else if (chipsFor === "Volume") {
    values = ["~200L", "200L~300L", "300L~400L", "400L~500L", "500L~"];
  } else {
    return null;
  }

  return (
    <div className="w-[90dvw] flex flex-wrap justify-center items-center mx-auto">
      {values.map((value, index) => (
        <ChartChip key={index} value={value} color={colors[index]} />
      ))}
    </div>
  );
};

export default ChartChipContainer;
