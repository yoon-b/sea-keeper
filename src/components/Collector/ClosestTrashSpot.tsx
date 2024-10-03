import { useQuery } from "@tanstack/react-query";
import { LatLngTuple } from 'leaflet';
import { FC } from "react";
import { fetchClosestTrash } from "../../api/collectorApi";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type LocationProps = {
  currentLocation: LatLngTuple | undefined;
};

interface ClosestTrashData {
    latitude: number;
    longitude: number;
    coastName: string;
    distance: number;
}

const ClosestTrashSpot : FC<LocationProps> = ({ currentLocation }) => {
    const { data : closestTrash } = useQuery<ClosestTrashData>(
      {
        queryKey: ["closestTrash", currentLocation],
        queryFn: () => {
          if (currentLocation) {
            return fetchClosestTrash(currentLocation[0], currentLocation[1]);
          }
          return Promise.reject(new Error("현재 위치가 없습니다."));
        },
        enabled: !!currentLocation, // currentLocation이 있을 때만 실행
        staleTime: 5000, // 5초 동안 데이터 유효성 유지
        refetchOnWindowFocus: false, // 포커스 전환 시 재조회 방지
        refetchOnReconnect: false, // 네트워크 연결 시 재조회 방지
      }
    );

  return (
    <div className="flex flex-col items-start font-bold">
      {closestTrash ? (
        <>
        <div className="text-sm">현재 가장 가까운 해안쓰레기는</div>
          <div>
            <span className="text-blue-500 font-bold">{closestTrash.coastName}</span>
            &nbsp;
            <span className="text-xs font-bold">
              {closestTrash.distance ? (closestTrash.distance / 1000).toFixed(2) : null} km
            </span>
        </div>
      </>
      ):(
      <div className="flex flex-col items-start">
        <div className="text-xl"><Skeleton width={150} /></div>
        <div>
            <Skeleton width={100} />
        </div>
      </div>
      )}
    </div>
  )
}

export default ClosestTrashSpot;