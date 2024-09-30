import { useState } from "react";
import DataForm from "../../components/Manager/DataForm";
import BarChart from "../../components/Manager/BarChart";
import { fetchCleanupForMap } from "../../api/statisticsApi";
import StatisticalMap from "../../components/Manager/StatisticalMap";
import {
  getChartConfig,
  calculateTrashTypeTotals,
} from "../../utils/chartUtils";
// import SimpleBarChart from "../../components/Manager/SimpleBarChart";

const Manager = () => {
  const [fetchedData, setFetchedData] = useState<Cleanup[]>([]);
  const [filteredData, setFilteredData] = useState<Cleanup[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig | null>();
  const chartData = calculateTrashTypeTotals(fetchedData);

  const handleDataFetch = async (
    selectedOption: string,
    startTime: string,
    endTime: string
  ) => {
    setChartConfig(getChartConfig(selectedOption));

    if (selectedOption === "average") {
      console.log("해안선 별 거리대비 평균 수거량 차트");
    } else {
      try {
        const result = await fetchCleanupForMap(startTime, endTime);
        setFetchedData(result);
        setFilteredData(result);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    }
  };

  const handleItemClick = (xValue: number) => {
    if (xValue === -1) {
      setFilteredData(fetchedData);
    } else {
      const filteredData = fetchedData.filter(
        (item) => item.mainTrashType === xValue
      );
      setFilteredData(filteredData);
    }
  };

  return (
    <>
      <div className="border my-4 p-2">
        <DataForm onDataFetch={handleDataFetch} />
      </div>

      {/* for testing bar colors */}
      {/* <SimpleBarChart /> */}

      {chartConfig && fetchedData ? (
        <div className="bg-white bg-opacity-40 rounded-xl mb-4">
          <div>{chartConfig.title}</div>
          <BarChart
            xAxisName={chartConfig.xAxis}
            yAxisName={chartConfig.yAxis}
            data={chartData}
            onItemClick={handleItemClick}
          />
        </div>
      ) : (
        <div className="p-28">통계 차트</div>
      )}

      <StatisticalMap markers={filteredData} />

      <button className="m-4 md:mb-0 bg-grey-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-10 hover:shadow-lg hover:bg-grey-500">
        데이터 다운로드
      </button>
    </>
  );
};

export default Manager;
