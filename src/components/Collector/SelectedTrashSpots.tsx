import { FC } from "react";

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
    trashSum: number;
  }

const SelectedTrashSpots : FC<ChildComponentProps> = ({ selectedMarkers, trashSum }) => {
    

  return (
    <div className="flex flex-col items-start font-bold mt-10">
        <p>예상 경로 선택</p>
        {[...selectedMarkers].map((marker) => (
        <div key={marker.id}>
            <span className="text-blue-500">{marker.coastName}</span>
            {/* <p>Location: {marker.latitude}, {marker.longitude}</p> */}
            &nbsp;
        </div>
        ))}
        <p>예상 경로에 따른 쓰레기 총량은
            &nbsp;
            <span className="text-blue-500">{trashSum}L</span>
        </p>
    </div>
  )
}

export default SelectedTrashSpots;