# 우리캐피탈 디자인 시스템 분석 노트

이 문서는 `assets/css/`, `assets/js/`의 실제 코드를 분석한 결과를 요약한 것이다. 새 화면을 만들 때 이 패턴을 따른다.

## 1. CSS 파일 구성과 import 순서

`jb-style.css`가 도메인별 CSS의 통합 진입점이며, 다음을 import 한다:

```css
@import "style-product.css"; /* 서브메인(금융상품,내금융관리,고객센터), 금융상품 */
@import "style-cst.css";     /* 인증,로그인,금융소비자보호,고객센터,설정,내정보관리,원클릭신청,회사소개 */
@import "style-fin.css";     /* 금융상품,내금융관리,영업지원,랜딩 */
@import "style-contents.css"; /* asis유지 css */
```

`jb-common.css`는 base 시스템(reset, font, layout, swiper, datepicker import)이며 모든 페이지에 필수.

### 화면별 권장 CSS 조합

| 화면 종류 | 필수 CSS | 추가 CSS |
|----------|----------|----------|
| **메인** | `jb-common.css`, `jb-style.css` | `style-main.css` (메인에서만 사용) |
| **금융상품/서브메인** | `jb-common.css`, `jb-style.css` | (style-product가 jb-style에 포함됨) |
| **인증/로그인/고객센터/설정** | `jb-common.css`, `jb-style.css` | (style-cst가 jb-style에 포함됨) |
| **상품 신청/입력 폼** | `jb-common.css`, `jb-style.css` | (style-fin이 jb-style에 포함됨) |
| **공통** | `jb-common.css` 만으로도 기본 컴포넌트 사용 가능 | |

기본 전략: **`jb-common.css` + `jb-style.css`**를 항상 포함, 메인 화면일 때만 `style-main.css` 추가.

## 2. CSS 변수 (color tokens)

`jb-common.css :root`에 정의:

```css
--primaryBlack: #212529;  /* 본문 텍스트 */
--primaryWhite: #FFF;
--primaryBlue:  #0565F0;  /* 핵심 브랜드 컬러 */
--primaryRed:   #E5493A;  /* 에러/경고 */

--defaultBtnTxt: #464A4D;  /* line형 버튼 텍스트 */
--subTxt:        #767676;  /* 서브 텍스트 (접근성) */
--formTxt:       #D9D9D9;  /* label, placeholder */
--borderColor:   #E6E6E6;  /* line color */
```

자주 쓰이는 보조 색상(CSS 안에 직접 헥스로 등장):
- `#F2F5F7` — 매우 연한 회색 배경 (secondary 버튼, footer 등)
- `#F5F7FA` — 약간 다른 연한 회색 배경
- `#F1F1F1` — 매우 연한 회색 보더
- `#DFE7EC` — disabled 버튼 배경
- `#B0CCF6` — disabled 라이트 블루
- `#D1D1D1` — disabled 회색

## 3. rem 단위 시스템

`html { font-size: 10px; }` 이므로 **1rem = 10px** 환산.
태블릿(768~1200px)에서는 `html.mb-layout` 클래스에 한해 `font-size: 12px`로 확대.

| rem | px |
|-----|-----|
| 0.8rem | 8px |
| 1.2rem | 12px |
| 1.4rem | 14px (기본 폰트 사이즈) |
| 1.6rem | 16px |
| 2.0rem | 20px |
| 2.4rem | 24px |
| 6.0rem | 60px (모바일 헤더 높이) |
| 9.0rem | 90px (PC 헤더 높이) |
| 144rem | 1440px (PC 컨테이너 max-width) |

## 4. Typography

기본 글꼴: `"Pretendard", -apple-system, helvetica, "Apple SD Gothic Neo", sans-serif`
기본 본문: `font-size: 1.4rem; font-weight: 400; line-height: 2.2rem;`

### 텍스트 클래스 체계

```
.l-tit          26px / 32px / 600  (대제목)
.m-tit, .h2-type  19px / 26px / 700  (중제목)
.s-tit, .l-txt, .fz-xl  18px / 24px / 600  (소제목, 강조 본문)
.xs-tit, .m-txt, .fz-l  17px / 22px / 600  (h5, btn-lg)
.s-txt, .fz-m   15px / 22px / 600  (h6)
.d-txt, .fz-s   14px / 22px / 400  (기본 본문)
.xs-txt, .caption, .desc, .fz-xs  11px / 20px / 500  (라벨, 뱃지)
```

### 폰트 컬러 클래스

```
.fc-blue   → var(--primaryBlue)
.fc-red    → var(--primaryRed)
.fc-aaa    → var(--subTxt)
.fc-black  → #000
```

## 5. Layout 시스템

### 기본 페이지 구조

```html
<body>
  <div class="wrapper">
    <header id="header">
      <div class="mobile sub-header">
        <button class="btn-back"></button>
        <h1>화면 제목</h1>
      </div>
    </header>
    <main id="main">
      <!-- 컨텐츠 -->
    </main>
    <footer id="footer">...</footer>
  </div>
</body>
```

