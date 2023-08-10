export const enteredOnlyNumber = (val: string): string => {
  return val.replace(/[^0-9]/g, "");
};

export const addComma = (num: string | number): string => {
  const strNum = typeof num === "number" ? num.toString() : num;
  return strNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const deleteComma = (str: string): string => {
  return str.replace(/,/g, "");
};