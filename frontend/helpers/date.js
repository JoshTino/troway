
function FormatDate(date) {
  // Format: "October 28, 2026"
  if (!date) return "";
  const newDate = new Date(date);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
  }).format(newDate);

  return formattedDate;
}

export default FormatDate;
