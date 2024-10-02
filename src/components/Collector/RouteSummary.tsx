import { FC } from "react";

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

  return (
    <div className="flex flex-col items-start font-bold mt-5 space-y-4">
      <div className="flex items-center text-sm">
            경로 조회 결과
      </div>
      <div className="flex flex-col justify-center bg-blue-50 min-w-[100%] min-h-20 p-2">
          <div className="flex flex-col items-start text-sm">
            <div>현위치에서 {routeSummary.destination.name}까지 <span>(경유 {routeSummary.waypoints.length}곳)</span></div>
            <div className="text-xl">총거리: <span className="text-sm">{routeSummary.distance}m</span></div>
            <div className="text-xl">예상 소요시간: <span className="text-sm">{routeSummary.duration}분</span></div>
            <div className="text-xl">예상 쓰레기량: <span className="text-sm">{trashSum}L</span></div>
          </div>
        </div>
        <div className="w-[100%]">
          <button className="bg-gray-700 w-[100%] hover:bg-gray-800 text-white font-bold py-2 px-4 rounded" onClick={handleRetryClick}>돌아가기</button>
        </div>
    </div>
  )
}

export default RouteSummary;