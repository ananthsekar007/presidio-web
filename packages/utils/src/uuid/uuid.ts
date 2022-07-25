import * as uuid from "uuid";

export const getRandomString = (prefix: string = "") => {
  return prefix + "_" + uuid.v1() + "-gogocode-" + uuid.v4() + Math.random();
};
