# kbd-txt

A lightweight library for easy mac/window shortcut notation.  
Determine whether it is mac/window or not and convert it to the correct keyboard shortcut text.

## Installation

```bash
npm install --save kbd-txt
yarn add kbd-txt
```

## Quick Usage

```js
import { convert } from 'kbd-txt';

const shortcutText = 'Ctrl+S';

// Basic Usage
convert(shortcutText);
// Results
//   mac: Command+K
//   window: Ctrl+K

// Symbol Usage
const options = { normalizeOptions: { useSymbol: true } };
convert(shortcutText, options);
// Results
//   mac: ⌘+K
//   window: Ctrl+K
```

## Options

```ts
parseOptions: {
  separator?: string; // A string that identifies characters to use in separating the string.
}
normalizeOptions: {
  separator?: string; // A string used to separate one element of the array from the next in the resulting string.
  useSymbol?: boolean; // If true, Display as a symbol.
}
```

## How it works

```
Shortcut Text --(parse)--> Token(KeyboardEvent.key) --(normalize)--> Shortcuts Text for OS

parse: Receive shortcut text and convert to Token(KeyboardEvent.key) format
normalize: Merge Token to reflect options
```

## Roadmaps

- [ ] Demo Site
- [ ] CDN version
- [ ] Option to view OS version as fixed (View only in Mac version, view only in Window version)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

Distributed under the MIT License. See `LICENSE` for more information.
