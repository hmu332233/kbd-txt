---
sidebar_label: Introduction
---

# Introduction

## Welcome to kbd-txt: Cross-Platform Keyboard Shortcut Solution!
Dealing with keyboard shortcuts can often become a maze when your application is being accessed across different operating systems like Mac, Windows, and Linux. That's where kbd-txt shines!

## What is kbd-txt?
kbd-txt is a feather-light JavaScript library, with a footprint of just about 850 bytes, engineered to format and display keyboard shortcuts in a consistent manner across Mac, Windows, and Linux operating systems. This nifty library takes the headache out of managing multiple shortcut notations by converting shortcut text based on the OS type, ensuring a smooth user interaction regardless of the platform.

## Why choose kbd-txt?
If your project requires displaying keyboard shortcuts to users on diverse systems, kbd-txt is your ideal companion. It gracefully handles the formatting, offering a clear and user-friendly presentation of shortcuts, enhancing the overall user experience.

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

## How it works

```
Shortcut Text --(parse)--> Token(KeyboardEvent.key) --(normalize)--> Shortcuts Text for OS

parse: Parse the shortcut text and convert to Token(KeyboardEvent.key) format
normalize: Merge Token[] to text according to the option
```

## Roadmap

- [x] Demo Site
- [x] CDN version
- [x] Option to view OS version as fixed (View only in Mac version, view only in Window version)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

Distributed under the MIT License. See `LICENSE` for more information.
