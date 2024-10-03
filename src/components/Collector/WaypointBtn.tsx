import { FC } from "react";

type WaypointBtnProps = {
  pointName: string;
  isLast: boolean;
};

const WaypointBtn : FC<WaypointBtnProps> = ({ pointName, isLast }) => {

  return (
    <div
      className="flex items-center mb-2"
    >
      <div
        className={`inline-block text-sm px-2 py-1 mr-1 bg-white border-2 rounded-full font-bold ${
          isLast
            ? "border-blue-400 text-blue-500"
            : "border-gray-400 text-gray-500"
        }`}
      >
        {pointName}
      </div>
      {!isLast && <span className="mr-1 text-gray-500">→</span>}
    </div>
  )
}

export default WaypointBtn;