import React, { Suspense } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Preview from '@site/src/components/Preview';
import PageHeader from '@site/src/components/PageHeader';

import styles from './index.module.css';

function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <PageHeader />
      <main>
        <Suspense fallback={<div>로딩 중..</div>}>
          <Preview />
        </Suspense>
      </main>
    </Layout>
  );
}

export default Home;
