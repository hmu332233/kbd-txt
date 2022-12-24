import { isIOS, toUpperFirst } from './utils';

type OS = 'window' | 'mac';

/**
 *  Same meaning as KeyboardEvent.key
 */
type Token = string;

type ConvertOptions = {
  parseOptions?: ParseOptions;
  normalizeOptions?: NormalizeOptions;
};

type ParseOptions = {
  separator?: string;
};

type NormalizeOptions = {
  useSymbol?: boolean;
  separator?: string;
  os?: OS;
};

const TOKEN_NAME = {
  META: 'Meta',
  ALT: 'Alt',
  CONTROL: 'Control',
  SHIFT: 'Shift',
  CAPSLOCK: 'CapsLock',
} as const;

const TOKEN_MAP = {
  [TOKEN_NAME.META]: ['command', 'cmd', '⌘'],
  [TOKEN_NAME.ALT]: ['alt', 'option', '⌥'],
  [TOKEN_NAME.CONTROL]: ['control', 'ctrl', '^'],
  [TOKEN_NAME.SHIFT]: ['shift', '⇧'],
};

type TokenDisplayMapType = {
  [key: string]: {
    [key: string]: string;
  };
};

const TOKEN_DISPLAY_MAP: TokenDisplayMapType = {
  mac: {
    [TOKEN_NAME.META]: 'Command',
    [TOKEN_NAME.ALT]: 'Option',
    [TOKEN_NAME.CONTROL]: 'Control',
    [TOKEN_NAME.SHIFT]: 'Shift',
  },
  macSymbol: {
    [TOKEN_NAME.META]: '⌘',
    [TOKEN_NAME.ALT]: '⌥',
    [TOKEN_NAME.CONTROL]: '^',
    [TOKEN_NAME.SHIFT]: '⇧',
    [TOKEN_NAME.CAPSLOCK]: '⇪',
  },
  window: {
    [TOKEN_NAME.ALT]: 'Alt',
    [TOKEN_NAME.CONTROL]: 'Ctrl',
    [TOKEN_NAME.SHIFT]: 'Shift',
  },
  windowSymbol: {
    [TOKEN_NAME.ALT]: 'Alt',
    [TOKEN_NAME.CONTROL]: 'Ctrl',
    [TOKEN_NAME.SHIFT]: 'Shift',
  },
};

type TokenNames = keyof typeof TOKEN_MAP;

type TokenSynonymMapType = {
  [key: string]: string;
};
const TOKEN_SYNONYM_MAP: TokenSynonymMapType = Object.keys(TOKEN_MAP).reduce(
  (ret, key) => {
    const values = TOKEN_MAP[key as TokenNames];
    const valuesRet = values.reduce((valueRet, value) => {
      return {
        ...valueRet,
        [value]: key,
      };
    }, {});

    return {
      ...ret,
      ...valuesRet,
    };
  },
  {},
);

const DEFAULT_SEPARATOR = '+';

/**
 * Convert shortcut text depending on the type of OS (window/linux/mac).
 * @param str A Shortcut string.
 * @param parseOptions
 * @param normalizeOptions
 */
export function convert(
  str: string,
  { parseOptions, normalizeOptions }: ConvertOptions = {},
) {
  const tokens = parseToToken(str, parseOptions);
  return normalizeToken(tokens, normalizeOptions);
}

/**
 * Parse the shortcut text and convert to Token(KeyboardEvent.key) format.
 * $mod is converted to Meta/Control depending on the type of OS.
 *
 * @param str A Shortcut string.
 * @param separator A string that identifies characters to use in separating the string.
 * @returns Token[]
 */
export function parseToToken(
  str: string,
  { separator = DEFAULT_SEPARATOR }: ParseOptions = {},
): Token[] {
  const mod = isIOS() ? 'Meta' : 'Control';
  return str
    .trim()
    .split(separator)
    .map((v) => v.toLowerCase())
    .map((key) => {
      if (key === '$mod') {
        return mod;
      }
      return TOKEN_SYNONYM_MAP[key] || key;
    });
}

/**
 * Merge Token[] to text according to the option.
 *
 * @param tokens Token[]
 * @param separator A string used to separate one element of the array from the next in the resulting string.
 * @param useSymbol If true, Display as a symbol.
 * @returns
 */
export function normalizeToken(
  tokens: Token[],
  { separator = DEFAULT_SEPARATOR, useSymbol, os }: NormalizeOptions = {},
) {
  const typeKey = os || (isIOS() ? 'mac' : 'window');
  const symbolKey = useSymbol ? 'Symbol' : '';
  const keyDisplayMap = TOKEN_DISPLAY_MAP[`${typeKey}${symbolKey}`];

  return tokens
    .map((v) => keyDisplayMap[v] || v)
    .map((v) => toUpperFirst(v))
    .join(separator);
}
