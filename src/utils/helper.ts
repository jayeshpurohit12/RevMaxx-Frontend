export const formatTime = timeInSeconds => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  const formatNumber = num => num.toString().padStart(2, '0');

  return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(
    seconds,
  )}`;
};
