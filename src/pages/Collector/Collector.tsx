import { useEffect, useState } from "react";
import { useCurrentLocation } from "../../utils/useCurrentLocation";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { Icon } from "leaflet";
import NoPickupTrashSpots from "../../components/Collector/NoPickupTrashSpots";
import UserLocationCircle from "../../components/Collector/UseLocationCircle";
import ClosestTrashSpot from "../../components/Collector/ClosestTrashSpot";
import SelectedTrashSpots from "../../components/Collector/SelectedTrashSpots";

const userIcon = new Icon({
  iconUrl: '/animated-marker.svg',
  iconSize: [50, 50], // SVG 아이콘 크기
  iconAnchor: [25, 25], // 아이콘의 중심점
  popupAnchor: [0, -15], // 팝업의 위치 조정
});

interface TrashData {
  id: number;
  serialNumber: string;
  latitude: number;
  longitude: number;
  coastName: string;
  coastLength: number;
  actualTrashVolume: number;
  mainTrashType: number;
  beforeViewImageUrl: string | null;
  afterViewImageUrl: string | null;
  completeViewImageUrl: string | null;
}

const Collector = () => {
  const currentLocation = useCurrentLocation();
  const [zoomLevel, setZoomLevel] = useState<number>(10);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedMarkers, setSelectedMarkers] = useState<Set<TrashData>>(new Set());
  const [trashSum, setTrashSum] = useState<number>(0);

  useEffect(()=> {
    if (currentLocation) {
      console.log("api요청 로직을 작성할 곳", currentLocation)
    }
  },[currentLocation]);

  const HandleZoomChange = () => {
    const map = useMapEvents({
      zoomend: () => {
        setZoomLevel(map.getZoom());
      }
    });
    return null;
  };

  const toggleBottomSheet = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <MapContainer
        center={currentLocation || [35.3249, 129.2849]}
        zoom={zoomLevel}
        scrollWheelZoom={true}
        className="w-full h-full sm:w-[100vw] sm:h-[100vh] md:w-[80vw] md:h-[100vh] lg:w-[70vw] lg:h-[100vh] z-10"
      >
        <TileLayer
            url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://stadiamaps.com">Stadia Maps</a>'
          />
        {currentLocation && (
          <Marker position={currentLocation} icon={userIcon}>
            <Popup>현재 위치</Popup>
          </Marker>
        )}
        <HandleZoomChange />
        <UserLocationCircle currentLocation={currentLocation} />
        <NoPickupTrashSpots
          selectedMarkers={selectedMarkers}
          setSelectedMarkers={setSelectedMarkers}
          setTrashSum={setTrashSum}
          zoomLevel={zoomLevel}
        />
      </MapContainer>

       {/* BottomSheet */}
       <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-lg shadow-lg transition-transform duration-300 z-10 ${
          isCollapsed ? 'transform translate-y-[10%] h-[15vh]' : 'h-[40vh]'
        }`}
      >
        {/* BottomSheet 헤더 */}
        <div
          className="flex items-center justify-center bg-blue-300 text-white h-[5vh] cursor-pointer rounded-t-lg z-10"
          onClick={toggleBottomSheet}
        >
          {isCollapsed ? '▲' : '▼'}
        </div>

        {/* BottomSheet 내용 */}
        {isCollapsed ? (
          <div className="p-4 text-center text-black">
           <h3 className="text-l font-bold">슬라이드를 올려주세요</h3>
          </div>
        ) : (
          <div className="p-4 overflow-auto text-black">
            <ClosestTrashSpot currentLocation={currentLocation} />
            <SelectedTrashSpots selectedMarkers={selectedMarkers} trashSum={trashSum}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collector;
