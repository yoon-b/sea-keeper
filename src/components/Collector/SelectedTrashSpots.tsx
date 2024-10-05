import { FC } from "react";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../recoil/userAtom";
import { LatLngTuple } from "leaflet";
import { fetchRoute, fetchRouteWaypoint } from "../../api/kakaoMobilityApi";
import { assignTaskToUser } from "../../api/AssignApi";
import WaypointBtn from "./WaypointBtn";
import { FaUndoAlt } from "react-icons/fa";
import { showToast } from "../../utils/toastUtils";
import AssignModal from "./AssignModal";

interface SpotData {
  name: string;
  x: number;
  y: number;
}

interface ChildComponentProps {
  selectedMarkers: Set<TrashData>;
  setSelectedMarkers: React.Dispatch<React.SetStateAction<Set<TrashData>>>;
  setRouteSections: React.Dispatch<React.SetStateAction<RouteSection[] | null>>;
  setRouteSummary: React.Dispatch<React.SetStateAction<RouteSummary | null>>;
  currentLocation: LatLngTuple | undefined;
  trashSum: number;
}

const SelectedTrashSpots: FC<ChildComponentProps> = ({
  selectedMarkers,
  setSelectedMarkers,
  setRouteSections,
  setRouteSummary,
  currentLocation,
  trashSum,
}) => {
  const user = useRecoilValue(userAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskIds, setTaskIds] = useState<number[]>([]);

  const handleResetMarkers = () => {
    setSelectedMarkers(new Set());
  };

  const convertToSpotData = (data: TrashData): SpotData => ({
    name: data.coastName,
    x: data.longitude,
    y: data.latitude,
  });

  const convertCurrentLocationToSpotData = (): SpotData | null => {
    if (!currentLocation) return null;
    const [latitude, longitude] = currentLocation;
    return {
      name: "출발지",
      x: longitude,
      y: latitude,
    };
  };

  const handleRouteSearchClick = async () => {
    if (!currentLocation) {
      showToast("출발지를 찾을 수 없습니다");
      return;
    }

    if (selectedMarkers.size === 0) {
      showToast("선택된 지점이 없습니다");
      return;
    }

    const origin = convertCurrentLocationToSpotData();
    if (!origin) return;
    const markersArray = Array.from(selectedMarkers);

    if (selectedMarkers.size === 1) {
      const destination = convertToSpotData(
        markersArray[markersArray.length - 1]
      );

      try {
        const response = await fetchRoute(origin, destination);
        console.log("일반 경로 검색 결과:", response);
        setRouteSections(response.routes[0].sections);
        setRouteSummary(response.routes[0].summary);
        showToast("경로 조회 성공");
      } catch (error) {
        showToast("경로 조회 실패. 잠시 후 다시 시도해주세요");
        console.error("일반 경로찾기 에러:", error);
      }
    } else {
      const destination = convertToSpotData(
        markersArray[markersArray.length - 1]
      );
      const waypoints: SpotData[] = markersArray
        .slice(0, markersArray.length - 1)
        .map(convertToSpotData);

      try {
        const response = await fetchRouteWaypoint(
          origin,
          destination,
          waypoints
        );
        console.log("다중 경유지 경로 검색 결과:", response);
        setRouteSections(response.routes[0].sections);
        setRouteSummary(response.routes[0].summary);
        showToast("경로 조회 성공");
      } catch (error) {
        showToast("경로 조회 실패. 잠시 후 다시 시도해주세요");
        console.error("다중 경유지 경로찾기 에러:", error);
      }
    }
  };

  const handleTaskAssignment = () => {
    const markersArray = Array.from(selectedMarkers);
    const markerIds = markersArray.map((marker) => marker.id);

    setTaskIds(markerIds);
    setIsModalOpen(true);
  };

  const handleAssignUser = (userId: string) => {
    try {
      assignTaskToUser(Number(userId), taskIds);
    } catch (err) {
      console.log(err);
    }

    console.log("선택된 담당자 ID:", userId);
    console.log("선택된 업무: ", taskIds);
  };

  useEffect(() => {}, [selectedMarkers]);

  return (
    <div className="flex flex-col items-start font-bold mt-5 space-y-2">
      <div className="text-sm flex items-center">
        지도에서 수거 지점을 선택해주세요
        <FaUndoAlt
          className="ml-2 text-blue-500 cursor-pointer hover:text-blue-700"
          onClick={handleResetMarkers}
        />
      </div>
      <div className="flex flex-col items-start min-w-[100%] min-h-10">
        {selectedMarkers.size === 0 ? (
          <div className="flex flex-col items-start text-gray-400 text-xs min-h-20">
            <div>선택된 지점이 없습니다.</div>
            <div>지도를 통해 수거 지점을 선택하세요.</div>
          </div>
        ) : (
          <div className="flex flex-col items-start min-h-20">
            <div className="flex flex-row flex-wrap w-[100%] justify-start">
              {[...selectedMarkers].map((marker, index) => (
                <WaypointBtn
                  key={marker.id}
                  pointName={marker.coastName}
                  isLast={index === selectedMarkers.size - 1}
                />
              ))}
            </div>
            <div className="text-xs">
              수거 지점: {selectedMarkers.size}곳
              <span className="text-blue-600">
                (경유지 {selectedMarkers.size - 1})
              </span>
            </div>
            <div className="text-xs">총 예상 쓰레기양: {trashSum}L</div>
          </div>
        )}
      </div>
      <div className="w-[100%]">
        <button
          className="bg-blue-500 w-[100%] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleRouteSearchClick}
        >
          경로 조회하기
        </button>
      </div>

      {user?.role === "ADMIN" && (
        <div className="w-[100%]">
          <button
            className="bg-blue-500 w-[100%] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleTaskAssignment}
          >
            담당자 배정하기
          </button>

          <AssignModal
            isOpen={isModalOpen}
            taskList={selectedMarkers}
            onRequestClose={() => setIsModalOpen(false)}
            onAssign={handleAssignUser}
          />
        </div>
      )}
    </div>
  );
};

export default SelectedTrashSpots;
