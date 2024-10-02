import axios from 'axios';

const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;

interface SpotData {
    name: string;
    x: number;
    y: number;
  }

export const fetchRoute = async (
  origin: SpotData, 
  destination: SpotData, 
  priority: string = 'RECOMMEND'
) => {
  try {
    const url = 'https://apis-navi.kakaomobility.com/v1/directions';

    // origin과 destination을 'x,y' 형식의 문자열로 변환
    const originStr = `${origin.x},${origin.y}`;
    const destinationStr = `${destination.x},${destination.y}`;

    const params = {
      origin: originStr,
      destination: destinationStr,
      priority,
      car_fuel: 'GASOLINE',
      car_hipass: false,
      alternatives: false,
      road_details: false
    };

    const res = await axios.get(url, {
      headers: {
        'Authorization': `KakaoAK ${REST_API_KEY}`,
        'Content-Type': 'application/json',
      },
      params,
    });

    return res.data;
  } catch (err) {
    throw new Error(`카카오 모빌리티 자동차 길찾기 api 에러: ${err}`);
  }
};

// 다중 경유지 경로 찾기 (POST 메서드)
export const fetchRouteWaypoint = async (
  origin: SpotData, 
  destination: SpotData, 
  waypoints: SpotData[], 
  priority: string = 'RECOMMEND'
) => {
  try {
    const url = 'https://apis-navi.kakaomobility.com/v1/waypoints/directions';

    const body = {
      origin,
      destination,
      waypoints,
      priority,
      car_fuel: 'GASOLINE',
      car_hipass: false,
      alternatives: false,
      road_details: false
    };

    const res = await axios.post(url, body, {
      headers: {
        'Authorization': `KakaoAK ${REST_API_KEY}`,
        'Content-Type': 'application/json',
      }
    });

    return res.data;
  } catch (err) {
    throw new Error(`카카오 모빌리티 다중경유지 길찾기 api 에러: ${err}`);
  }
};
