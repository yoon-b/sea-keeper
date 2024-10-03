
import { FC } from "react";
import { LatLngExpression } from "leaflet";
import { Marker, Polyline, Popup, Tooltip } from 'react-leaflet';

interface ChildComponentProps {
  zoomLevel: number;
  routeSections: RouteSection[] | null;
  routeSummary: RouteSummary | null;
}

const RoutePolyline : FC<ChildComponentProps> = ({ zoomLevel, routeSections, routeSummary }) => {
  if (!routeSummary || !routeSections) return null;

  const origin : LatLngExpression = [routeSummary.origin.y, routeSummary.origin.x];
  const destination : LatLngExpression = [routeSummary.destination.y, routeSummary.destination.x];
  const waypoints : LatLngExpression[] = routeSummary.waypoints.map(wp => [wp.y, wp.x]);

  // traffic_state에 따른 색상 및 두께 정의
  const getRoadStyle = (trafficState: number) => {
    switch (trafficState) {
      case 1: // 교통 정체
        return { color: "red", weight: 5 };
      case 2: // 교통 지체
        return { color: "orange", weight: 3, dashArray: "5,5" };
      case 3: // 교통 서행
        return { color: "green", weight: 2, dashArray: "2,5" };
      case 4: // 교통 원활
        return { color: "skyblue", weight: 2, dashArray: "2,10" };
      case 6: // 교통사고(통행 불가)
        return { color: "black", weight: 7 };
      default: // 교통 상태 정보 없음
        return { color: "gray", weight: 2, opacity: "0.5" };
    }
  };
  
  return (
    <>
    <Marker position={origin}>
        <Popup>출발지</Popup>
      </Marker>
      <Marker position={destination}>
        <Popup>목적지</Popup>
      </Marker>
      {waypoints.map((point, idx) => (
        <Marker position={point} key={idx}>
          <Popup>경유지 {idx + 1}</Popup>
        </Marker>
      ))}
      
      {/* 각 구간별 도로 표시 */}
      {routeSections.map((section, sectionIdx) =>
        section.roads.map((road, roadIdx) => {
          const polylinePoints: LatLngExpression[] = [];
          for (let i = 0; i < road.vertexes.length; i += 2) {
            polylinePoints.push([road.vertexes[i + 1], road.vertexes[i]] as LatLngExpression);
          }

          // traffic_state에 따라 폴리라인 스타일 결정
          const roadStyle = getRoadStyle(road.traffic_state);

          return (
            <Polyline
              key={`${sectionIdx}-${roadIdx}`}
              positions={polylinePoints}
              color={roadStyle.color}
              weight={roadStyle.weight}
              dashArray={roadStyle.dashArray}
            />
          );
        })
      )}

      {zoomLevel >= 15 &&
        routeSections.map((section, sectionIdx) =>
          section.guides.map((guide, guideIdx) => (
            <Marker
              position={[guide.y, guide.x]}
              opacity={0}
              key={`${sectionIdx}-guide-${guideIdx}`}
            >
              <Tooltip permanent>{guide.guidance}</Tooltip>
            </Marker>
          ))
        )}
    </>
  )
}

export default RoutePolyline;