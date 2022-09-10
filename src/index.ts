import { isIOS } from './utils';

type Token = string;
type ConvertOptions = {
  splitSeparator?: string;
  joinSeparator?: string;
};

/**
 * convert
 * window, mac 여부를 판단해서 OS에 맞는 keyboard shortcuts 표기로 변환해준다.
 * Ctrl+C -> Cmd+C, ⌘C, Command+C
 * 제공 예정 옵션
 * OS 버전 고정: Mac 버전으로만 보기, Window 버전으로만 보기
 * Mac 아이콘 표기: Command (or Cmd) ⌘, Shift ⇧, Option (or Alt) ⌥, Control (or Ctrl) ⌃, Caps Lock ⇪
 *
 * 구현 방향
 * parse -> token 리턴 -> token을 옵션에 맞춰서 변경 후 join -> 결과 리턴
 */
export function convert(
  str: string,
  { splitSeparator = '+', joinSeparator = '+' }: ConvertOptions = {},
) {
  const tokens = parseToToken(str, splitSeparator);
  return normalizeToken(tokens, joinSeparator);
}

function parseToToken(str: string, separator: string): Token[] {
  const MOD = isIOS() ? 'Command' : 'Ctrl';
  return str
    .trim()
    .split(separator)
    .map((key) => {
      return key === '$mod' ? MOD : key;
    });
}

function normalizeToken(tokens: Token[], separator: string) {
  return tokens.join(separator);
}
