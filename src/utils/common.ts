export const getFileName = (url: string): string => {
  const match = url.match(/\/([^\/?]+\.(png|jpeg|jpg|gif))/i);
  return match ? match[1] : "";
};
export const decodeFileNameIfChinese = (filename: string) => {
  try {
    // 检查是否有被编码的部分
    if (/%[0-9A-Fa-f]{2}/.test(filename)) {
      // 尝试解码
      const decoded = decodeURIComponent(filename);
      // 如果解码后与原始文件名不同，说明包含中文或非 ASCII 字符
      return decoded;
    }
  } catch (error) {
    console.error("解码失败:", error);
  }
  // 如果没有编码或解码失败，返回原始文件名
  return filename;
};