### 모바일/PC 분기 클래스

- `.mo`, `.mo-only`, `.mobile`, `.only_mo` — 모바일 전용 (PC에서 `display:none`)
- `.pc`, `.pc-only` — PC 전용
- `.submain-ui` — 서브메인 페이지 (헤더 색상 분기)
- `.finish-ui` — 완료 페이지

### 모바일 헤더 패턴

```html
<header id="header">
  <div class="mobile sub-header">
    <button class="btn-back" aria-label="뒤로가기"></button>
    <h1 class="title-show">화면 제목</h1>
    <button class="btn-menu"></button>
    <!-- btn-back, btn-push, btn-menu, btn-setting, btn-chatbot, btn-txt -->
  </div>
</header>
```

## 6. 핵심 컴포넌트

### 버튼

**사이즈**:
- `.btn-lg` — 큰 버튼 (1.4rem padding, 1.2rem 라운드, 1.7rem font, 600 weight). 화면 하단 메인 CTA.
- `.btn-md` — 보통 (3.6rem 높이, 0.4rem 라운드, 1.4rem font)
- `.btn-sm` — 작은 (2.4rem 높이, 0.4rem 라운드, 1.3rem font)

**스타일**:
- `.btn-primary` — 파란 배경 + 흰 글자 (`.disabled`는 `#DFE7EC` 배경)
- `.btn-secondary` — 연회색 `#F2F5F7` 배경 + 검정 글자
- `.btn-bgcolorN` — 투명 배경 + 검정 글자
- `.btn-line` / `.btn-line-blue` — 파란 보더 + 파란 글자
- `.btn-line-gray` — 회색 보더
- `.btn-blue` — 연회색 배경 + 파란 글자

**조합 예시**:
- 화면 하단 메인 액션: `<button class="btn-lg btn-primary">확인</button>`
- 보조 액션: `<button class="btn-lg btn-line-blue">자세히 보기</button>`

**텍스트 버튼**:
- `.btn-txt.btn-txt-blue` — 파란 텍스트 + 우측 화살표
- `.btn-txt.btn-txt-gray` — 회색 텍스트 + 우측 화살표
- `.btn-txt.btn-txt-refresh` — 새로고침 아이콘 + 텍스트
- `.btn-txt.btn-txt-call` — 전화 아이콘 + 텍스트

**버튼 그룹**:
```html
<div class="btn-wrap">
  <button class="btn-lg btn-secondary">취소</button>
  <button class="btn-lg btn-primary">확인</button>
</div>
<!-- col2: 세로 배치, double-area: 패딩 추가 -->
```

### 입력

```html
<div class="input-con">
  <div class="input-box">
    <label class="input-label">대출신청금액</label>
    <input type="text" class="input-default" placeholder="0">
  </div>
</div>
```

- `.input-box::after` — 포커스 시 하단 바가 늘어나는 애니메이션 (`var(--primaryBlue)`)
- `.input-box.type-error::after` — 빨간 바
- `.input-con.focus :not(.type-error) .input-label` — 포커스 시 라벨 색 변경

### 카드

- `.line-box-wrap` — `padding: 2.4rem 2rem; border: 0.2rem solid #F1F1F1; border-radius: 1.2rem; background: var(--primaryWhite);` (안내 박스, 정보 카드용)

## 7. 자주 쓰는 유틸리티 클래스

### Flex
- `.hbox` (가로) / `.vbox` (세로)
- `.cc` (가운데/가운데), `.sc` (시작/가운데), `.jc` (양끝/가운데), `.je` (양끝/끝)
- `.flex1`, `.flex2` … `.flex6`
- `.flex1>*` — 자식들이 동일 flex

### 정렬
- `.ta-l`, `.ta-c`, `.ta-r` — text-align
- `.va-t`, `.va-m`, `.va-b` — vertical-align

### 간격 (margin/padding)
CSS 어딘가에 `.mt8`, `.mt16`, `.mt24`, `.mt32`, `.pt8`, `.pb16` 같은 패턴이 있음. `jb-common.css` 검색 필요. 실무에서 자주 등장하는 값: 8, 12, 16, 20, 24, 32, 40, 48, 56, 80.

## 8. 폰트 패밀리

`jb-font.css`에서 선언된 폰트:

| 패밀리 | 사용처 | 자원 보유 여부 |
|-------|-------|--------------|
| `Pretendard` 400/500/600/700/800 | 본문 전체 | ✅ 모두 보유 |
| `hgg` (HGGGothicssi) 200 | main, 메뉴 영역 | ⚠️ 200만 보유 (600/800은 없음) |
| `hgg` 600/800 | 강조 메뉴 | ❌ 없음 (선언만 있음) |
| `spq` (SpoqaHanSansNeo) 400/700 | 브라보코리아 브릿지 | ❌ 없음 |

**주의**: 새 화면에서 `hgg` 600/800이나 `spq`를 쓰는 시안이 오면 사용자에게 알려야 한다. fallback은 자동으로 Pretendard로 떨어짐.

## 9. JavaScript 의존성

