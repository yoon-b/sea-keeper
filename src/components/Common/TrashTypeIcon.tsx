import React from "react";

interface TrashTypeIconProps {
  value: number;
}

const TrashTypeIcon: React.FC<TrashTypeIconProps> = ({ value }) => {
  const colorMap: Record<number, string> = {
    1: "bg-[#267EC3]",
    2: "bg-[#46B3A9]",
    3: "bg-[#FDBB3A]",
    4: "bg-[#FF6178]",
    5: "bg-[#8B75D7]",
  };

  const colorClass = colorMap[value] || "bg-gray-400";

  return (
    <div
      className={`relative flex items-center justify-center w-5 h-5 rounded-full border-1 border-transparent`}
    >
      <div
        className={`absolute w-full h-full rounded-full ${colorClass}`}
        style={{
          filter: "blur(2px)",
        }}
      />
      <div
        className={`flex items-center justify-center w-full h-full rounded-full ${colorClass} border-2 border-white`}
      >
        <span className="text-gray-200" style={{ zIndex: 2 }}>
          {value}
        </span>
      </div>
    </div>
  );
};

export default TrashTypeIcon;
