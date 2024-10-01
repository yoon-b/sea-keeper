import { FC } from "react";

type WaypointBtnProps = {
  pointName: string;
};

const WaypointBtn : FC<WaypointBtnProps> = ({ pointName }) => {

//   const handleMouseOver = () => {
//     // console.log("여기에 토스트를 띄우고시퍼")
//   }

  return (
    <div className="inline-block px-4 py-1 mb-2 bg-white border-2 border-gray-400 rounded-full text-blue-500 font-bold">
      {pointName}
    </div>
  )
}

export default WaypointBtn;