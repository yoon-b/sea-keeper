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
  monitoringViewImageUrl: string;
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
