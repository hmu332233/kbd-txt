export function isIOS() {
  return (
    typeof navigator === 'object' &&
    /Mac|iPod|iPhone|iPad/.test(
      navigator?.userAgentData?.platform || navigator?.platform || '-',
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
