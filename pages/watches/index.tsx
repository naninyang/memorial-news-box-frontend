import React, { useEffect, useState } from 'react';
import Seo from '@/components/Seo';
import PageName from '@/components/PageName';
import WatchesNews from './item';
import styles from '@/styles/watches.module.sass';

export default function Watches() {
  const [activeArea, setActiveArea] = useState<number | null>(null);
  const timestamp = Date.now();

  useEffect(() => {
    const currentTab = localStorage.getItem('currentWatches');

    if (currentTab === 'news') {
      setActiveArea(1);
    } else if (currentTab === 'playlist') {
      setActiveArea(2);
    }

    localStorage.removeItem('currentPage');
    localStorage.setItem('currentPage', 'watches');
  }, []);

  const handleTabChange = (tabNumber: number) => {
    setActiveArea(tabNumber);

    if (tabNumber === 1) {
      localStorage.setItem('currentWatches', 'news');
    } else if (tabNumber === 2) {
      localStorage.setItem('currentWatches', 'playlist');
    } else {
      localStorage.removeItem('currentWatches');
    }
  };

  return (
    <main className={styles.watches}>
      <Seo
        pageTitle="유튜브 뉴스"
        pageDescription="내가 기억해야 할 뉴스"
        pageImg={`https://memorial.dev1stud.io/og-image.png?ts=${timestamp}`}
      />
      <PageName pageName="유튜브 뉴스" />
      <div className={styles.list}>{(activeArea === null || activeArea === 1) && <WatchesNews />}</div>
    </main>
  );
}
