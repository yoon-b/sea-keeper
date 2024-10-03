import { Circle, FeatureGroup } from "react-leaflet";
import { LatLngTuple } from 'leaflet';
import { FC } from "react";

type LocationProps = {
  currentLocation: LatLngTuple | undefined;
};

const UserLocationCircle : FC<LocationProps> = ({ currentLocation }) => {

  const handleMouseOver = () => {
    // console.log("여기에 토스트를 띄우고시퍼")
  }

  return (
    <div>
      <FeatureGroup
      eventHandlers={{
        mouseover: handleMouseOver,
      }}
      >
        <Circle
          center={currentLocation || [35.3249, 129.2849]}
          radius={500} // 반경 설정(m 단위)
          color="gray"
          opacity={0.1}
          fillColor="gray"
          fillOpacity={0.1}
        />
      </FeatureGroup>
    </div>
  )
}

export default UserLocationCircle;