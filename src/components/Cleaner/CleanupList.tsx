import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../recoil/userAtom";
import {
  fetchCleanupReport,
  fetchCleanupReportForAdmin,
} from "../../api/reportApi";
import { formatDate } from "../../utils/timeUtils";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface TableHeaderProps {
  title: string;
}

interface TableRowData {
  id: number;
  serialNumber: string;
  coastName: string;
  createdAt: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({ title }) => (
  <th className="p-4 border-b border-slate-200 bg-slate-50">
    <p className="text-sm font-normal leading-none text-slate-500">{title}</p>
  </th>
);

const CleanupList = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userAtom);

  const [reports, setReports] = useState<TableRowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [maxPage, setMaxPage] = useState(1);
  const maxVisiblePages = 5;

  const loadReports = async (page: number) => {
    try {
      setLoading(true);
      let data;

      if (user && user.role === "ADMIN") {
        data = await fetchCleanupReportForAdmin(page);
      } else {
        data = await fetchCleanupReport(page);
      }

      setReports(data.result.cleanupList);
      setMaxPage(data.result.maxPage);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("알 수 없는 오류 발생");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports(currentPage);
  }, [currentPage]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const headers = ["글번호", "해안명", "작성일"];

  const handleRowClick = (id: number) => {
    navigate(`/cleanup-detail/${id}`);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < maxPage - 1) setCurrentPage(currentPage + 1);
  };

  const getVisiblePages = () => {
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, maxPage);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <div className="w-[90dvw] flex flex-col text-black">
      {/* <h2 className="font-4xl font-bold pt-4 m-2">해양 쓰레기 청소 목록</h2> */}

      {reports.length > 0 ? (
        <div className="relative flex flex-col w-full h-[68dvh] overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr className="text-center">
                {headers.map((header, index) => (
                  <TableHeader key={index} title={header} />
                ))}
              </tr>
            </thead>
            <tbody>
              {reports.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50 border-b border-slate-200 cursor-pointer"
                  onClick={() => handleRowClick(row.id)}
                >
                  <td className="p-4 py-5 text-center">
                    <p className="block text-xs text-slate-500">{row.id}</p>
                  </td>
                  <td className="p-4 py-5 text-center">
                    <p className="text-sm font-semibold text-slate-800">
                      {row.coastName}
                    </p>
                  </td>
                  <td className="p-4 py-5 text-center">
                    <p className="text-sm text-slate-500">
                      {formatDate(row.createdAt)}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center px-4 py-3 bg-white">
            <div className="space-x-1">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
                className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded ${
                  currentPage === 0
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease"
                }`}
              >
                <ChevronLeftIcon />
              </button>

              {getVisiblePages().map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page - 1)}
                  className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal ${
                    currentPage === page - 1
                      ? "text-white bg-slate-800 border border-slate-800"
                      : "text-slate-500 bg-white border border-slate-200"
                  } rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={handleNextPage}
                disabled={currentPage === maxPage - 1}
                className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded ${
                  currentPage === maxPage - 1
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease"
                }`}
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-slate-500 py-10">
          아직 작성된 기록이 없습니다.
        </p>
      )}
    </div>
  );
};

export default CleanupList;
