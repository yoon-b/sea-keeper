import { useState } from "react";
import DataForm from "../../components/Manager/DataForm";
import BarChart from "../../components/Manager/BarChart";
import {
  fetchInspectionForMap,
  fetchCleanupForMap,
  fetchAverageForMap,
  transformInspectionToCleanup,
  downloadData,
} from "../../api/statisticsApi";
import StatisticalMap from "../../components/Manager/StatisticalMap";
import {
  getChartConfig,
  calculateTrashTypeTotals,
} from "../../utils/chartUtils";

// interface CoastStats {
//   coastName: string;
//   avgTrashVolume: number;
//   latitude: number;
//   longitude: number;
// }

const Manager = () => {
  const [fetchedData, setFetchedData] = useState<Cleanup[]>([]);
  const [filteredData, setFilteredData] = useState<Cleanup[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig | null>();
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [endPoint, setEndPoint] = useState<"monitoring" | "cleanup">(
    "monitoring"
  );
  const chartData = calculateTrashTypeTotals(fetchedData);
  const [_selectedValue, setSelectedValue] = useState<number | null>(null);

  const handleDataFetch = async (
    selectedOption: string,
    startTime: string,
    endTime: string
  ) => {
    setChartConfig(getChartConfig(selectedOption));
    setStartTime(startTime);
    setEndTime(endTime);

    if (selectedOption === "average") {
      try {
        const result = await fetchAverageForMap(startTime, endTime);
        console.log(result);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    } else if (
      selectedOption === "estimatedAmount" ||
      selectedOption === "estimatedType"
    ) {
      try {
        const result = await fetchInspectionForMap(startTime, endTime);
        const transformedData = transformInspectionToCleanup(result);
        setFetchedData(transformedData);
        setFilteredData(transformedData);
        setEndPoint("monitoring");
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    } else {
      try {
        const result = await fetchCleanupForMap(startTime, endTime);
        setFetchedData(result);
        setFilteredData(result);
        setEndPoint("cleanup");
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    }
  };

  const handleItemClick = (xValue: number) => {
    setSelectedValue((prevSelectedValue) => {
      if (xValue === prevSelectedValue) {
        setFilteredData(fetchedData);
        return null;
      } else {
        const filteredData = fetchedData.filter(
          (item) => item.mainTrashType === xValue
        );
        setFilteredData(filteredData);
        return xValue;
      }
    });
  };

  const handleDownload = async () => {
    await downloadData(startTime, endTime, endPoint);
  };

  return (
    <>
      <div className="border my-4 p-2">
        <DataForm onDataFetch={handleDataFetch} />
      </div>

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

      <button
        className="m-4 md:mb-0 bg-grey-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-10 hover:shadow-lg hover:bg-grey-500"
        onClick={handleDownload}
      >
        데이터 다운로드
      </button>
    </>
  );
};

export default Manager;
