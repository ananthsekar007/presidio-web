function escapeRegExp(string: string): string {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export function replaceAll(str: string, find: string, replace: string): string {
  return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
}

export function getNumbersFromUsFormat(phone_number: string): string {
  return phone_number?.replace(/[^0-9.]/g, "");
}
