import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Suspense from '@site/src/components/Suspense';
import Preview from '@site/src/components/Preview';
import PageHeader from '@site/src/components/PageHeader';

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
