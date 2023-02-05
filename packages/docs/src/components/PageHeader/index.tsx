import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';

function PageHeader() {
  return (
    <div className={clsx('hero', styles.heroBanner)}>
      <div className="container text--left">
        <h1 className="hero__title">kbd-txt</h1>
        <p className="hero__subtitle">
          kbd-txt is a lightweight (~850 B) library that formats keyboard
          shortcuts for Mac, Windows,
          <br />
          making it easy to display shortcuts for users on different systems.
        </p>
        <Link
          className="button button--primary button--lg"
          to="/docs/getting-started/introduction"
        >
          Get Started&nbsp;&nbsp;→
        </Link>
      </div>
    </div>
  );
}

export default PageHeader;
