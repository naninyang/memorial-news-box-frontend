import React, { useEffect } from 'react';
import Seo, { originTitle } from '@/components/Seo';
import PageName from '@/components/PageName';
import EditorialItem from './item';
import styles from '@/styles/editorials.module.sass';

function Articles() {
  const timestamp = Date.now();

  useEffect(() => {
    localStorage.removeItem('currentPage');
    localStorage.setItem('currentPage', 'editorials');
  }, []);

  return (
    <main className={styles.editorials}>
      <Seo
        pageTitle={`만평보기 - ${originTitle}`}
        pageDescription="내가 봐야 할 만평"
        pageImg={`https://memorial.dev1stud.io/og-image.png?ts=${timestamp}`}
      />
      <PageName pageName="만평보기" />
      <div className={styles.list}>
        <EditorialItem />
      </div>
    </main>
  );
}

export default Articles;
