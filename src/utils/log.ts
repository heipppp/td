type LogType = "default" | "error" | "warning" | "success";

export default function (msg: string, type?: LogType) {
  const colors: Record<LogType, string> = {
    default: "#000",
    error: "#F56C6C",
    warning: "#E6A23C",
    success: "#67C23A"
  };
  return console.info(
    `%c Log -> %c${msg}`,
    "font-size: 12px; margin-bottom: 2px; padding: 3px 4px; color: #fff; background: " +
      colors[type] +
      ";",
    "font-size: 12px; margin-bottom: 2px; padding: 3px 4px; color: #000; background: #F0F2F5;"
  );
}
