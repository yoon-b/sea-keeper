interface User {
  name: string;
}

interface Inspection {
  id: number;
  serialNumber: string;
  latitude: number;
  longitude: number;
  coastName: string;
  coastLength: number;
  predictedTrashVolume: number;
  mainTrashType: number;
  monitoringImageUrl: string;
}

interface Cleanup {
  id: number;
  serialNumber: string;
  latitude: number;
  longitude: number;
  coastName: string;
  coastLength: number;
  actualTrashVolume: number;
  mainTrashType: number;
  beforeViewImageUrl: string;
  afterViewImageUrl: string;
  completeViewImageUrl: string;
}

interface CoastStats {
  coastName: string;
  avgTrashVolume: number;
  latitude: number;
  longitude: number;
}

interface ChartConfig {
  title: string;
  xAxis: string;
  yAxis: string;
}

interface ChartData {
  x: string;
  y: number;
}

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

interface RouteSummary {
  origin: {
    name: string;
    x: number;
    y: number;
  };
  destination: {
    name: string;
    x: number;
    y: number;
  };
  waypoints: Array<{
    name: string;
    x: number;
    y: number;
  }>;
  priority: string;
  bound: {
    min_x: number;
    min_y: number;
    max_x: number;
    max_y: number;
  };
  fare: {
    taxi: number;
    toll: number;
  };
  distance: number;
  duration: number;
}

interface RouteSection {
  distance: number;
  duration: number;
  bound: {
    min_x: number;
    min_y: number;
    max_x: number;
    max_y: number;
  };
  roads: Array<{
    name: string;
    distance: number;
    duration: number;
    traffic_speed: number;
    traffic_state: number;
    vertexes: number[];
  }>;
  guides: Array<{
    name: string;
    x: number;
    y: number;
    distance: number;
    duration: number;
    type: number;
    guidance: string;
    road_index: number;
  }>;
}
