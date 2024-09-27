import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchInspectionReportById } from "../../api/reportApi";
import { describeWasteType } from "../../utils/reportUtils";
import { convertSerialNumberToDate } from "../../utils/reportUtils";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

interface InspectionReport {
  serialNumber: string;
  latitude: number;
  longitude: number;
  coastName: string;
  coastLength: number;
  predictedTrashVolume: number;
  mainTrashType: string;
  monitoringImageUrl: string;
}

const ReportDetail = () => {
  const { reportId } = useParams();

  if (!reportId) {
    return;
  }

  const reportExample: InspectionReport = {
    serialNumber: "20171130120959834",
    latitude: 35.3249,
    longitude: 129.2851,
    coastName: "길천리1",
    coastLength: 50,
    predictedTrashVolume: 300,
    mainTrashType: "1",
    monitoringImageUrl: "",
  };

  // const { data, error, isLoading } = useQuery<InspectionReport, Error>({
  //   queryKey: ["inspectionReport", reportId],
  //   queryFn: () => fetchInspectionReportById(Number(reportId)),
  // });

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error instanceof Error) {
  //   return <div>Error: {error.message}</div>;
  // }

  // if (!data) {
  //   return <p>No data available.</p>;
  // }

  return (
    <div>
      <h2>조사 상세 페이지</h2>
      <p>id: {reportId}</p>
      {/* <h2>조사 일련번호: {data.serialNumber}</h2>
      <p>해안명: {data.coastName}</p>
      <p>주요 쓰레기 종류: {data.mainTrashType}</p> */}

      <div className="md:hidden">
        <img
          className="w-full"
          alt="image of a girl posing"
          src="https://i.ibb.co/QMdWfzX/component-image-one.png"
        />
      </div>

      <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
        <div className="border-b border-gray-200 pb-6">
          <p className="text-sm leading-none text-gray-600 dark:text-gray-300 ">
            {reportExample.serialNumber}
          </p>
          <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white mt-2">
            {reportExample.coastName}
          </h1>
        </div>

        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-base leading-4 text-gray-800 dark:text-gray-300">
            조사 일시
          </p>
          <div className="flex items-center justify-center">
            <p className="text-sm leading-none text-gray-600 dark:text-gray-300">
              {convertSerialNumberToDate(reportExample.serialNumber)}
            </p>
          </div>
        </div>

        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-base leading-4 text-gray-800 dark:text-gray-300">
            해안 길이
          </p>
          <div className="flex items-center justify-center">
            <p className="text-sm leading-none text-gray-600 dark:text-gray-300 mr-3">
              {reportExample.coastLength}m
            </p>
          </div>
        </div>

        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-base leading-4 text-gray-800 dark:text-gray-300">
            예측 쓰레기양
          </p>
          <div className="flex items-center justify-center">
            <p className="text-sm leading-none text-gray-600 dark:text-gray-300 mr-3">
              {reportExample.predictedTrashVolume}L
            </p>
          </div>
        </div>

        <div>
          <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">
            위도: {reportExample.latitude}
          </p>
          <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">
            경도: {reportExample.longitude}
          </p>
          <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">
            주요 쓰레기 종류: {describeWasteType(reportExample.mainTrashType)}
          </p>
        </div>

        <DeleteOutlinedIcon />
      </div>
    </div>
  );
};

export default ReportDetail;
