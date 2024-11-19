import storage from "./utils/storage";
import areaList from "@/config/area";
import { StorageEnum } from "@/enums/storageKey";
// 检查数据问题
const area = storage.get(StorageEnum.AREAKEY);
!area && storage.set(StorageEnum.AREAKEY, areaList);
