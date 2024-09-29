import { useState } from "react";
import DataForm from "../../components/Manager/DataForm";
import { fetchCleanupForMap } from "../../api/statisticsApi";
import StatisticalMap from "../../components/Manager/StatisticalMap";

const Manager = () => {
  const [fetchedData, setFetchedData] = useState<Cleanup[]>([]);
  const [dataTitle, setDataTitle] = useState<string>("");

  const handleDataFetch = async (
    selectedOption: string,
    startTime: string,
    endTime: string
  ) => {
    setDataTitle(selectedOption);

    if (selectedOption === "average") {
      console.log("해안선 별 거리대비 평균 수거량 차트");
    } else {
      try {
        const result = await fetchCleanupForMap(startTime, endTime);
        setFetchedData(result);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    }
  };

  return (
    <>
      <div className="border my-4 p-2">
        <DataForm onDataFetch={handleDataFetch} />
      </div>
      <div>{dataTitle}</div>

      <div className="p-28">통계 차트</div>

      <StatisticalMap markers={fetchedData} />

      <button className="m-4 md:mb-0 bg-grey-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-10 hover:shadow-lg hover:bg-grey-500">
        데이터 다운로드
      </button>
    </>
  );
};

export default Manager;
