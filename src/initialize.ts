import { StorageEnum } from "./enums/storageKey";
import storage from "./utils/storage";
import config from "./config";

for (let k in StorageEnum) {
  const key = StorageEnum[k];
  const list = storage.get(key, []) as any[];
  if (!list || list.length == 0) storage.set(key, config[key]);
}
