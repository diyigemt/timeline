import dayjs from "dayjs";

/**
 * 获取格式化的当前时间
 * @param format 格式化字符串
 * return 格式化的当前时间
 */
// eslint-disable-next-line import/prefer-default-export
export function nowTime(format = "yyyy-MM-dd HH:mm:ss"): string {
  return dayjs().format(format);
}
