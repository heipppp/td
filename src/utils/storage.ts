import log from "./log";

function get<T>(key: string, defaultValue = {}): T {
  try {
    const getI = localStorage.getItem(key);
    if (!getI) {
      return defaultValue as T;
    }
    return JSON.parse(getI);
  } catch (e) {
    log(`存储信息转换错误: ${e}`, "error");
    return defaultValue as T;
  }
}

function set(key: string, value: any) {
  return localStorage.setItem(key, JSON.stringify(value));
}

function remove(key: string) {
  localStorage.removeItem(key);
}

export default { get, set, remove };
