import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
import {
  fetchInspectionReportById,
  deleteInspectionReport,
} from "../../api/reportApi";
import {
  describeWasteType,
  convertSerialNumberToDate,
} from "../../utils/reportUtils";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Modal from "react-modal";
import DeleteModal from "../../components/Common/DeleteModal";

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
  const navigate = useNavigate();

  const [reportData, setReportData] = useState<InspectionReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  Modal.setAppElement("#root");

  // const { data, error, isLoading } = useQuery<InspectionReport, Error>({
  //   queryKey: ["inspectionReport", reportId],
  //   queryFn: () => fetchInspectionReportById(Number(reportId)),
  // });

  useEffect(() => {
    if (reportId) {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const data = await fetchInspectionReportById(Number(reportId));
          // console.log("Fetched data: ", data);
          setReportData(data);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [reportId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!reportData) {
    return <p>No data available.</p>;
  }

  const handleDelete = async () => {
    try {
      await deleteInspectionReport(Number(reportId));
      navigate(-1);
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  const handleDeleteClick = () => {
    setIsOpen(true);
  };

  const handleConfirm = () => {
    handleDelete();
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="md:hidden">
        <img
          className="w-full"
          alt={`${reportData.coastName} 사진`}
          src={`${reportData.monitoringImageUrl}.webp`}
        />
      </div>

      <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
        <div className="border-b border-gray-200 pb-6">
          <p className="text-sm leading-none text-gray-600 dark:text-gray-300 ">
            {reportData.serialNumber}
          </p>
          <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white mt-2">
            {reportData.coastName}
          </h1>
        </div>

        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-base leading-4 text-gray-800 dark:text-gray-300">
            조사 일시
          </p>
          <div className="flex items-center justify-center">
            <p className="text-sm leading-none text-gray-600 dark:text-gray-300">
              {convertSerialNumberToDate(reportData.serialNumber)}
            </p>
          </div>
        </div>

        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-base leading-4 text-gray-800 dark:text-gray-300">
            해안 길이
          </p>
          <div className="flex items-center justify-center">
            <p className="text-sm leading-none text-gray-600 dark:text-gray-300 mr-3">
              {reportData.coastLength}m
            </p>
          </div>
        </div>

        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-base leading-4 text-gray-800 dark:text-gray-300">
            예측 쓰레기양
          </p>
          <div className="flex items-center justify-center">
            <p className="text-sm leading-none text-gray-600 dark:text-gray-300 mr-3">
              {reportData.predictedTrashVolume * 50}L
            </p>
          </div>
        </div>

        <div>
          <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">
            위도: {reportData.latitude}
          </p>
          <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">
            경도: {reportData.longitude}
          </p>
          <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">
            주요 쓰레기 종류: {describeWasteType(reportData.mainTrashType)}
          </p>
        </div>

        <div onClick={handleDeleteClick}>
          <DeleteOutlinedIcon />
        </div>

        <DeleteModal
          isOpen={isOpen}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default ReportDetail;
