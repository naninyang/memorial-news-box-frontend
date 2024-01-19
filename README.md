# 기억뉴스상자 memorial.newsbox

기억해야 할 뉴스를 모아서 보여주는 서비스입니다.

긴 뉴스 기사를 주로 가져옵니다.

짧은 뉴스 기사 서비스는 `숏뷰뉴스`를 이용하세요.

- 숏뷰뉴스 저장소: https://github.com/naninyang/short-view-news-frontend
- 숏뷰뉴스 서비스: https://shorts.dev1stud.io

## 사용된 주요 기술

### Frontend

- Next.js
- react-device-detect
- react-modal w/ Route As Modal
- TypeScript
- Emotion
- SASS
- Google YouTube iframe API
- Masonry w/ Masonic
- Perfect Scrollbar
- pull-to-refresh (without Mutate Caching)
- PWA
- SWR w/ useSWRInfinite
- Notion Client
- Strapi API
- API: Fetch, Axios 혼용
- Node 18
- vercel deployment

### Web Opengraph Scrap API Server

- Next.js
- TypeScript
- iconv
- cheerio
- vercel deployment

### Backend

- AWS EC2
- GCP (Compute Engine, Cloud DNS, Networking)
- Nginx
- PM2
- MariaDB
- Node 20 with fnm
- Strapi

## Troubleshooting

이슈를 등록해 주시거나 [여기](https://memorial.dev1stud.io/contact-us)를 이용해 주세요.

### 발견되거나 알려진 버그

- 첫 댓글 등록시 등록한 댓글 자동으로 확인 불가 (이미 댓글이 1개라도 있을 때는 정상 동작)
  - 저장은 잘 됨

## TO-DO

- 데이터 불러올 때 텍스트가 세로 가운데 정렬이 안되는 현상 해결 (최소 세로폭 설정 문제)
  - iOS, iPadOS 의 안전 공간 계산 문제로 복잡함
- YouTube에서 영상이 내려간 경우 (삭제/비공개 전환) 자동으로 해당 article 걸러내기
  - 의외로 삭제하거나 비공개로 전환되는 유튜브 영상 기사가 꽤 발생함
- NAVER 뉴스에서 기사가 언론사 요청으로 삭제된 경우 자동으로 해당 article 걸러내기
  - YouTube 영상 기사보다는 삭제되는 경향이 드물지만 없는 건 아님

## Supported PWA App. Download

PWA 형태의 앱 다운로드를 지원합니다.

Google Chrome에서는 메뉴에 다운로드 링크가 있으며, Safari에서는 메인 화면에 내려받는 방법이 안내되어 있습니다.

MS Windows, Apple macOS, Android, iOS, iPadOS 등 대부분의 모던 디바이스를 지원합니다.

## 광고제안

### 광고 집행 영역

- 유튜브 영역에 광고를 원할 경우 유튜브에 업로드 된 영상이 있어야 하고, 홍보하고 싶은 아이템이 웹사이트 혹은 앱 스토어라면 링크가 추가로 있어야 합니다. (링크만 있으면 어떤 것이든 가능)
- 네이버 영역에 광고를 원할 경우 네이버 뉴스에서 광고 집행하고 싶은 아이템에 대한 홍보 기사가 있어야 합니다. 홍보 썸네일과 홍보하고자 하는 아이템의 링크값이 있어야 합니다. (링크만 있으면 어떤 것이든 가능)

### 광고 집행 주의사항

- 19금 아이템은 반려됩니다. (폭력적이거나 잔인한 유튜브 영상은 뉴스 기사 역시 가져오고 있지 않습니다.)
- 의약품, 건강기능식품, 화장품 광고는 반려됩니다.
- 앱 광고도 받습니다.

## 안내사항

### YouTube

각 기사의 제목은 YouTube 영상의 제목에서 직접 가져오며, 기사 내용은 '더보기'란을 참조하거나 자막/캡션 참조 또는 큐레이터 본인이 직접 뉴스를 듣고 일부를 발췌하여 작성됩니다.

### NAVER

네이버의 기사 내용이나 이미지는 cheerio를 사용하여 Meta 태그의 Opengraph 내용만 스크랩하여 가져옵니다.

또한 cheerio를 사용하여 가져온 데이터는 어떠한 데이터베이스로도 저장되지 않습니다. 모든 데이터는 캐싱이 되지만 서버에 저장되지 않고 사용자의 웹브라우저 또는 앱의 쿠키 및 로컬스토리지 한정하여 저장됩니다.

### 만평

다음의 뉴스 웹사이트 기준으로 만평을 가져옵니다.

- 한겨례신문
- 경향신문
- 오마이뉴스
- 비건뉴스
- 민중의소리

모든 데이터는 수동으로 가져오고, 큐레이터의 의견은 들어가지 않습니다.

만평 이미지를 직접 기억뉴스상자 서버에 저장 후 가져오기 때문에 만평이 원 링크에서 삭제가 됐을 시에도 사라지지 않습니다.

UX는 NAVER의 링크 미리보기 UX와 동일합니다.

## 주의사항 및 저작권

이 서비스는 Vercel, Google 그리고 NAVER와 관련이 없습니다.

큐레이터 본인의 생각이 들어간 부분은 언론사의 의견 또는 입장과 많이 다를 수 있으며, 큐레이터 본인의 생각은 큐레이터 개인의 의견일 뿐입니다.

뉴스 콘텐츠에 대한 저작권은 각 언론사에 있습니다.
