# kbd-txt

A lightweight (~850 B) library for easy mac/window shortcut notation.  
`kbd-txt` convert shortcut text depending on the type of OS (window/linux/mac).

This is useful when you want to display a shortcut text that fits user's OS.
It is also useful for converting mac's shortcut keys to symbols.

**[Demo »](https://kbd-txt.minung.dev)**  
**[Getting Started »](https://kbd-txt.minung.dev/docs/getting-started/introduction)**

## Installation

Using npm/yarn:

```bash
# npm
npm install --save kbd-txt

# yarn
yarn add kbd-txt
```

Using unpkg CDN:

```html
<script src="https://unpkg.com/kbd-txt/dist/kbd-txt.umd.js"></script>
```

## Quick Usage

```js
import { convert } from 'kbd-txt';

// Basic Usage
convert('Alt+S');
// Results
//   mac: Option+S
//   window: Alt+S

// Basic Usage 2 - $mod
convert('$mod+s');
// Results
//   mac: Command+S
//   window: Ctrl+S

// Symbol Usage
const options = { normalizeOptions: { useSymbol: true } };
convert('$mod+s', options);
// Results
//   mac: ⌘+S
//   window: Ctrl+S
```

### Use CDN

```html
<script src="https://unpkg.com/kbd-txt/dist/kbd-txt.umd.js">
  kbdTxt.convert('Alt+S');
  kbdTxt.convert('$mod+s');
  kbdTxt.convert('$mod+s', { normalizeOptions: { useSymbol: true } });
</script>
```

## Supported Keys

`kbd-txt` understands the following modifiers:

```
Meta: ['command', 'cmd', '⌘'],
Alt: ['alt', 'option', '⌥'],
Control: ['control', 'ctrl', '^'],
Shift: ['shift', '⇧'],
```

## API REFERENCE

### convert

Convert shortcut text depending on the type of OS (window/linux/mac).

```ts
const options = { normalizeOptions: { useSymbol: true } };
convert('$mod+s', options);
// Results
//   mac: ⌘+S
//   window: Ctrl+S
```

**Options**

```ts
parseOptions: {
  separator?: string; // A string that identifies characters to use in separating the string.
}
normalizeOptions: {
  separator?: string; // A string used to separate one element of the array from the next in the resulting string.
  useSymbol?: boolean; // If true, Display as a symbol.
  os?: 'window' | 'mac' // If set, Display a shortcut text that fits OS.
}
```

### parseToToken

Parse the shortcut text and convert to Token(KeyboardEvent.key) format.  
It's the same form as the `Keyboard Event.key`.  
`$mod` is converted to Meta/Control depending on the type of OS.

```ts
parseToToken('$mod+S');
// Results
//   mac: ['Meta', 's']
//   window: ['Control', 's']
```

**Options**

```ts
separator?: string; // A string that identifies characters to use in separating the string.
```

### normalizeToken

Merge Token[] to text according to the option.

```ts
normalizeToken(['Alt', 's']);
// Results
//   mac: Option+S
//   window: Alt+S
```

**Options**

```ts
separator?: string; // A string used to separate one element of the array from the next in the resulting string.
useSymbol?: boolean; // If true, Display as a symbol.
os?: 'window' | 'mac' // If set, Display a shortcut text that fits OS.
```

## How it works

```
Shortcut Text --(parse)--> Token(KeyboardEvent.key) --(normalize)--> Shortcuts Text for OS

parse: Parse the shortcut text and convert to Token(KeyboardEvent.key) format
normalize: Merge Token[] to text according to the option
```

## Roadmaps

- [x] Demo Site
- [x] CDN version
- [x] Option to view OS version as fixed (View only in Mac version, view only in Window version)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

Distributed under the MIT License. See `LICENSE` for more information.
