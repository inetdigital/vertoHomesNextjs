export const formatRange = (range) => {
  if (!range) return "";

  const [min, max] = range.split("-").map(Number);

  const formatNumber = (num) => {
    if (num >= 1000000)
      return `£${(num / 1000000).toFixed(num % 1000000 === 0 ? 0 : 1)}M`; // Format as '1M' or '1.5M'
    if (num >= 1000) return `£${Math.round(num / 1000)}k`; // Format as '1k'
    return `£${num}`; // For numbers below 1000
  };

  const formattedMin = formatNumber(min);
  const formattedMax = formatNumber(max);

  return `${formattedMin} - ${formattedMax}`;
};
