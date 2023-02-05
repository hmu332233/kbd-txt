import React, { useState } from 'react';

import { loadScript } from '@site/src/utils';
import { convert } from 'kbd-txt';
import Select from '@site/src/components/Select';
import CodeTable from '../CodeTable';
import { USE_SYMBOL_ITEMS, OS_ITEMS } from '@site/src/types';

const baseShortcuts = ['cmd', 'alt', 'ctrl', 'shift', '$mod'];

const exampleShortcuts = ['Alt+S', '$mod+s'];

function Preview() {
  loadScript('https://unpkg.com/kbd-txt/dist/kbd-txt.umd.js').read();

  const [type, setType] = useState('');
  const [useSymbol, setUseSymbol] = useState(false);

  return (
    <section className="padding--lg">
      <div className="container">
        <div className="row">
          <div className="col">
            <h2>Preview</h2>
            <p className="margin--none">
              This library can be useful when you want to display keyboard
              shortcuts in a way that is specific to the user's operating system
              <br />
              or for converting Mac keyboard shortcuts into symbols.
            </p>
          </div>
        </div>
        <div className="row margin-top--lg">
          <div className="col col--4 flex gap-4 margin-bottom--md">
            <Select
              label={'OS Type'}
              items={OS_ITEMS}
              value={type}
              onChange={setType}
            />
            <Select
              label={'Use Symbol'}
              items={USE_SYMBOL_ITEMS}
              value={useSymbol}
              onChange={setUseSymbol}
            />
          </div>
          <div className="col col--4">
            <CodeTable
              rows={baseShortcuts.map((shortcut) => ({
                code: shortcut,
                display: convert(shortcut, {
                  normalizeOptions: { os: type, useSymbol },
                }),
              }))}
            />
          </div>
          <div className="col col--4">
            <CodeTable
              rows={exampleShortcuts.map((shortcut) => ({
                code: shortcut,
                display: convert(shortcut, {
                  normalizeOptions: { os: type, useSymbol },
                }),
              }))}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Preview;
