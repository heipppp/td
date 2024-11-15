/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

export function isVal(value: any): boolean {
  // 检查是否为 null 或 undefined
  if (value === null || value === undefined) {
    return true;
  }

  // 检查是否为空字符串
  if (typeof value === "string" && value.trim() === "") {
    return true;
  }

  // 检查是否为空数组
  if (Array.isArray(value) && value.length === 0) {
    return true;
  }

  // 检查是否为空对象（没有自有属性）
  if (typeof value === "object" && Object.keys(value).length === 0) {
    return true;
  }

  // 如果不是以上任何一种情况，则返回 false
  return false;
}
