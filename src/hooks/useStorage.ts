import log from "@/utils/log";
import storage from "@/utils/storage";
import { computed, ref, type Ref } from "vue";

export function useStorage<T = any>(key: string): [Ref<T>, () => void] {
  const originalVal = ref(storage.get(key));
  return [
    computed<T>({
      get() {
        return originalVal.value;
      },
      set(val: any) {
        log(val, "success");
        originalVal.value = val;
        storage.set(key, val);
      }
    }),
    () => storage.remove(key)
  ];
}
