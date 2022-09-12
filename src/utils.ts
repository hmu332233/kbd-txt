export function isIOS() {
  return (
    typeof navigator === 'object' &&
    /mac|ipod|iphone|ipad/.test(
      (
        navigator?.userAgentData?.platform ||
        navigator?.platform ||
        '-'
      ).toLowerCase(),
    )
  );
}

/**
 * Converts the first character of string to upper case.
 * @param str The string to convert.
 * @returns Returns the converted string.
 */
export function toUpperFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
