import {AxiosError} from "axios";
import { useEffect, useState } from "react";
import { LatLngTuple } from 'leaflet';
import { FC } from "react";
import { fetchClosestTrash } from "../../api/collectorApi";

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
                console.log("현재 위치가 존재하지 않습니다")
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
        },[])

  return (
    <div className="flex flex-col items-start font-bold">
      <div className="text-xl">현재 가장 가까운 해안쓰레기는</div>
      <div>
        <span className="text-blue-500 text-2xl font-bold">{closestTrash?.coastName}</span>
        &nbsp;
        <span className="text-sm font-bold">
          {closestTrash?.distance ? (closestTrash.distance / 1000).toFixed(2) : null}km
        </span>
      </div>
    </div>
  )
}

export default ClosestTrashSpot;