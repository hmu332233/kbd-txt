import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';

function PageHeader() {
  return (
    <div className={clsx('hero shadow--lw', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">kbd-txt</h1>
        <p className="hero__subtitle">
          A lightweight (~850 B) library for easy mac/window shortcut notation.
          <br />
          kbd-txt convert shortcut text depending on the type of OS
          (window/linux/mac).
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/Getting%20Started/Introduction"
          >
            Get Started&nbsp;&nbsp;→
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PageHeader;
