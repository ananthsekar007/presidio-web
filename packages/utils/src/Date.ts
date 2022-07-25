import { format } from "date-fns";
import { GoDB } from "@gogocode-package/database";

export type DateSeperator = "UPCOMING" | "PAST";

export const FormatDate = (date: Date) => {
  return format(date, "MM/dd/yyyy");
};

export const FormatTime = (date: Date) => {
  return format(date, "hh:mm a");
};

export const getDateStatus = (by: DateSeperator) => {
  if (by === "UPCOMING") {
    return {
      [GoDB.Op.gt]: new Date(),
    };
  } else {
    return {
      [GoDB.Op.lt]: new Date(),
    };
  }
};

export const getReadableDate = (date: Date) => {
  return format(date, "MMM d, yyyy");
};

// export const FormatWithSpecificTime = (date: Date, specificTime: string) => {
//   if (specificTime === "Specific Time") {
//     return utcToZonedTime(date, customer.time_zone).toLocaleTimeString();
//   }
// }
