import { FC } from "react";
import { FaTrash, FaCoins } from "react-icons/fa";
import SummaryBox from "./SummaryBox";

interface ChildComponentProps {
  trashSum: number;
  routeSummary: RouteSummary;
  setSelectedMarkers: React.Dispatch<React.SetStateAction<Set<TrashData>>>;
  setRouteSections: React.Dispatch<React.SetStateAction<RouteSection[] | null>>;
  setRouteSummary: React.Dispatch<React.SetStateAction<RouteSummary | null>>;
}

const RouteSummary : FC<ChildComponentProps> = ({
  trashSum,
  routeSummary,
  setSelectedMarkers,
  setRouteSections,
  setRouteSummary
}) => {

  const handleRetryClick = () => {
    setSelectedMarkers(new Set())
    setRouteSections(null)
    setRouteSummary(null)
    return
  }

  const formatDuration = (seconds: number) => {
    const totalMinutes = Math.floor(seconds / 60); // 총 분으로 변환
    const hours = Math.floor(totalMinutes / 60); // 시간 추출
    const remainingMinutes = totalMinutes % 60; // 나머지 분 추출
  
    // 1시간 이상이면 '시간-분'으로 표시, 아니면 '분'만 표시
    return hours > 0 
      ? `${hours}시간 ${remainingMinutes}분`
      : `${remainingMinutes}분`;
  };
  
  const formatDistance = (meters: number) => {
    return (meters / 1000).toFixed(2); // m를 km로 변환하고 소수점 두 자리까지 표시
  };

  return (
    <div className="flex flex-col items-start font-bold mt-5 space-y-2">
      <div className="flex items-center text-sm">
            경로 조회 결과
      </div>
      <div className="flex flex-col justify-center bg-gray-100 min-w-[100%] min-h-20 p-2">
          <div className="flex flex-col items-start text-sm space-y-2">
            <div className="text-gray-500 text-xs">현위치에서 최종 <span className="text-gray-800">{routeSummary.destination.name}</span>까지 <span>(경유 {routeSummary.waypoints.length}곳)</span></div>
            <div className="flex flex-col items-start">
              <div className="text-sm">총거리 <span className="text-blue-600">{formatDistance(routeSummary.distance)} km</span></div>
              <div className="text-sm">예상 소요시간 <span className="text-blue-600">{formatDuration(routeSummary.duration)}</span></div>
            </div>
            <div className="flex gap-2 w-[100%] justify-between">
              <SummaryBox
                icon={<FaCoins size={24} />}
                titleText="통행료"
                contentText={routeSummary.fare.toll.toString()+'원'}
              />
              <SummaryBox
                icon={<FaTrash size={18} />}
                titleText="예상 쓰레기량"
                contentText={trashSum.toString()+'L'}
              />
            </div>
          </div>
        </div>
        <div className="w-[100%]">
          <button className="bg-gray-700 w-[100%] hover:bg-gray-800 text-white font-bold py-2 px-4 rounded" onClick={handleRetryClick}>돌아가기</button>
        </div>
    </div>
  )
}

export default RouteSummary;