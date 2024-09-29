interface User {
  name: string;
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
