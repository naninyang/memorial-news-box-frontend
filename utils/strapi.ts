import { EbenumData, NaverItemsData, NoticeData, YouTubeItemData } from 'types';

const formatDate = (datetime: string) => {
  const date = new Date(datetime);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

export async function getYouTubeNewsData(start?: number, count?: number) {
  const response = await fetch(
    `${process.env.STRAPI_URL}/api/youtube-memorials?sort[0]=id:desc&pagination[page]=${start}&pagination[pageSize]=${count}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    },
  );
  const data = await response.json();
  const filesData = data.data;
  const rowsData: YouTubeItemData[] = filesData.map((data: any) => ({
    id: data.id,
    idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
    video_id: data.attributes.videoId,
    description: data.attributes.description,
    comment: data.attributes.comment,
    created: data.attributes.created,
    title: data.attributes.title,
  }));

  return rowsData;
}

export async function getNaverNewsData(start?: number, count?: number) {
  const response = await fetch(
    `${process.env.STRAPI_URL}/api/naver-memorials?sort[0]=id:desc&pagination[page]=${start}&pagination[pageSize]=${count}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    },
  );
  const data = await response.json();
  const filesData = data.data;
  const rowsData: NaverItemsData[] = filesData.map((data: any) => ({
    ida: `${data.id}`,
    idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
    title: data.attributes.title,
    description: data.attributes.description,
    thumbnail: data.attributes.thumbnail,
    created: data.attributes.created,
    oid: data.attributes.oid,
    aid: data.attributes.aid,
    entertainment: data.attributes.entertainment,
  }));

  const fullData = await Promise.all(
    rowsData.map(async (article) => {
      const url = `https://n.news.naver.com/article/${article.oid}/${article.aid}`;
      const newsMetaData = await fetchArticleMetadata(url);
      return {
        ...article,
        newsMetaData,
      };
    }),
  );

  return fullData;
}

export async function getEbenumData(start?: number, count?: number) {
  const response = await fetch(
    `${process.env.STRAPI_URL}/api/ebenum-nol2trs?sort[0]=id:desc&pagination[page]=${start}&pagination[pageSize]=${count}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    },
  );
  const ebenumResponse = await response.json();
  const filesData = ebenumResponse.data;
  const rowsData: EbenumData[] = filesData.map((data: any) => ({
    id: `${data.id}`,
    idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
    subject: data.attributes.subject,
    addr: data.attributes.addr,
    description: data.attributes.description,
  }));

  const fullData = await Promise.all(
    rowsData.map(async (preview) => {
      const ebenumMetaData = await fetchPreviewMetadata(preview.addr);
      return {
        ...preview,
        ebenumMetaData,
      };
    }),
  );

  return fullData;
}

export async function getEditorialData(start?: number, count?: number) {
  const response = await fetch(
    `${process.env.STRAPI_URL}/api/editorial-memorials?sort[0]=id:desc&pagination[page]=${start}&pagination[pageSize]=${count}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    },
  );
  const data = await response.json();
  const filesData = data.data;
  const rowsData: NaverItemsData[] = filesData.map((data: any) => ({
    ida: `${data.id}`,
    idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
    title: data.attributes.title,
    org: data.attributes.org,
    thumbnail: data.attributes.thumbnail,
    created: data.attributes.created,
    articleNumber: data.attributes.articleNumber,
  }));

  return rowsData;
}

export async function getNoticeData() {
  const response = await fetch(
    `${process.env.STRAPI_URL}/api/notice-nol2trs?sort[0]=id:desc&pagination[page]=1&pagination[pageSize]=100`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    },
  );
  const data = await response.json();
  const filesData = data.data;
  const rowsData: NoticeData[] = filesData.map((data: any) => ({
    id: data.id,
    idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
    platform: data.attributes.platform,
    subject: data.attributes.subject,
    description: data.attributes.description,
    created: data.attributes.created,
  }));

  return rowsData;
}

async function fetchArticleMetadata(url: string) {
  try {
    const response = await fetch(`https://naver-news-opengraph.vercel.app/api/og?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch article metadata', error);
    return {};
  }
}

async function fetchPreviewMetadata(url: string) {
  try {
    const response = await fetch(`${process.env.PREVIEW_API_URL}?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch article metadata', error);
    return {};
  }
}