### 필수 로드 (모든 화면)

순서가 중요:
1. `js/jquery/jquery-3.6.1.min.js` — jQuery 본체
2. `js/jquery/jquery.tmpl.js` — jQuery 템플릿
3. `js/cmm/js.cookie.min.js` — 쿠키 헬퍼
4. `js/cmm/jbwrcUtil.js` — 우리캐피탈 유틸
5. `js/cmm/jbwrcFnc.js` — 공통 함수
6. `js/cmm/jbwrcEvent.js` — 이벤트 헬퍼
7. `js/ui/jb-layout.js` — 레이아웃 동작 (헤더 스크롤 등)
8. `js/ui/jb-ui.js` — UI 컴포넌트 (탭, 모달 등)

### 선택적 로드

- `js/inputmask/*.js` — 폰번호/금액 등 입력 마스크가 필요한 폼 화면
- `js/cmm/MDMutilingual.js` — 다국어 지원
- `js/cmm/common_auth.js` — 인증 관련
- `js/cmm/common_stpl.js`, `common_stpl_dtl.js` — 약관/설명서 화면
- `js/cmm/HPApp.js` — 앱 연동
- `js/cmm/jbwrcAppInterface.js` — 네이티브 앱 인터페이스
- `js/cmm/qrcode.min.js` — QR 코드 표시 화면
- `js/cmm/rxjs.umd.min.js` — rxjs 사용 화면
- `js/cmm/xtractor-cookie.js` — 추적 쿠키
- `js/moment/moment.min.js` — 날짜 표시 화면

## 10. 미보유 자원 (참고)

다음은 CSS/JS에서 참조되지만 우리가 가지고 있지 않은 자원들이다. 새 화면에서 이런 아이콘이 필요하면 **퍼블리싱 결과물에 절대 경로(`/assets/img/icon/...`)로 그대로 두고**, 사용자에게 "실 운영 환경에서는 자동으로 로드됨"을 안내한다. 정적 미리보기에서는 깨질 수 있다.

CSS에서 참조하는 주요 아이콘 (확인된 것):
- `/assets/img/icon/ico_back.svg` — 뒤로가기
- `/assets/img/icon/ico_menu.svg` — 햄버거
- `/assets/img/icon/ico_setting.svg` — 설정
- `/assets/img/icon/ico_chatbot.svg` — 챗봇
- `/assets/img/icon/ico_call.svg`, `ico_call_white.svg`, `ico_call_blueline.svg` — 전화
- `/assets/img/icon/ico_mail.svg` — 메일
- `/assets/img/icon/ico_write.svg` — 편집/작성
- `/assets/img/icon/ico_arrow_right_black.svg`, `ico_arrow_right_blue.svg`, `ico_arrow_right_disabled.svg` — 우측 화살표
- `/assets/img/icon/ico_arrow_down.svg` — 아래 화살표
- `/assets/img/icon/ico_refresh.svg`, `ico_reload.svg` — 새로고침
- `/assets/img/icon/ico_add.svg`, `ico_plus_line.svg` — 추가
- `/assets/img/icon/ico_bookmark_gray.svg` — 북마크
- `/assets/img/icon/ico_lang.svg` — 언어
- `/assets/img/icon/logo_appstore.svg`, `logo_googleplay.svg` — 스토어 로고
- `/assets/img/icon/img_webacc.png` — 웹 접근성 마크
- `/assets/img/icon/ci.svg` — CI 로고
- `/assets/img/logo.svg` — 워드마크 로고

추후 사용자가 이미지/아이콘을 보내주거나 운영 사이트에서 다운받아 추가하면 더 정확한 결과를 만들 수 있다.

## 11. 자주 보이는 화면 패턴 (참고 이미지 분석)

### 메인 화면 (`references/01-main.png`)
- 헤더 (로고 + 우측 아이콘들)
- 앱 다운로드 배너 (파란 배경, 닫기 X)
- 인사 영역 ("로그인 후, 다양한 혜택을…" + "로그인" 버튼)
- 큰 슬라이더 카드 (파란 배경 카드, 텍스트 + 일러스트, 페이지 닷)
- 인기상품 리스트 (카드형, "24시간 신청" 뱃지)
- 하단 탭바 (홈, 금융상품, 내금융관리, 고객센터, 전체)

### 입력 화면 (`references/02-input-form-1.png`, `03-input-form-2.png`)
- `<` 뒤로가기 헤더 (얇은 진행률 라인 표시)
- 단계 표시 (`2/5  대출신청서 작성 >`)
- 큰 헤딩 (`.l-tit`)
- 입력 필드 (라벨 + input + 우측 보조 버튼)
- 안내 박스 (연한 배경, 정보 표시)
- 하단 고정 CTA 버튼 (`.btn-lg.btn-primary`)

### 안내 화면 (`references/04-guide-page.png`)
- 헤더 + 단계 표시
- 큰 헤딩 + 서브 설명
- 본문 (강조 텍스트 포함된 안내문)
- 아코디언 리스트 (`>` 모양 펼치기)
- 하단 고정 CTA 버튼
