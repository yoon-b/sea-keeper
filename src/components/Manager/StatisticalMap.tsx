import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import TrashTypeIcon from "../Common/TrashTypeIcon";

interface StatisticalMapProps {
  markers: (Inspection | Cleanup | CoastStats)[];
}

const isInspection = (marker: any): marker is Inspection => {
  return (marker as Inspection).predictedTrashVolume !== undefined;
};

const isCleanup = (marker: any): marker is Cleanup => {
  return (marker as Cleanup).actualTrashVolume !== undefined;
};

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
      scrollWheelZoom={true}
      style={{ width: "90vw", height: "55vh" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://carto.com/">Carto</a>'
      />
      <MarkerClusterGroup disableClusteringAtZoom={12}>
        {markers.map((marker) => {
          const isInspectionMarker = isInspection(marker);
          const isCleanupMarker = isCleanup(marker);

          let key: string;
          let radius: number;
          let fillColor: string;
          let trashVolume: number;

          if (isInspectionMarker) {
            key = String(marker.id);
            radius = (marker.predictedTrashVolume / 50) * 0.5;
            fillColor = getColorByTrashType(marker.mainTrashType);
            trashVolume = marker.predictedTrashVolume;
          } else if (isCleanupMarker) {
            key = String(marker.id);
            radius = marker.actualTrashVolume * 0.5;
            fillColor = getColorByTrashType(marker.mainTrashType);
            trashVolume = marker.actualTrashVolume * 50;
          } else {
            key = marker.coastName;
            radius = marker.avgTrashVolume * 0.5;
            fillColor = "#267EC3";
            trashVolume = marker.avgTrashVolume;
          }

          return (
            <CircleMarker
              key={key}
              center={[marker.latitude, marker.longitude]}
              radius={radius}
              fillColor={fillColor}
              color={undefined}
              fillOpacity={0.8}
            >
              <Popup>
                <p className="font-bold">{marker.coastName}</p>
                {isInspectionMarker || isCleanupMarker ? (
                  <div className="flex space-x-2 justify-center items-center">
                    <TrashTypeIcon value={marker.mainTrashType} />
                    <span>{trashVolume}L</span>
                  </div>
                ) : (
                  <div>{trashVolume}L</div>
                )}
              </Popup>
            </CircleMarker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default StatisticalMap;
