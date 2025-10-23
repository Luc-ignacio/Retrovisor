export type LatLongItem = {
  lat: number;
  long: number;
};

export type MapPoint = {
  id: int;
  name: string;
  description: string;
} & LatLongItem;
