# wooricap-publisher

[JB우리캐피탈 (wooricap.com)](https://www.wooricap.com) 디자인 시스템을 기반으로 새 화면을 **단일 HTML 파일**로 퍼블리싱하는 프로젝트입니다.

Claude Code 스킬(`wooricap-publisher`)과 함께 작업한 결과물 + 그 스킬 자체 + 프로젝트 자원을 모두 담고 있어, **이 저장소를 클론받으면 다른 PC에서도 같은 방식으로 퍼블리싱을 이어갈 수 있습니다.**

---

## 폴더 구조

```
wooricap_publisher_claude/
├── assets/                    # 우리캐피탈 정적자원 (CSS, JS, fonts, img, lottie)
│   ├── css/                   # jb-common.css, jb-style.css 등 디자인 시스템
│   ├── js/                    # jQuery + jbwrc 공통 스크립트
│   ├── fonts/                 # Pretendard
│   ├── img/icon/              # 직접 만든 SVG 아이콘들 (운영엔 없음)
│   └── lottie/                # 신분증 스캔 등 Lottie 애니메이션
├── output/                    # 퍼블리싱 결과물 HTML들
│   ├── loan-application-complete.html      # 대출신청 완료 (1차 디자인)
│   ├── loan-application-complete2.html     # 완료 화면 ToBe 클린 버전
│   ├── loan-application-complete3.html     # 근저당 안내 완료
│   ├── loan-application-complete4.html     # 선설정 해지 완료
│   ├── mobile-id-auth.html                 # 모바일 신분증 인증 (Lottie)
│   ├── id-auth-select.html                 # 인증 방식 선택
│   ├── id-verify-progress.html             # 인증 진행 중
│   ├── attach-buttons.html                 # 증빙서류 추가/삭제 버튼
│   └── alert-dark.html                     # 라이트 알럿 팝업
├── reference/                 # 기존 사이트 캡쳐 (디자인 패턴 참조)
├── skill/wooricap-publisher/  # Claude Code 스킬 파일 (사용 방법은 아래)
├── .claude/launch.json        # 로컬 프리뷰 서버 설정 (http-server)
├── .gitignore
└── README.md
```

---

## 1. 클론 받은 직후 할 일

```bash
git clone https://github.com/jm-dev-new/wooricap_publisher.git
cd wooricap_publisher
```

브라우저에서 결과물 보기 — 두 가지 방법:

**(a) 그냥 파일 더블클릭** — Lottie를 쓰는 화면(`mobile-id-auth.html` 등)을 제외하면 거의 모두 동작.

**(b) 로컬 HTTP 서버 (Lottie 화면도 보고 싶을 때, 권장)**:

```bash
# Node가 설치돼 있다면
npx -y http-server . -p 8765 -c-1

# 그 다음 브라우저로
http://localhost:8765/output/mobile-id-auth.html
```

또는 VS Code의 **Live Server** 확장으로 우클릭 → "Open with Live Server".

---

## 2. 스킬을 다른 PC의 Claude Code에 적용

이 저장소의 [`skill/wooricap-publisher/`](skill/wooricap-publisher) 폴더를 Claude Code 스킬 디렉토리에 복사하면 됩니다.

**Windows**:
```powershell
$dest = "$env:APPDATA\Claude\local-agent-mode-sessions\skills-plugin"
# 스킬 플러그인 폴더는 GUID 형태로 되어 있으니 적절한 위치에 복사
# 일반적으론 ~/.claude/skills/ 에 두는 방식도 가능
xcopy skill\wooricap-publisher "$env:USERPROFILE\.claude\skills\wooricap-publisher" /E /I
```

**Mac/Linux**:
```bash
mkdir -p ~/.claude/skills
cp -r skill/wooricap-publisher ~/.claude/skills/
```

스킬이 적용되면 Claude Code에서 "우리캐피탈 화면 만들어줘", "이 캡쳐 퍼블리싱해줘" 같은 요청에 자동으로 트리거됩니다.

자세한 사용 방법은 [`skill/wooricap-publisher/SKILL.md`](skill/wooricap-publisher/SKILL.md) 참고.

---

## 3. 새 화면 퍼블리싱 워크플로

1. **시안 준비** — 캡쳐 이미지 또는 텍스트 기획안
2. **Claude Code에 요청** — "우리캐피탈 OO 화면 만들어줘, [이미지 첨부]"
3. **스킬 자동 실행** — `skill/wooricap-publisher/SKILL.md`의 절차에 따라
   - `references/design-system-notes.md` 자동 읽기 (변수, 클래스, 패턴)
   - 시안 분석 → 화면 종류 판별 (메인/폼/안내/완료/리스트/팝업)
   - 적절한 CSS/JS 조합 선택
   - 단일 HTML 생성 → `output/` 폴더에 저장
4. **확인** — `output/새파일.html`을 로컬 서버로 열어 검토
5. **반복** — 부족한 부분 피드백 → 자동 보정

---

## 4. 우리캐피탈 운영 자원 업데이트

운영 사이트가 바뀌었을 때 정적 자원 동기화:

```bash
# Python 환경에서
python skill/wooricap-publisher/scripts/update_assets.py

# 옵션
python skill/wooricap-publisher/scripts/update_assets.py --check   # 변경된 파일만 확인
python skill/wooricap-publisher/scripts/update_assets.py --force   # 전체 강제 재다운로드
```

업데이트 후 변경된 자원을 commit/push 하면 다른 PC에서도 pull로 동기화됩니다.

---

## 5. 디자인 시스템 핵심 요약

자세한 분석은 [`skill/wooricap-publisher/references/design-system-notes.md`](skill/wooricap-publisher/references/design-system-notes.md) 참조.

- **루트 단위**: `1rem = 10px` (style 작성 시 10진 변환 편함)
- **색상**: CSS 변수 사용 — `var(--primaryBlue)` (#0565F0), `var(--primaryBlack)`, `var(--subTxt)`, `var(--borderColor)` 등
- **폰트**: Pretendard 자동 적용 (별도 지정 불필요)
- **주요 클래스**:
  - 레이아웃: `.wrapper`, `#header`, `#main`, `.contents-wrap`
  - 헤더: `.mobile.sub-header`, `.btn-back`, `.title-show`
  - 타이포: `.l-tit`, `.m-tit`, `.fz-s`, `.fc-blue`
  - 박스: `.line-box-wrap`, `.box-wrap`, `.txt-info`
  - 버튼: `.btn-lg`, `.btn-md`, `.btn-primary`, `.btn-line-blue`
  - 입력: `.input-con`, `.input-box`, `.input-default`, `.chk`
- **자원 참조**:
  - 로컬 사용: `<link href="../assets/css/jb-common.css">`
  - 운영 절대 URL: `<link href="https://www.wooricap.com/assets/css/jb-common.css">`

---

## 6. 작업 이력 (주요 결과물)

| 파일 | 설명 |
|------|------|
| [`output/loan-application-complete.html`](output/loan-application-complete.html) | 대출신청 완료 ToBe — 큰 체크 아이콘, 3개 안내 카드, 노란 경고박스, 검정 → 후에 파랑 CTA |
| [`output/loan-application-complete2.html`](output/loan-application-complete2.html) | 동일 메시지를 클린한 ToBe 톤으로 재퍼블 |
| [`output/loan-application-complete3.html`](output/loan-application-complete3.html) | 자동차 근저당 안내 완료 — 데이터 테이블 + 안내 텍스트 |
| [`output/loan-application-complete4.html`](output/loan-application-complete4.html) | 선설정 해지 완료 — 즉시전화 연결 카드 + 영업시간 안내 |
| [`output/mobile-id-auth.html`](output/mobile-id-auth.html) | 모바일 신분증 인증 화면 — `assets/lottie/id-scan-animation.json` 사용 |
| [`output/id-auth-select.html`](output/id-auth-select.html) | OCR 촬영 vs 모바일 신분증 선택 화면 |
| [`output/id-verify-progress.html`](output/id-verify-progress.html) | 모바일 신분증 인증 진행 중 — `assets/lottie/id-card-scan.json` 사용 |
| [`output/attach-buttons.html`](output/attach-buttons.html) | 증빙서류 추가/삭제 버튼 — `.attach-btn.type-add/.type-remove` 컴포넌트 |
| [`output/alert-dark.html`](output/alert-dark.html) | 라이트 알럿 팝업 (`.layerpop-wrap.type-light`) — `JBWRC.alert` 함수 확장용 |

---

## 7. 라이센스 / 주의

- 이 저장소의 `assets/css`, `assets/js`, `assets/fonts` 등은 [JB우리캐피탈 운영 사이트](https://www.wooricap.com)의 자원입니다. 디자인 시스템 학습/내부 퍼블리싱 작업용으로만 사용하세요.
- 외부 배포·재배포 시 라이센스 검토가 필요할 수 있습니다.
- `reference/` 의 캡쳐 이미지도 동일한 범위로만 사용하세요.

---

## 8. 문의 / 기여

이 저장소는 개인 작업용입니다. 이슈/제안은 issue 탭으로.
