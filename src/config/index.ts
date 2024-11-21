import area from "./area";
import category from "./category";
import { StorageEnum } from "@/enums/storageKey";
import color from "./color";

export default {
  [StorageEnum.AREAKEY]: area,
  [StorageEnum.CATEGORYKEY]: category,
  [StorageEnum.AREACOLORKEY]: color
};
