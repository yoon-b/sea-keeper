import { Icon } from 'leaflet';
import { FC } from "react";
import {AxiosError} from "axios";
import { useEffect, useState } from "react";
import { Marker, Tooltip } from "react-leaflet";
import trashIconImage from '../../assets/image/garbage-bin-deactive.png';
import checkIconImage from '../../assets/image/garbage-bin-active.png';
import garbageTruckImage from '../../assets/image/garbage-truck.png';
import { fetchNoPickupTrashs, updatePickupStatus } from '../../api/collectorApi';
import { showToast } from '../../utils/toastUtils';

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

interface ChildComponentProps {
    selectedMarkers: Set<TrashData>;
    setSelectedMarkers: React.Dispatch<React.SetStateAction<Set<TrashData>>>;
    setTrashSum: React.Dispatch<React.SetStateAction<number>>;
    zoomLevel: number;
    isDeleteMode: boolean;
  }

const NoPickupTrashSpots : FC<ChildComponentProps> = ({
    selectedMarkers,
    setSelectedMarkers,
    setTrashSum,
    zoomLevel,
    isDeleteMode
  }) => {
    const [noPickupTrashs, setNoPickupTrashs] = useState<TrashData[]>([]);

    const handleMarkerClick = async(trash: TrashData) => {
      if(isDeleteMode == true) {
        const confirmed = window.confirm(
          `${trash.coastName} ${trash.actualTrashVolume*50}L를 수거 완료로 변경하시겠습니까?`
        );
        
        if (confirmed) {
          try {
            await updatePickupStatus(trash.id);
            window.location.reload();
            showToast("수거 완료 되었습니다");
          } catch(err) {
            console.error("수거 요청 실패",err);
            showToast("수거 요청 실패. 잠시 후 다시 시도해주세요");
          }
        } else {
          console.log("취소하고 돌아가기");
        }
      } else {
        const newSelectedMarkers = new Set(selectedMarkers);
        if (newSelectedMarkers.has(trash)) {
            // 이미 선택된 마커인 경우
            newSelectedMarkers.delete(trash); // 선택해제하면
            setTrashSum(prevTotal => prevTotal - trash.actualTrashVolume*50); // 쓰레기량에서 제거 
        } else {
            // 선택되지 않은 마커인 경우
            newSelectedMarkers.add(trash); // 선택하면
            setTrashSum(prevTotal => prevTotal + trash.actualTrashVolume*50); // 쓰레기량에 합산
        }
        setSelectedMarkers(newSelectedMarkers); // 상태 업데이트}
      };
    }

    useEffect(()=>{
      const fetchData = async () => {
        try {
          const data = await fetchNoPickupTrashs();
          setNoPickupTrashs(data);
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
      <>
        {noPickupTrashs?.map((trash) => {
        const isSelected = selectedMarkers.has(trash);
        const icon = new Icon({
          iconUrl: isDeleteMode? garbageTruckImage : isSelected ? checkIconImage : trashIconImage, // 선택된 상태에 따라 아이콘 설정
          iconSize: [35, 45], // 크기
          iconAnchor: [12, 41], // 앵커 위치
          popupAnchor: [5, -40], // 팝업 앵커 위치
        });

        return (
          <Marker
            key={trash.id}
            position={[trash.latitude, trash.longitude]}
            icon={icon}
            eventHandlers={{
              click: () => handleMarkerClick(trash)
            }}
          >
            {zoomLevel > 15 && (
            <Tooltip direction="bottom" offset={[10, 5]} permanent>
              <span>
                {trash.coastName} {trash.actualTrashVolume*50} L
              </span>
            </Tooltip>
            )}
          </Marker>
        );
      })}
      </>
    )
  }
  
  export default NoPickupTrashSpots;