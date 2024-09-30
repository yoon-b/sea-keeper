import { LatLngTuple } from "leaflet";
import { useEffect, useState } from "react";

// 사용자 현재 위치 가져오기용 커스텀 훅
export const useCurrentLocation = (): LatLngTuple | undefined => {
  const [location, setLocation] = useState<LatLngTuple | undefined>();

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation([latitude, longitude]);
      },
      (error) => {
        console.error("useCurrentLocation 에서 에러 발생: ", error);
        setLocation([35.1795, 129.0756]); // 기본값으로 부산 좌표 사용
      },
      {
        enableHighAccuracy: true, // 정확도 높은 위치 정보 사용
        timeout: 5000,
        maximumAge: 0,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return location;
};