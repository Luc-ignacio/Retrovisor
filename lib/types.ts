import type { RouteLocationRaw } from "vue-router";

export type LatLongItem = {
  lat: number;
  long: number;
};

export type MapPoint = {
  id: int;
  name: string;
  description: string;
  to?: RouteLocationRaw;
  toLabel?: string;
} & LatLongItem;
