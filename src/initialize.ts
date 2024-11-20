import { StorageEnum } from "./enums/storageKey";
import storage from "./utils/storage";
import area from "./config/area";

const areaList = storage.get(StorageEnum.AREAKEY, null);
!areaList && storage.set(StorageEnum.AREAKEY, area);
