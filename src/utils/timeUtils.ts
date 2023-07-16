export const setKoreanTime = (time: number) => {
  const date = new Date(time * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}시 ${minutes}분`;
};
