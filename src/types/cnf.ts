export type AreaType = {
  id: string;
  text: string;
  value: string;
  children: AreaAddressType[];
};

export type AreaAddressType = {
  id: string;
  area: string;
  text: string;
  value: string;
};

export type ReserverType = {
  day: string;
  id: string;
  site: string;
  tKey: number;
  time: string;
};
