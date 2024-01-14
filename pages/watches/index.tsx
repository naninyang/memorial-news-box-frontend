import React, { useEffect } from 'react';
import Seo from '@/components/Seo';
import PageName from '@/components/PageName';
import WatchesNews from './item';
import styles from '@/styles/watches.module.sass';

export default function Watches() {
  const timestamp = Date.now();

  useEffect(() => {
    localStorage.removeItem('currentPage');
    localStorage.setItem('currentPage', 'watches');
  }, []);

  return (
    <main className={styles.watches}>
      <Seo
        pageTitle="유튜브 뉴스"
        pageDescription="내가 기억해야 할 뉴스"
        pageImg={`https://memorial.dev1stud.io/og-image.png?ts=${timestamp}`}
      />
      <PageName pageName="유튜브 뉴스" />
      <div className={styles.list}>
        <WatchesNews />
      </div>
    </main>
  );
}
