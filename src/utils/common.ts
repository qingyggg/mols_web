export const getFileName = (url: string): string => {
  const match = url.match(/\/([^\/?]+\.(png|jpeg|jpg|gif))/i);
  return match ? match[1] : "";
};
