import { useState } from "react";
import { useCurrentLocation } from "../../utils/useCurrentLocation";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { Icon, LatLngTuple } from "leaflet";
import NoPickupTrashSpots from "../../components/Collector/NoPickupTrashSpots";
import UserLocationCircle from "../../components/Collector/UseLocationCircle";
import ClosestTrashSpot from "../../components/Collector/ClosestTrashSpot";
import SelectedTrashSpots from "../../components/Collector/SelectedTrashSpots";
import RoutePolyline from "../../components/Collector/RoutePolyline";
import { MdMyLocation } from "react-icons/md";
import { GrCompliance } from "react-icons/gr";
import RouteSummary from "../../components/Collector/RouteSummary";
import { showToast } from "../../utils/toastUtils";
import "./Collector.css";
import animatedMarker from "../../assets/animated-marker.svg";

const userIcon = new Icon({
  iconUrl: animatedMarker,
  iconSize: [50, 50], // SVG 아이콘 크기
  iconAnchor: [25, 25], // 아이콘의 중심점
  popupAnchor: [0, -15], // 팝업의 위치 조정
});

const Collector = () => {
  const currentLocation = useCurrentLocation();
  const [zoomLevel, setZoomLevel] = useState<number>(13);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedMarkers, setSelectedMarkers] = useState<Set<TrashData>>(
    new Set()
  );
  const [trashSum, setTrashSum] = useState<number>(0);
  const [routeSections, setRouteSections] = useState<RouteSection[] | null>(
    null
  );
  const [routeSummary, setRouteSummary] = useState<RouteSummary | null>(null);
  const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);

  const HandleZoomChange = () => {
    const map = useMapEvents({
      zoomend: () => {
        setZoomLevel(map.getZoom());
      },
    });
    return null;
  };

  const toggleBottomSheet = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleDeleteButtonClick = () => {
    if (isDeleteMode) {
      setIsDeleteMode(false);
    } else {
      if (routeSections) {
        showToast("돌아가기 버튼을 누른 후, 다시 시도해주세요");
      } else {
        setIsDeleteMode(true);
        showToast("수거하려는 쓰레기를 클릭해주세요");
      }
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <MapContainer
        center={currentLocation || [35.1689, 129.136]}
        zoom={zoomLevel}
        scrollWheelZoom={true}
        className="w-full h-full z-10"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://carto.com/">Carto</a>'
        />
        {currentLocation && (
          <Marker position={currentLocation} icon={userIcon}>
            <Popup>현재 위치</Popup>
          </Marker>
        )}
        <HandleZoomChange />
        <UserLocationCircle currentLocation={currentLocation} />
        {!routeSummary && !routeSections && (
          <NoPickupTrashSpots
            selectedMarkers={selectedMarkers}
            setSelectedMarkers={setSelectedMarkers}
            setTrashSum={setTrashSum}
            zoomLevel={zoomLevel}
            isDeleteMode={isDeleteMode}
          />
        )}
        <RoutePolyline
          zoomLevel={zoomLevel}
          routeSections={routeSections}
          routeSummary={routeSummary}
        />
        <MyLocationButton
          currentLocation={currentLocation || [35.1689, 129.136]}
        />
        <button
          className={`fixed top-80 right-5 p-2 rounded-full shadow-md z-[500] hover:bg-gray-200 
            ${isDeleteMode ? "bg-gray-300" : "bg-white"}`}
          onClick={handleDeleteButtonClick}
        >
          <GrCompliance className="text-blue-500" size={24} />
        </button>
      </MapContainer>

      {/* BottomSheet */}
      <div
        className={`fixed bottom-0 bg-white rounded-t-lg shadow-lg transition-transform duration-300 z-10 w-full ${
          isCollapsed ? "transform translate-y-[20%]" : "h-[40vh]"
        }`}
      >
        {/* BottomSheet 헤더 */}
        <div
          className="flex items-center justify-center bg-blue-300 text-white h-[5vh] cursor-pointer rounded-t-lg z-10"
          onClick={toggleBottomSheet}
        >
          {isCollapsed ? "▲" : "▼"}
        </div>

        {/* BottomSheet 내용 */}
        {!isCollapsed && (
          <div className="p-4 h-[90%] overflow-y-scroll text-black">
            <ClosestTrashSpot currentLocation={currentLocation} />
            {routeSummary ? (
              <RouteSummary
                trashSum={trashSum}
                setSelectedMarkers={setSelectedMarkers}
                routeSummary={routeSummary}
                setRouteSections={setRouteSections}
                setRouteSummary={setRouteSummary}
              />
            ) : (
              <SelectedTrashSpots
                selectedMarkers={selectedMarkers}
                setSelectedMarkers={setSelectedMarkers}
                setRouteSections={setRouteSections}
                setRouteSummary={setRouteSummary}
                currentLocation={currentLocation}
                trashSum={trashSum}
              />
            )}
            <div className="flex flex-start mt-2 text-xs text-gray-400">
              ※ 쓰레기를 수거 완료하셨다면 우측 중앙의 아이콘을 클릭해 완료
              상태를 알려주세요.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const MyLocationButton = ({
  currentLocation,
}: {
  currentLocation: LatLngTuple;
}) => {
  const map = useMap();

  const handleMyLocationClick = () => {
    if (currentLocation) {
      map.setView(currentLocation, map.getZoom()); // 현재 위치로 중심 이동
    }
  };

  return (
    <button
      className="fixed top-80 left-5 bg-white p-2 rounded-full shadow-md z-[500] hover:bg-gray-200"
      onClick={handleMyLocationClick}
    >
      <MdMyLocation className="text-blue-500" size={24} />
    </button>
  );
};

export default Collector;
