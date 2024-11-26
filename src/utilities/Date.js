const handleCurrentDate = () => {
  const date = new Date();
  const month =
    date?.getMonth() + 1 < 10
      ? `0${date?.getMonth() + 1}`
      : date?.getMonth() + 1;
  const d = date?.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${date?.getFullYear()}-${month}-${d}`;
};

export const currentDate = handleCurrentDate();
