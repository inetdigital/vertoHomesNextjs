export const convertToSquareFeet = (meters) => {
  const conversionFactor = 10.7639; // 1 square meter = 10.7639 square feet
  return (meters * conversionFactor).toFixed(2); // Round to 2 decimal places
};
