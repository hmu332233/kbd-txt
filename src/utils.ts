export function isIOS() {
  return (
    typeof navigator === 'object' &&
    /Mac|iPod|iPhone|iPad/.test(
      navigator?.userAgentData?.platform || navigator?.platform || '-',
    )
  );
}
