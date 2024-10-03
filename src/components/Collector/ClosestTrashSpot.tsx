import {AxiosError} from "axios";
import { useEffect, useState } from "react";
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
    const [closestTrash, setClosestTrash] = useState<ClosestTrashData>();

    useEffect(()=>{
        const fetchData = async () => {
          try {
            if (currentLocation) {
            const data = await fetchClosestTrash( currentLocation[0] , currentLocation[1] );
            setClosestTrash(data);}
            else {
                console.log("현재 위치 불러오는 중...")
            }
          } catch (error) {
            const axiosError = error as AxiosError;
      
              if (axiosError.response) {
                console.log("서버에서 응답 오류:", axiosError.response.data);
            } else if (axiosError.request) {
                console.log("요청이 이루어졌으나 응답이 없습니다:", axiosError.request);
            } else {
                console.log("오류 발생:", axiosError.message);
            }
          }
        };
  
        fetchData();
        },[currentLocation])

  return (
    <div className="flex flex-col items-start font-bold">
      {currentLocation && closestTrash? (
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