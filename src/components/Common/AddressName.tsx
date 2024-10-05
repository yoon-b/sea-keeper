import React, { useEffect, useState } from "react";
import myIcon from "../../assets/animated-marker.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

declare global {
  interface Window {
    kakao: {
      maps: {
        LatLng: new (lat: number, lng: number) => LatLng;
        services: {
          Geocoder: new () => Geocoder;
          Status: {
            OK: string;
          };
        };
      };
    };
  }

  interface LatLng {
    getLat: () => number;
    getLng: () => number;
  }

  interface Geocoder {
    coord2Address(
      lng: number,
      lat: number,
      callback: (result: AddressResult[], status: string) => void
    ): void;
  }

  interface AddressResult {
    address: Address;
  }

  interface Address {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    mountain_yn: string;
    main_address_no: string;
    sub_address_no: string;
    zip_code: string;
  }
}

interface ChildComponentProps {
  location: {
    latitude: number;
    longitude: number;
  } | null;
}

const AddressName: React.FC<ChildComponentProps> = ({ location }) => {
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    if (location == null) {
      return;
    }

    console.log("현재위치", location);
    const geocoder = new window.kakao.maps.services.Geocoder();

    const coord = new window.kakao.maps.LatLng(
      location.latitude,
      location.longitude
    );

    const callback = (result: AddressResult[], status: string) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setAddress(result[0].address.address_name);
      }
    };

    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  }, [location]);

  return (
    <div className="flex items-center">
      <img src={myIcon} alt="Icon" className="w-8 h-8 mr-2" />
      <div>
        {location ? (
          address || <Skeleton width={200} />
        ) : (
          <Skeleton width={200} />
        )}
      </div>
    </div>
  );
};

export default AddressName;
