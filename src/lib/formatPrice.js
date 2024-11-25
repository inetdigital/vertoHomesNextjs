export const formatPrice = (number) => {
  if (isNaN(number)) return "Invalid number";
  return new Intl.NumberFormat("en-EN").format(number);
};
