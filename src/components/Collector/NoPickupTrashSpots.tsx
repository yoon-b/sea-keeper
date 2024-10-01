import { Icon } from 'leaflet';
import { FC } from "react";
import {AxiosError} from "axios";
import { useEffect, useState, useRef } from "react";
import { Marker, Tooltip } from "react-leaflet";
import trashIconImage from '../../assets/image/trash-spot.png';
import checkIconImage from '../../assets/image/check-spot.png';
import { fetchNoPickupTrashs } from '../../api/collectorApi';

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
  }

const NoPickupTrashSpots : FC<ChildComponentProps> = ({
    selectedMarkers,
    setSelectedMarkers,
    setTrashSum,
    zoomLevel
  }) => {
    const [noPickupTrashs, setNoPickupTrashs] = useState<TrashData[]>([]);
    const [isPressed, setIsPressed] = useState<boolean>(false);
    const pressTimer = useRef<number | null>(null);

    const handleMarkerClick = (trash: TrashData) => {
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
        setSelectedMarkers(newSelectedMarkers); // 상태 업데이트
      };

    const handleMouseDown = (trash : TrashData) => {
        pressTimer.current = window.setTimeout(() => {
          setIsPressed(true);
          const confirmed = window.confirm(
            `${trash.id}번 데이터를 수거 완료로 변경하시겠습니까?`
          );
          
          if (confirmed) {
            console.log(`수거완료로 변경하는 api 요청`);
            // 여기에 수거 완료 상태로 변경하는 로직을 추가
          } else {
            console.log("취소하고 돌아가기");
          }
        }, 1500); // 1.5초 이상 꾹 누르면 실행
      };
    
    const handleMouseUpOrLeave = () => {
        if (pressTimer.current) {
          clearTimeout(pressTimer.current); // 마우스를 떼면 타이머 취소
          pressTimer.current = null;
        }
      };

    useEffect(()=>{
      const fetchData = async () => {
        try {
          const data = await fetchNoPickupTrashs();
          // console.log("미수거 쓰레기 리스트",data)
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

      console.log("isPressed 변화",isPressed);
      fetchData();
      },[isPressed])
  
    return (
      <>
        {noPickupTrashs?.map((trash) => {
        const isSelected = selectedMarkers.has(trash); // 선택 여부 확인
        const icon = new Icon({
          iconUrl: isSelected ? checkIconImage : trashIconImage, // 선택된 상태에 따라 아이콘 설정
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
              click: () => handleMarkerClick(trash),
              mousedown: () => handleMouseDown(trash),
              mouseup: handleMouseUpOrLeave,
              mouseout: handleMouseUpOrLeave,
            }}
          >
            {zoomLevel > 17 && (
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