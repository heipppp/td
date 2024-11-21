import { StorageEnum } from "@/enums/storageKey";
import { genHexColor } from "@/utils/color";
import log from "@/utils/log";
import storage from "@/utils/storage";

export function useColorHelp() {
  function set(color: string, key: string) {
    const obj = {
      key,
      value: color
    };
    const colors = storage.get(StorageEnum.AREACOLORKEY, []) as any[];
    if (color && color.length > 0) {
      colors.push(obj);
      storage.set(StorageEnum.AREACOLORKEY, colors);
    } else {
      storage.set(StorageEnum.AREACOLORKEY, [obj]);
    }
  }
  function get(key: string) {
    const colors = storage.get(StorageEnum.AREACOLORKEY, []) as any[];
    const item = colors.find((item: any) => {
      return item.key === key;
    });
    if (item) {
      return item.value;
    } else {
      log("颜色未找到", "error");
      return genHexColor();
    }
  }

  return {
    set,
    get
  };
}
