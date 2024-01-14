import { useEffect, useState } from 'react';
import axios from 'axios';
import { isSafari } from 'react-device-detect';
import Seo from '@/components/Seo';
import styled from '@emotion/styled';
import { images } from '@/components/images';
import { rem } from '@/styles/designSystem';
import styles from '@/styles/pages.module.sass';
import content from '@/styles/content.module.sass';
import main from '@/styles/main.module.sass';

interface Counts {
  youtube: number;
  naver: number;
  twitter: number;
}

type DataResponse = {
  description: string;
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: rem(25),
  '& div[data-youtube] h2 i': {
    'body[data-theme="dark"] &': {
      background: `url(${images.tab.youtube.defaultLight}) no-repeat 50% 50%/contain`,
    },
    'body &, body[data-theme="light"] &': {
      background: `url(${images.tab.youtube.defaultDark}) no-repeat 50% 50%/contain`,
    },
  },
  '& div[data-naver] h2 i': {
    'body[data-theme="dark"] &': {
      background: `url(${images.tab.naver.defaultLight}) no-repeat 50% 50%/contain`,
    },
    'body &, body[data-theme="light"] &': {
      background: `url(${images.tab.naver.defaultDark}) no-repeat 50% 50%/contain`,
    },
  },
  '& div[data-twitter] h2 i': {
    'body[data-theme="dark"] &': {
      background: `url(${images.tab.twitter.defaultLight}) no-repeat 50% 50%/contain`,
    },
    'body &, body[data-theme="light"] &': {
      background: `url(${images.tab.twitter.defaultDark}) no-repeat 50% 50%/contain`,
    },
  },
});

const Apple = styled.article({
  '& i': {
    'body[data-theme="dark"] &': {
      background: `url(${images.misc.symbolLight}) no-repeat 50% 50%/contain`,
    },
    'body &, body[data-theme="light"] &': {
      background: `url(${images.misc.symbolDark}) no-repeat 50% 50%/contain`,
    },
  },
});

export default function Home() {
  const [data, setData] = useState<DataResponse | null>(null);
  const title = 'Home';

  useEffect(() => {
    async function fetchTitleData() {
      try {
        const response = await axios.get(`/api/pages?title=${title}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching page info:', error);
      }
    }

    fetchTitleData();
  }, [title]);

  useEffect(() => {
    localStorage.removeItem('currentPage');
  }, []);

  const [count, setCount] = useState<Counts | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchCountData() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contentTotalCount`);
      const data = await response.json();
      setCount(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCountData();
  }, []);

  const [deviceSafari, setDeviceSafari] = useState<string>();

  useEffect(() => {
    if (isSafari) {
      setDeviceSafari('isSafari');
    }
  }, []);

  function formatNumber(value: number): string {
    return value.toLocaleString();
  }

  const timestamp = Date.now();

  return (
    <main className={`${content.content} ${styles.pages} ${styles.home} ${main.main}`}>
      <Seo
        pageTitle="기억뉴스상자 memorial.newsbox"
        pageDescription="내가 기억해야 할 뉴스"
        pageImg={`https://memorial.dev1stud.io/og-image.png?ts=${timestamp}`}
      />
      <div className={`${styles['pages-content']} ${main['main-content']}`}>
        <h1>
          <span>memorial.newsbox</span>
        </h1>
        {data && <Container className={main.description} dangerouslySetInnerHTML={{ __html: data.description }} />}
        {count && (
          <dl>
            <div>
              <dt>가져온 YouTube 뉴스</dt>
              <dd>{formatNumber(count.youtube)} 건</dd>
            </div>
            <div>
              <dt>가져온 NAVER 뉴스</dt>
              <dd>{formatNumber(count.naver)} 건</dd>
            </div>
            <div>
              <dt>가져온 Twitter 인용</dt>
              <dd>{formatNumber(count.twitter)} 건</dd>
            </div>
          </dl>
        )}
        {deviceSafari === 'isSafari' && (
          <Apple className={main.apple}>
            <h2>애플 디바이스에서 앱 내려받기</h2>
            <p>아이폰, 아이패드, 맥에서 앱을 내려받을 수 있습니다.</p>
            <p>
              <span>
                아이폰, 아이패드에서는 사파리에서 <i />를 누르신 뒤,
              </span>{' '}
              <span>'홈 화면에 추가'를 누르시고</span>{' '}
              <span>맥의 사파리에서는 '파일' 메뉴 &gt; 'Dock에 추가'를 누르세요.</span>
            </p>
          </Apple>
        )}
      </div>
    </main>
  );
}