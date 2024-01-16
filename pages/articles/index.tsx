import React, { useEffect } from 'react';
import Seo, { originTitle } from '@/components/Seo';
import PageName from '@/components/PageName';
import ArticlesItem from './item';
import styles from '@/styles/articles.module.sass';

function Articles() {
  const timestamp = Date.now();

  useEffect(() => {
    localStorage.removeItem('currentPage');
    localStorage.setItem('currentPage', 'articles');
  }, []);

  return (
    <main className={styles.articles}>
      <Seo
        pageTitle={`네이버 뉴스 - ${originTitle}`}
        pageDescription="내가 기억해야 할 뉴스"
        pageImg={`https://memorial.dev1stud.io/og-image.png?ts=${timestamp}`}
      />
      <PageName pageName="네이버 뉴스" />
      <div className={styles.list}>
        <ArticlesItem />
      </div>
    </main>
  );
}

export default Articles;
