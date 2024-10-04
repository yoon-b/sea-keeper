import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchCleanupReportById,
  deleteCleanupReport,
} from "../../api/reportApi";
import {
  describeWasteType,
  convertSerialNumberToDate,
} from "../../utils/reportUtils";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Modal from "react-modal";
import DeleteModal from "../../components/Common/DeleteModal";
import ImageCarousel from "../../components/Cleaner/ImageCarousel";
import InfoRow from "../../components/Common/InfoRow";
import TrashTypeIcon from "../../components/Common/TrashTypeIcon";

const CleanupDetail = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();

  const [reportData, setReportData] = useState<Cleanup | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  Modal.setAppElement("#root");

  useEffect(() => {
    if (reportId) {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const data = await fetchCleanupReportById(Number(reportId));
          const images = [
            data.beforeViewImageUrl,
            data.afterViewImageUrl,
            data.completeViewImageUrl,
          ];
          setReportData(data);
          setImages(images);
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
      await deleteCleanupReport(Number(reportId));
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
    <div className="overflow-hidden">
      <div className="w-[100vw] ">
        <ImageCarousel images={images} />
      </div>

      <div className="text-black p-4">
        <div className="border-b border-gray-300 pb-6">
          <p className="text-sm leading-none text-gray-500">
            {reportData.serialNumber}
          </p>
          <h1 className="text-xl font-semibold leading-7 text-gray-800 mt-2">
            {reportData.coastName}
          </h1>
        </div>

        <InfoRow
          label="조사 일시"
          value={convertSerialNumberToDate(reportData.serialNumber)}
        />
        <InfoRow label="조사자" value={reportData.author} />
        <InfoRow label="해안 길이" value={`${reportData.coastLength}m`} />
        <InfoRow
          label="실제 쓰레기양"
          value={`${reportData.actualTrashVolume * 50}L`}
        />
        <InfoRow label="위도" value={reportData.latitude.toFixed(4)} />
        <InfoRow label="경도" value={reportData.longitude.toFixed(4)} />
        <InfoRow
          label="주요 쓰레기"
          value={describeWasteType(reportData.mainTrashType).category}
          icon={<TrashTypeIcon value={reportData.mainTrashType} />}
        />

        <div className="flex justify-end my-4">
          <div
            onClick={handleDeleteClick}
            className="flex justify-center items-center border shadow-sm text-gray-500 rounded-xl w-24 text-sm p-1"
          >
            <p>삭제하기</p>
            <DeleteOutlinedIcon fontSize="small" />
          </div>
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

export default CleanupDetail;
