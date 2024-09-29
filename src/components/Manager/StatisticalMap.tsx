// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";

interface StatisticalMapProps {
  markers: Cleanup[];
}

// 쓰레기 타입에 따라 색상 설정
const getColorByTrashType = (trashType: number) => {
  switch (trashType) {
    case 1:
      return "#267EC3";
    case 2:
      return "#46B3A9";
    case 3:
      return "#FDBB3A";
    case 4:
      return "#FF6178";
    case 5:
      return "#8B75D7";
    default:
      return "#6D848E";
  }
};

const StatisticalMap = ({ markers }: StatisticalMapProps) => {
  const position: LatLngTuple =
    markers.length > 0
      ? [markers[0].latitude, markers[0].longitude]
      : [35.3249, 129.2849];

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ width: "80vw", height: "55vh" }}
    >
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://stadiamaps.com">Stadia Maps</a>'
      />
      {markers.map((marker) => (
        <CircleMarker
          key={marker.id}
          center={[marker.latitude, marker.longitude]}
          radius={marker.actualTrashVolume * 0.5}
          fillColor={getColorByTrashType(marker.mainTrashType)}
          color={undefined} // 테두리 색상
          fillOpacity={0.8}
        >
          <Popup>
            {marker.coastName}
            <br />[{marker.mainTrashType}] {marker.actualTrashVolume * 50}L
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default StatisticalMap;
