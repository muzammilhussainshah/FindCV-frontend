export const formatDateForMySQL = (selectedDate) => {
    const date = new Date(selectedDate);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2); // getMonth() is zero-indexed
    const day = (`0${date.getDate()}`).slice(-2);
  
    return `${year}-${month}-${day}`;
};