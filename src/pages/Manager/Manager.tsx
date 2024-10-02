import { useState } from "react";
import DataForm from "../../components/Manager/DataForm";
import BarChart from "../../components/Manager/BarChart";
import {
  fetchInspectionForMap,
  fetchCleanupForMap,
  fetchAverageForMap,
  downloadData,
} from "../../api/statisticsApi";
import StatisticalMap from "../../components/Manager/StatisticalMap";
import {
  getChartConfig,
  calculateTrashTypeTotals,
  coastStatsToChartData,
} from "../../utils/chartUtils";

const Manager = () => {
  const [fetchedData, setFetchedData] = useState<
    (Inspection | Cleanup | CoastStats)[]
  >([]);
  const [filteredData, setFilteredData] = useState<
    (Inspection | Cleanup | CoastStats)[]
  >([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig | null>();
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [endPoint, setEndPoint] = useState<"monitoring" | "cleanup">(
    "monitoring"
  );
  const [_selectedValue, setSelectedValue] = useState<string | number | null>(
    null
  );

  const isCoastStats = (item: any): item is CoastStats => {
    return "avgTrashVolume" in item;
  };

  const isInspectionOrCleanup = (item: any): item is Inspection | Cleanup => {
    return "mainTrashType" in item;
  };

  const handleDataFetch = async (
    selectedOption: string,
    startTime: string,
    endTime: string
  ) => {
    setChartConfig(getChartConfig(selectedOption));
    setStartTime(startTime);
    setEndTime(endTime);

    try {
      let result;
      switch (selectedOption) {
        case "average":
          result = await fetchAverageForMap(startTime, endTime);
          setFetchedData(result);
          setFilteredData(result);
          setChartData(coastStatsToChartData(result));
          break;

        case "estimatedAmount":
        case "estimatedType":
          result = await fetchInspectionForMap(startTime, endTime);
          setFetchedData(result);
          setFilteredData(result);
          setChartData(calculateTrashTypeTotals(result));
          setEndPoint("monitoring");
          break;

        default:
          result = await fetchCleanupForMap(startTime, endTime);
          setFetchedData(result);
          setFilteredData(result);
          setChartData(calculateTrashTypeTotals(result));
          setEndPoint("cleanup");
          break;
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  const handleItemClick = (xValue: string | number) => {
    setSelectedValue((prevSelectedValue) => {
      if (xValue === prevSelectedValue) {
        setFilteredData(fetchedData || []);
        return null;
      } else {
        let filteredData: (Inspection | Cleanup | CoastStats)[] = [];

        if (isCoastStats(fetchedData[0])) {
          filteredData = fetchedData.filter((item) =>
            isCoastStats(item) ? item.coastName === xValue : false
          );
        } else if (isInspectionOrCleanup(fetchedData[0])) {
          filteredData = fetchedData.filter((item) =>
            isInspectionOrCleanup(item)
              ? item.mainTrashType === Number(xValue)
              : false
          );
        }

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
        className="m-4 md:mb-0 bg-grey-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-10"
        onClick={handleDownload}
      >
        데이터 다운로드
      </button>
    </>
  );
};

export default Manager;
