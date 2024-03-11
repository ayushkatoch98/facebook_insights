export function extractDateFromISOString(dateString) {
    const dateObject = new Date(dateString);
  
    // Extracting date components
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // Months are zero-based
    const day = dateObject.getDate();
  
    // Formatting the date
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  
    return formattedDate;
}