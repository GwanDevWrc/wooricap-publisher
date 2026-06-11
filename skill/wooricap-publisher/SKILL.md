---
name: wooricap-publisher
description: 우리캐피탈 사이트(wooricap.com)의 새 화면을 기존 디자인 시스템에 맞춰 단일 HTML 파일로 퍼블리싱한다. 사용자가 캡쳐 이미지나 텍스트 기획안으로 새 화면을 요청할 때 사용한다. "우리캐피탈 화면 만들어줘", "이 캡쳐대로 퍼블리싱해줘", "우리캐피탈 디자인으로 로그인 화면 만들어줘", "wooricap 스타일로 폼 화면 만들어줘" 같은 요청에서 트리거된다. 기존 사이트의 CSS, JS, 폰트를 그대로 활용해 일관된 결과를 만든다. 자원 업데이트가 필요할 때도 사용한다("우리캐피탈 정적 자원 업데이트해줘").
---

# 우리캐피탈 퍼블리셔

우리캐피탈 사이트(wooricap.com)의 디자인 시스템에 맞춘 새 화면을 단일 HTML 파일로 퍼블리싱한다. 입력은 두 가지 중 하나(또는 조합):

1. **이미지 첨부** — 화면 시안, 손그림, 다른 사이트 캡쳐, 와이어프레임
2. **텍스트 설명** — 자연어 기획안 ("로그인 화면 만들어줘, 아이디/비번/로그인 버튼 + 회원가입 링크")

출력은 항상 **단일 HTML 파일** (인라인 스타일/스크립트가 아니라, 스킬에 포함된 CSS/JS를 `<link>`/`<script>` 태그로 참조). 결과 파일은 사용자가 지정한 위치 또는 현재 작업 폴더에 저장된다.

## 작업 시작 전 반드시 할 일

새 화면 퍼블리싱 요청이 들어오면 **무조건 먼저 다음 두 파일을 읽는다**:

1. `${CLAUDE_SKILL_DIR}/references/design-system-notes.md` — 디자인 시스템 분석 (변수, 클래스, 컴포넌트 패턴)
2. 사용자가 첨부한 시안 이미지가 있으면 모두

이 두 가지 없이 작업을 시작하면 가짜 클래스명을 지어내거나 디자인이 어긋난다. 반드시 먼저 읽는다.

추가로, 사용자의 요청 내용이 어떤 화면 도메인인지에 따라 관련 CSS 파일도 직접 열어서 가용 클래스를 확인한다:

- 메인/홈 화면 → `assets/css/style-main.css`
- 인증/로그인/마이페이지/고객센터 → `assets/css/style-cst.css`
- 금융상품 신청/입력 폼 → `assets/css/style-fin.css`, `assets/css/style-product.css`
- 일반 컨텐츠 → `assets/css/style-contents.css`
- 모든 화면 공통 → `assets/css/jb-common.css` (변수, 버튼, 입력, 유틸리티 클래스 정의)

CSS 파일이 크므로 (`jb-common.css`는 2,400줄) 처음에는 `view`로 1-200줄 정도 훑고, 필요한 키워드만 `grep`으로 찾는 방식이 효율적이다.

## 퍼블리싱 작업 절차

### 1단계: 화면 분석

시안 이미지나 설명을 보고 다음을 파악한다:

- **화면 종류**: 메인, 입력 폼, 안내, 결과/완료, 리스트, 상세, 팝업/모달
- **레이아웃 구성**: 헤더 형태(메인 헤더 / 뒤로가기 sub-header / 헤더 없음), 진행률 표시 여부, 하단 고정 버튼 여부
- **포함 컴포넌트**: 입력 필드, 버튼(메인 CTA / 보조 / 텍스트), 카드, 리스트, 슬라이더, 아코디언, 뱃지 등
- **텍스트 내용**: 화면 제목, 본문, 라벨, 버튼 라벨 — 그대로 추출

이미지가 있을 경우, **반드시 이미지를 보고** 확인한다 — 색상, 라운드 정도, 간격, 폰트 굵기를 임의로 지어내지 않는다. `references/01-main.png` ~ `04-guide-page.png`에는 실제 우리캐피탈 화면 4종이 있어서, 사용자 시안이 이중 어떤 패턴과 가까운지 비교 가능하다.

### 2단계: 자원 선택

`references/design-system-notes.md`의 "화면별 권장 CSS 조합" 표를 기준으로:

- **기본 (95% 이상의 화면)**: `jb-common.css` + `jb-style.css`
- **메인 화면일 때만 추가**: `style-main.css`
- **JS는 항상 다음 8개 순서대로**:
  1. `js/jquery/jquery-3.6.1.min.js`
  2. `js/jquery/jquery.tmpl.js`
  3. `js/cmm/js.cookie.min.js`
  4. `js/cmm/jbwrcUtil.js`
  5. `js/cmm/jbwrcFnc.js`
  6. `js/cmm/jbwrcEvent.js`
  7. `js/ui/jb-layout.js`
  8. `js/ui/jb-ui.js`
