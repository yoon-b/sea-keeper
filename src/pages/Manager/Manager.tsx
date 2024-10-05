import { useState } from "react";
import DataForm from "../../components/Manager/DataForm";
import BarChart from "../../components/Manager/BarChart";
import ChartChipContainer from "../../components/Manager/ChartChip";
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
  calculatePollutionLevelTotals,
  coastStatsToChartData,
} from "../../utils/chartUtils";
import Download from "@mui/icons-material/Download";

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
  const [endPoint, setEndPoint] = useState<"monitoring" | "cleanup" | "avg">(
    "monitoring"
  );
  const [_selectedValue, setSelectedValue] = useState<string | number | null>(
    null
  );
  const [chartChip, setChartChip] = useState<"Volume" | "Type" | "Avg">(
    "Volume"
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
          setEndPoint("avg");
          setChartChip("Avg");
          break;

        case "estimatedAmount":
          result = await fetchInspectionForMap(startTime, endTime);
          setFetchedData(result);
          setFilteredData(result);
          setChartData(calculatePollutionLevelTotals(result));
          setEndPoint("monitoring");
          setChartChip("Volume");
          break;

        case "estimatedType":
          result = await fetchInspectionForMap(startTime, endTime);
          setFetchedData(result);
          setFilteredData(result);
          setChartData(calculateTrashTypeTotals(result));
          setEndPoint("monitoring");
          setChartChip("Type");
          break;

        case "realizedAmount":
          result = await fetchCleanupForMap(startTime, endTime);
          setFetchedData(result);
          setFilteredData(result);
          setChartData(calculatePollutionLevelTotals(result));
          setEndPoint("cleanup");
          setChartChip("Volume");
          break;

        default:
          result = await fetchCleanupForMap(startTime, endTime);
          setFetchedData(result);
          setFilteredData(result);
          setChartData(calculateTrashTypeTotals(result));
          setEndPoint("cleanup");
          setChartChip("Type");
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
    <div className="w-[100dvw] flex items-center justify-center flex-col pt-10 text-black">
      {/* <h2 className="font-4xl font-bold pt-4 m-2">해양 쓰레기 데이터 조회</h2> */}
      <div className="m-4 mt-8">
        <DataForm onDataFetch={handleDataFetch} />
      </div>

      {chartConfig && fetchedData ? (
        fetchedData.length > 0 ? (
          <div className="bg-white bg-opacity-40 rounded-xl mb-6">
            <div>{chartConfig.title}</div>
            <BarChart
              xAxisName={chartConfig.xAxis}
              yAxisName={chartConfig.yAxis}
              data={chartData}
              onItemClick={handleItemClick}
            />
            {chartChip !== "Avg" && <ChartChipContainer chipsFor={chartChip} />}
          </div>
        ) : (
          <div className="w-[90dvw] h-[205px] border-dashed border-2 border-gray-300 rounded-xl mt-2 mb-6 flex justify-center items-center">
            조회한 기간 내 데이터가 없어요. <br />
            새로 조회해주세요.
          </div>
        )
      ) : (
        <div className="w-[90dvw] h-[205px] border-dashed border-2 border-gray-300 rounded-xl mt-2 mb-6 flex justify-center items-center">
          조회된 데이터가 없어요.
        </div>
      )}

      <div className="mb-4">
        <StatisticalMap markers={filteredData} />
      </div>

      {fetchedData.length > 0 && (
        <button
          className="w-[90dvw] mb-4 px-5 py-2 text-sm shadow-sm font-medium  text-white rounded-lg"
          style={{ backgroundColor: "#1d2268" }}
          onClick={handleDownload}
        >
          데이터 다운로드
          <Download />
        </button>
      )}
    </div>
  );
};

export default Manager;
