import { FC, ReactNode } from "react";

type SummaryBoxProps = {
    icon: ReactNode;
    titleText: string;
    contentText: string;
  };


const SummaryBox : FC<SummaryBoxProps> = ({ icon, titleText, contentText }) => {

  return (
    <div className="bg-white rounded-md flex w-[100%] p-2">
      <div className="flex items-center justify-center">
        {icon}
      </div>
      <div className="flex flex-col items-start justify-center ml-4">
        <span className="text-gray-500 text-xs">{titleText}</span>
        <span className="text-blue-500 text-sm">{contentText}</span>
      </div>
    </div>
  )
}

export default SummaryBox;