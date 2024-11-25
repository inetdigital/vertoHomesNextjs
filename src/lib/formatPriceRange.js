export const formatRange = (range) => {
  if (!range) return "";

  const [min, max] = range.split("-").map(Number);

  const formatNumber = (num) => {
    if (num < 1000) return `£${num}`;
    return `£${Math.round(num / 1000)}k`;
  };

  const formattedMin = formatNumber(min);
  const formattedMax = formatNumber(max);

  return `${formattedMin} - ${formattedMax}`;
};
