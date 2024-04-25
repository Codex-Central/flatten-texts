export const isJsonString = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

export const splitMessage = (message: string): string[] => {
  return message.split("\n\n");
};
