import React, { useEffect } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

import { loadScript } from '@site/src/utils';

function Preview() {
  loadScript('https://unpkg.com/kbd-txt/dist/kbd-txt.umd.js').read();

  return (
    <section>
      <div className="container">
        <div className="row">로딩 완료</div>
      </div>
    </section>
  );
}

export default Preview;