- **선택**: 폼 입력 화면이면 `js/inputmask/jquery.inputmask.js`, 약관 화면이면 `js/cmm/common_stpl.js` 등

### 3단계: HTML 작성

#### 자원 경로 규칙

**기본 가정**: 결과 HTML 파일은 사용자의 프로젝트 폴더에 만들어지고, 자원은 우리캐피탈 운영 사이트의 절대 URL(`https://www.wooricap.com/assets/...`)을 그대로 참조한다.

```html
<link rel="stylesheet" href="https://www.wooricap.com/assets/css/jb-common.css">
<link rel="stylesheet" href="https://www.wooricap.com/assets/css/jb-style.css">
<script src="https://www.wooricap.com/assets/js/jquery/jquery-3.6.1.min.js"></script>
<!-- ... -->
```

이 방식의 장점:
- 사용자는 단일 HTML 파일만 받으면 즉시 브라우저에서 열어볼 수 있다
- 우리캐피탈 사이트의 자원이 업데이트되면 자동으로 반영
- 누락된 아이콘(`/assets/img/icon/...`)도 절대 URL로 자동 해결

**대안 (사용자가 명시적으로 요청할 때만)**: 로컬 자원 참조 — `<link rel="stylesheet" href="./skill-assets/css/jb-common.css">` 같은 상대 경로. 이 경우 스킬의 `assets/` 폴더를 결과물 옆으로 복사해야 한다. 사용자가 "오프라인에서도 쓸 수 있게 해줘", "자원 같이 묶어줘"라고 할 때 이렇게 한다.

#### 기본 HTML 구조 템플릿

```html
<!doctype html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <title>화면 제목</title>
  <link rel="stylesheet" href="https://www.wooricap.com/assets/css/jb-common.css">
  <link rel="stylesheet" href="https://www.wooricap.com/assets/css/jb-style.css">
</head>
<body>
  <div class="wrapper">
    <header id="header">
      <div class="mobile sub-header">
        <button class="btn-back" type="button" aria-label="뒤로가기"></button>
        <h1 class="title-show">화면 제목</h1>
      </div>
    </header>
    <main id="main">
      <div class="contents-wrap">
        <!-- 본문 -->
      </div>
    </main>
  </div>
  <script src="https://www.wooricap.com/assets/js/jquery/jquery-3.6.1.min.js"></script>
  <script src="https://www.wooricap.com/assets/js/jquery/jquery.tmpl.js"></script>
  <script src="https://www.wooricap.com/assets/js/cmm/js.cookie.min.js"></script>
  <script src="https://www.wooricap.com/assets/js/cmm/jbwrcUtil.js"></script>
  <script src="https://www.wooricap.com/assets/js/cmm/jbwrcFnc.js"></script>
  <script src="https://www.wooricap.com/assets/js/cmm/jbwrcEvent.js"></script>
  <script src="https://www.wooricap.com/assets/js/ui/jb-layout.js"></script>
  <script src="https://www.wooricap.com/assets/js/ui/jb-ui.js"></script>
</body>
</html>
```

#### 화면 종류별 출발점

**입력 폼 화면** — `references/02-input-form-1.png`, `03-input-form-2.png` 패턴:

```html
<header id="header">
  <div class="mobile sub-header">
    <button class="btn-back" type="button" aria-label="뒤로가기"></button>
  </div>
</header>
<main id="main">
  <div class="contents-wrap">
    <p class="step-info"><span class="fc-blue">2/5</span> 대출신청서 작성 ></p>
    <h2 class="l-tit">대출신청금액을<br>입력해주세요</h2>
    <div class="input-con">
      <div class="input-box">
        <label class="input-label">대출신청금액</label>
        <input type="text" class="input-default" placeholder="0">
      </div>
    </div>
    <div class="line-box-wrap">
      <!-- 안내 박스 -->
    </div>
  </div>
  <div class="btn-fixed-bottom btn-wrap">
    <button class="btn-lg btn-primary">다음</button>
  </div>
</main>
```

**메인 화면** — `references/01-main.png` 패턴:

```html
<header id="header">
  <div class="mobile main-header">
    <h1 class="main-logo">우리캐피탈</h1>
    <!-- 우측 아이콘들 -->
  </div>
</header>
<main id="main">
  <div class="appdown-banner">앱으로 편리하게 알아보고 관리하세요!</div>
  <section class="greeting">
    <p class="m-tit">로그인 후,<br>다양한 혜택을 확인하세요!</p>
    <button class="btn-md btn-line-blue">로그인</button>
  </section>
  <section class="main-slider"><!-- swiper-bundle.min.css 활용 --></section>
  <section class="popular-products">
    <h2 class="m-tit">인기상품</h2>
    <ul class="product-list"><!-- 카드 리스트 --></ul>
  </section>
  <nav class="bottom-tab"><!-- 5개 탭 --></nav>
</main>
```

