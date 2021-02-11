export const isEmptyObject = (object) => {
  return (
    object === undefined || object === null || Object.keys(object).length === 0
  );
};

export const isEmptyArray = (value) => {
  return value === undefined || value === null || value.length === 0;
};

export const isEmptyString = (value) => {
  return value === undefined || value === null || value.trim() === "";
};

export const isString = (value) => {
  return value !== undefined && value !== null && typeof value === "string";
};

export const isObject = (value) => {
  return value !== undefined && value !== null && typeof value === "object";
};
