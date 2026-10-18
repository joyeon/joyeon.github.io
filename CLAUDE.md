# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

개인 블로그 **허송세월** (https://joyeon.co). Jekyll 정적 사이트이며, 테마 gem 없이 Pixyll 테마 파일을 레포에 직접 복사해 수정한 구조다. 콘텐츠는 저자 본인이 쓴 한국어 에세이다.

## 배포: `master` push = 즉시 운영 반영

- GitHub Pages **legacy build**, 소스는 `master` 브랜치 루트. CI, 스테이징, PR 리뷰 단계가 없으므로 push하면 바로 joyeon.co에 반영된다. **push는 사용자가 요청할 때만** 한다.
- 운영 빌드는 레포의 `Gemfile`/`Gemfile.lock`을 무시하고 GitHub Pages 자체의 `github-pages` gem(Jekyll **3.10.x**, safe mode)으로 빌드한다. 로컬 Gemfile도 같은 gem을 쓰므로 로컬 결과가 운영과 거의 같다. 그래도:
  - `_plugins/`의 커스텀 플러그인은 동작하지 않는다. GitHub Pages 허용 목록 밖의 플러그인을 추가하지 않는다.
  - Jekyll 4 전용 기능(예: `find` 필터, `number_of_words: "cjk"`)을 쓰지 않는다.
- github-pages는 front matter가 없는 `.md` 파일도 페이지로 렌더링한다 (`jekyll-optional-front-matter`). 루트에 문서 파일(README.md 등)을 새로 만들면 `joyeon.co/README.html`처럼 공개되므로, `_config.yml`의 `exclude`에 추가한다. `exclude`를 지정하면 기본 제외 목록을 덮어쓰기 때문에 `CNAME`, `Gemfile`, `Gemfile.lock`, `vendor`도 함께 적혀 있다. 지우지 않는다.
- 빌드가 실패하면 사이트는 이전 버전으로 유지된다. 운영 빌드 상태는 이렇게 확인한다:
  ```bash
  gh api repos/joyeon/joyeon.github.io/pages/builds/latest --jq '{status, error, commit}'
  ```
- `CNAME`(joyeon.co)은 수정하거나 삭제하지 않는다. 커스텀 도메인 연결이 끊긴다.

## 로컬 빌드

`Gemfile`은 `github-pages` gem(운영과 같은 Jekyll 3.10.0 + 플러그인)과 `webrick`(Ruby 3.0+에서 `jekyll serve`에 필요)만 쓴다. 환경은 Ruby 3.3.7(rbenv)과 Bundler 4.x이고, gem은 레포 안의 `vendor/bundle`에 설치된다 (`.bundle/config`, `vendor/`는 gitignore 되어 있음).

```bash
bundle install                                 # 최초 1회 (path 설정은 .bundle/config에 저장됨)
LC_ALL=en_US.UTF-8 bundle exec jekyll serve    # http://localhost:4000, 변경 시 자동 재빌드
LC_ALL=en_US.UTF-8 bundle exec jekyll build    # _site/ 생성만
```

- **`LC_ALL=en_US.UTF-8`은 필수다.** 없으면 github-pages가 기본으로 끼워 넣는 primer 테마 SCSS에서 `Invalid US-ASCII character "\xE2"` 에러가 나며 빌드가 실패한다. Claude의 Bash 환경에는 `LANG`이 비어 있다.
- 새 clone이나 다른 머신에서는 `bundle config set --local path vendor/bundle`을 먼저 실행한다.
- `pygments` deprecation 경고, Ruby 3.4 default gem 관련 warning, `faraday-retry` 안내는 무시해도 된다.
- 테스트와 린트는 없다. 검증은 "빌드 성공 + `_site/` 결과물 확인"으로 한다 (예: `_site/YYYY/MM/DD/slug.html` 생성 여부, `_site/index.html`에 포스트 5개).
- github-pages 버전 갱신은 `bundle update github-pages`로 한다. 다른 gem을 Gemfile에 추가하지 않는다 (운영에서는 무시된다).

## 구조 (여러 파일을 봐야 보이는 것들)

- **레이아웃 체인**: `post.html`, `page.html` → `default.html`. `default.html`이 `<head>` 전체(meta, OG/Twitter 태그, CSS, Google Fonts)와 헤더(사이트 제목, 설명, `navigation.html`), `footer.html`(GA 스크립트 포함)을 인라인으로 갖고 있다. `_includes/head.html`, `header.html`은 빈 파일로 쓰이지 않는다.
- **`center.html`은 `default.html`을 상속하지 않는** 별도의 전체 HTML 셸이다 (404 전용). head나 헤더를 고칠 때는 두 파일을 모두 확인한다.
- **뉴스레터 폼**: `_includes/newsletter-inline.html`(EmailOctopus, `eomail5.com` 스크립트)은 `post.html` 하단과 `index.html`에 자동으로 들어간다. 포스트 본문에 직접 넣지 않는다.
- **홈 / 페이지네이션**: `index.html` + `jekyll-paginate`(`paginate: 5`)로 `/page2/`, `/page3/`…가 만들어진다. jekyll-paginate는 루트 `index.html`에서만 동작하므로 홈 파일을 옮기지 않는다. 목록에는 날짜, 제목, `post.summary`가 나온다. `excerpt_separator: ""`로 자동 발췌가 꺼져 있고 현재 `summary`를 가진 포스트가 없어서 실제로는 제목만 보인다. 포스트에 `summary:`를 넣으면 목록과 `<meta name="description">`에 쓰인다.
- **상단 메뉴**: `_includes/navigation.html`에 링크가 하드코딩되어 있다 (About, 봄동). 독립 페이지(`layout: page` + `permalink: /slug/`, 예: `spring-club.md`)를 추가하면 여기에 직접 링크를 넣어야 한다.
- **RSS**: `feed.xml`은 직접 작성한 템플릿이다 (최근 10개, 본문 전체). `jekyll-feed`는 github-pages에 포함되어 있지만 `_config.yml`의 `plugins:`에 없어서 비활성이다. 켜면 `feed.xml`과 충돌한다.
- **CSS**: Sass 없이 순수 CSS다. `css/pixyll.css`는 테마 원본이다. 이 블로그의 커스텀 스타일(뉴스레터 폼, `.site-title`/`.site-description`, 본문 Lato 400)은 `css/basscss.css` **맨 아래**에 추가되어 있다. `solarized-light.css`는 어디에도 링크되어 있지 않다.

## 포스트 작성 규칙

- 파일명은 `_posts/YYYY-MM-DD-영문-slug.md`. permalink 설정이 없으므로 URL은 `/YYYY/MM/DD/slug.html`이다 (예: `https://joyeon.co/2026/01/07/from-hanoi.html`).
- **발행된 포스트의 파일명(날짜, slug)은 바꾸지 않는다.** URL이 바뀌면 뉴스레터, 글 사이 링크, 외부 공유 링크가 깨진다.
- front matter는 `layout: post`와 `title:` 두 개만 쓴다. 날짜는 파일명에서 가져오고, categories와 tags는 쓰지 않는다.
- github-pages는 `future: true`가 기본값이라 **미래 날짜의 포스트도 push하면 바로 공개된다.** 예약 발행은 되지 않는다. 아직 공개하면 안 되는 초안은 커밋하지 않거나 `_drafts/`에 둔다 (`_drafts/`는 빌드에 포함되지 않음).
- 2025-12-31 「블로그 다시 다시 시작 : 허송세월」 이후의 연재 글은 제목 앞에 두 자리 번호를 붙인다: `title:  "05: 딸깍하는 소리 대신"`. 새 연재 글은 `ls _posts`로 마지막 번호를 확인하고 +1 한다.
- 최근 글의 공통 구조는 다음과 같다:
  ```markdown
  (본문: 평서체 '~다' 에세이)

  <br />

  ---

  <br />
  (독자에게 존댓말로 짧은 후기 한두 문단)

  글을 읽고 감상이나 나누고 싶은 얘기가 있다면 joyeon@gmail.com 으로 보내주세요.
  ```
- **이미지**: 파일은 `assets/`(최근에는 `assets/images/`)에 둔다. 본문에서는 절대 URL과 인라인 스타일로 넣는다:
  ```html
  <img src="https://joyeon.co/assets/images/파일.jpg" style="width: 400px; max-width:100%; height:auto;">
  ```
  - 절대 URL이라서 새 이미지는 push 전까지 로컬 미리보기에서 깨져 보인다 (정상). 로컬에서 확인하려면 예전 글처럼 `{{ site.url }}/assets/...`를 쓰면 된다. `jekyll serve`에서는 localhost로 치환된다.
  - 원본 사진이 그대로 올라간 경우가 있다 (`IMG_9161.jpeg` 4.9MB, `udon-donkatsu.jpg` 2.1MB). 새 이미지를 추가할 때는 파일 크기를 알리고, 리사이즈할지 묻는다 (예: `sips -Z 1600 파일.jpg`).
- 글 사이 링크도 절대 URL로 쓴다.
- 마크다운은 kramdown이다. 문단 안 줄바꿈은 줄 끝 공백 두 칸(`about.md` 참고), 세로 여백은 `<br />`로 준다.

## 글 편집 가드레일

- 모든 글은 저자 본인의 글이다. **요청받은 범위만 고친다.** 오탈자 수정 요청이면 오탈자만 고치고, 윤문 요청이 없으면 문장 다듬기, 어순 변경, 표현 교체를 하지 않는다.
- 문체를 유지한다: 본문은 평서체, 후기는 존댓말이다. `ㅎㅎㅎ`, `:)`, 이모지, 괄호 속 여담, 제목의 띄어쓰기(예: `"3년  6개월 동안의  여름"`)는 의도된 것일 수 있으니 임의로 정리하지 않는다.
- 명시적으로 초안을 요청받지 않는 한 글의 본문을 대신 쓰지 않는다.

## Git

- `master`에 직접 커밋하는 단일 브랜치로 운영한다 (GitHub 웹 에디터로 커밋하는 경우도 많다). 커밋 메시지는 짧은 영어 문장이다. 예: `Adjust image sizes in new office blog post`, `new post: 05`.
- 커밋 전에 가능하면 로컬 빌드로 검증한다. push는 곧 배포이므로 요청이 있을 때만 한다.

## 알려진 이슈 (요청 없이 고치지 않는다)

- `_config.yml`의 `pygments: true`는 deprecated다 (경고만 나고 동작에는 지장 없음).
- `google_analytics: UA-…`는 2023년에 종료된 Universal Analytics라 실제로는 수집되지 않는다.
- `default.html`: `og:url`이 빈 값인 `site.baseurl`을 쓰고, `og:image`는 상대 경로이며, `twitter:card`에 이미지 경로가 들어가 있다.
- `center.html`은 Google Fonts를 `http://`로 불러온다. footer의 저작권 연도는 `2022©`로 하드코딩되어 있다.
- `assets/hanoi.jpeg`는 2바이트짜리 빈 파일이고, `assets/test.html`은 용도를 알 수 없는 OG 테스트 파일이다.