**안내/설명 화면** — `references/04-guide-page.png` 패턴: 입력 폼과 유사하지만 `<input>` 대신 본문 + 아코디언.

#### 컨벤션 준수 사항

1. **클래스는 항상 기존 시스템에서 가져온다.** 없는 클래스를 지어내지 않는다. 필요한 게 없으면 인접한 기존 클래스를 조합하거나, 사용자에게 묻는다.
2. **인라인 스타일을 가급적 피한다.** 부득이한 경우(시안에만 있는 색상 같은) 짧게 사용하되 주석 추가.
3. **rem 단위를 사용한다.** `1rem = 10px`. 10px → `1rem`, 16px → `1.6rem`, 24px → `2.4rem`.
4. **색상은 CSS 변수로**: `var(--primaryBlue)`, `var(--primaryBlack)` 등.
5. **Pretendard 폰트가 자동 적용**되므로 `font-family` 직접 지정하지 않는다.
6. **이미지/아이콘은 `/assets/img/icon/...` 절대 경로**로 둔다. 우리는 이미지를 가지고 있지 않지만, 결과 HTML이 우리캐피탈 도메인 자원을 참조하므로 운영 환경에서는 자동 로드된다.

### 4단계: 결과물 생성과 전달

1. 작업 폴더(현재 `cwd`)에 HTML 파일을 만든다.
   - 파일명: 화면 성격에 맞게 (예: `login.html`, `loan-application-step2.html`, `main.html`).
   - 사용자가 파일명을 지정하면 그것을 따른다.
2. 짧은 요약을 출력한다:
   - 어떤 CSS/JS를 포함했는지
   - 사용한 주요 컴포넌트 (클래스명 기준)
   - 시안과 다른 부분이 있다면 이유와 함께 (예: "시안의 보라색 뱃지는 디자인 시스템에 없어서 `.fc-blue`로 대체했습니다")
3. 브라우저에서 바로 열어볼 수 있다는 안내.

## 자원 업데이트 작업

사용자가 "우리캐피탈 정적 자원 업데이트해줘", "스킬 자원 갱신", "최신 css 받아와" 같은 요청을 하면:

```bash
python "${CLAUDE_SKILL_DIR}/scripts/update_assets.py"
```

옵션:
- `--check` : 다운로드 없이 어떤 파일이 신규/변경 대상인지만 확인
- `--force` : 변경 여부와 무관하게 전체 재다운로드

스크립트 실행 후, 변경된 파일이 있으면 사용자에게 다음을 안내한다:

1. 변경된 파일 목록 (요약)
2. **디자인 시스템 노트 갱신 검토** — 만약 `jb-common.css`나 `jb-font.css` 같은 핵심 파일이 변경되었다면, `references/design-system-notes.md`도 함께 업데이트가 필요할 수 있다고 안내. 사용자가 원하면 변경된 부분을 분석해서 노트를 갱신한다.
3. **Git으로 관리 중인 경우** — 변경 사항을 commit/push하라고 안내 (다른 PC에 동기화).

## 멀티 PC 운영 안내

사용자가 여러 PC에서 이 스킬을 사용한다면:

- **스킬 자체**: `~/.claude/skills/wooricap-publisher/`를 Git 저장소로 관리. 한 PC에서 자원 업데이트 후 push, 다른 PC에서 pull.
- **작업 결과물**: 각 작업 프로젝트는 별도 Git 저장소로 관리하고, 사용자가 원하는 위치에 clone (스킬과 무관).

## 알려진 제약

- **이미지/아이콘 자원이 스킬에 포함되지 않음**: CSS/JS만 다운로드되어 있다. 결과 HTML이 절대 URL(`https://www.wooricap.com/assets/img/...`)로 이미지를 참조하므로 인터넷 연결 시 정상 작동하지만, 오프라인에서는 깨진다.
- **`hgg` 600/800, `spq` 폰트 미보유**: `jb-font.css`에 선언되어 있으나 실제 woff2 파일이 없다. 사용 시 Pretendard로 fallback.
- **운영 사이트 자원 변경 추적**: `update_assets.py`로 변경을 감지할 수 있지만, 변경 내용이 디자인 시스템 자체를 바꾼 경우 `design-system-notes.md` 수동 갱신 필요.

## 예시 트리거

이런 요청들이 들어오면 이 스킬이 동작해야 한다:

- "우리캐피탈 로그인 화면 만들어줘"
- "이 캡쳐대로 퍼블리싱해줘 [이미지 첨부]"
- "wooricap 스타일로 대출 신청 1단계 화면 만들어줘"
- "우리캐피탈 메인 페이지 시안 보고 HTML 만들어줘"
- "기획안 대로 우리캐피탈 안내 페이지 짜줘"
- "우리캐피탈 정적 자원 최신화"
- "스킬에 있는 CSS 업데이트해줘"
