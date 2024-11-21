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
  color: string;
};

export type CateType = {
  id: string;
  text: string;
  value: string;
};
