import React, { useEffect, useState } from 'react';
import Seo from '@/components/Seo';
import PageName from '@/components/PageName';
import ArticlesItem from './item';
import styles from '@/styles/articles.module.sass';

function Articles() {
  const [activeArea, setActiveArea] = useState<number | null>(null);
  const timestamp = Date.now();

  useEffect(() => {
    const currentTab = localStorage.getItem('currentArticles');

    if (currentTab === 'news') {
      setActiveArea(1);
    } else if (currentTab === 'entertainment') {
      setActiveArea(2);
    }

    localStorage.removeItem('currentPage');
    localStorage.setItem('currentPage', 'articles');
  }, []);

  const handleTabChange = (tabNumber: number) => {
    setActiveArea(tabNumber);

    if (tabNumber === 1) {
      localStorage.setItem('currentArticles', 'news');
    } else if (tabNumber === 2) {
      localStorage.setItem('currentArticles', 'entertainment');
    } else {
      localStorage.removeItem('currentArticles');
    }
  };

  return (
    <main className={styles.articles}>
      <Seo
        pageTitle="네이버 뉴스 기사"
        pageDescription="내가 기억해야 할 뉴스"
        pageImg={`https://memorial.dev1stud.io/og-image.png?ts=${timestamp}`}
      />
      <PageName pageName="네이버 뉴스" />
      <div className={styles.list}>{(activeArea === null || activeArea === 1) && <ArticlesItem />}</div>
    </main>
  );
}

export default Articles;
