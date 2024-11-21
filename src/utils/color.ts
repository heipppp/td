export function genHexColor() {
  // 随机生成一个6位的十六进制数，每两位代表RGB中的一个分量
  const hex = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0");

  // 返回带有'#'前缀的十六进制颜色字符串
  return `#${hex}`;
}
