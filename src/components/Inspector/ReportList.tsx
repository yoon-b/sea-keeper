import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchInspectionReport } from "../../api/reportApi";

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

const ReportList = () => {
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const data = await fetchInspectionReport(1);
        console.log("data: ", data);
        setReports(data);
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

    loadReports();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const headers = ["일련번호", "해안명", "작성일"];
  const rowData: TableRowData[] = [
    {
      id: 1,
      serialNumber: "20171130120959834",
      coastName: "길천리1",
      createdAt: "2017-11-30",
    },
    {
      id: 2,
      serialNumber: "20171130120959834",
      coastName: "길천리2",
      createdAt: "2017-11-29",
    },
    {
      id: 3,
      serialNumber: "20171130120959834",
      coastName: "길천리3",
      createdAt: "2017-11-25",
    },
    {
      id: 4,
      serialNumber: "20171130120959834",
      coastName: "길천리4",
      createdAt: "2017-11-20",
    },
  ];

  const handleRowClick = (id: number) => {
    navigate(`/report-detail/${id}`);
  };

  return (
    <div className="max-w-[720px] mx-auto">
      <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            해안 쓰레기 조사 목록
          </h3>
        </div>
      </div>
      {reports}

      <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <TableHeader key={index} title={header} />
              ))}
            </tr>
          </thead>
          <tbody>
            {rowData.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-slate-50 border-b border-slate-200 cursor-pointer"
                onClick={() => handleRowClick(row.id)}
              >
                <td className="p-4 py-5">
                  <p className="block font-semibold text-xs text-slate-800">
                    {row.serialNumber}
                  </p>
                </td>
                <td className="p-4 py-5">
                  <p className="text-sm text-slate-500">{row.coastName}</p>
                </td>
                <td className="p-4 py-5">
                  <p className="text-sm text-slate-500">{row.createdAt}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex space-x-1">
            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
              이전
            </button>
            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-slate-800 border border-slate-800 rounded hover:bg-slate-600 hover:border-slate-600 transition duration-200 ease">
              1
            </button>
            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
              2
            </button>
            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
              3
            </button>
            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportList;
