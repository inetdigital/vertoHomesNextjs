export const DateFormat = ({ dateString }) => {
  const formatDate = (inputDate) => {
    // Replace '+0000' with 'Z' for correct parsing
    const standardizedDate = inputDate?.replace("+0000", "Z");
    const date = new Date(standardizedDate);

    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const year = date.getUTCFullYear();

    return `${day} / ${month} / ${year}`;
  };

  return <span>{formatDate(dateString)}</span>;
};
