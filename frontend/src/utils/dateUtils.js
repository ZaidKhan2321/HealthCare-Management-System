export const getDays = (month, year) => {
    if (!month || !year) return Array.from({ length: 31 }, (_, i) => i + 1);
    return Array.from(
      { length: new Date(year, month, 0).getDate() },
      (_, i) => i + 1
    );
  };
  
  export const getMonths = () =>
    [
      { value: 1, label: "Jan" }, { value: 2, label: "Feb" }, { value: 3, label: "Mar" },
      { value: 4, label: "Apr" }, { value: 5, label: "May" }, { value: 6, label: "Jun" },
      { value: 7, label: "Jul" }, { value: 8, label: "Aug" }, { value: 9, label: "Sep" },
      { value: 10, label: "Oct" }, { value: 11, label: "Nov" }, { value: 12, label: "Dec" }
    ];
  
  export const getYears = (start = 1900, end = new Date().getFullYear()) =>
    Array.from({ length: end - start + 1 }, (_, i) => end - i);
  