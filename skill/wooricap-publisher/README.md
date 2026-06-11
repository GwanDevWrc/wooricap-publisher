# wooricap-publisher

우리캐피탈 사이트(wooricap.com)의 디자인 시스템에 맞춰 새 화면을 단일 HTML 파일로 퍼블리싱하는 Claude 스킬.

## 무엇을 하는가

- **입력**: 화면 캡쳐 이미지 또는 텍스트 기획안
- **출력**: 우리캐피탈 디자인 시스템(CSS/JS/폰트)을 그대로 활용한 단일 HTML 파일
- 결과 HTML은 우리캐피탈 운영 사이트의 자원을 절대 URL로 참조하므로 브라우저에서 바로 열어볼 수 있다

## 설치

### 방법 ① — 폴더 직접 복사 (가장 단순)

이 폴더 전체를 다음 위치에 둔다:

- **macOS / Linux**: `~/.claude/skills/wooricap-publisher/`
- **Windows**: `%USERPROFILE%\.claude\skills\wooricap-publisher\`

Claude Code 새 세션에서 자동 인식된다 (재시작 불필요).

### 방법 ② — Git으로 관리 (멀티 PC 권장)

사내 Git 저장소에 이 폴더를 push 하고, 각 PC에서 clone:

```bash
# 새 PC에서 한 번만:
mkdir -p ~/.claude/skills
cd ~/.claude/skills
git clone <사내-git-url>/wooricap-publisher.git

# 자원 업데이트 시 (어느 PC에서든):
cd ~/.claude/skills/wooricap-publisher
python scripts/update_assets.py
git add . && git commit -m "자원 업데이트 $(date +%Y-%m-%d)" && git push

# 다른 PC에서 동기화:
cd ~/.claude/skills/wooricap-publisher
git pull
```

### 방법 ③ — `.skill` 파일로 배포

`.skill` 파일은 zip 압축이라 OS 무관하게 동작한다.

```bash
# 패키징한 사람이 한 번:
cd ~/.claude/skills
zip -r wooricap-publisher.skill wooricap-publisher/

# 받는 사람이 PC마다 설치:
# macOS / Linux:
unzip wooricap-publisher.skill -d ~/.claude/skills/
# Windows PowerShell:
Expand-Archive -Path wooricap-publisher.skill -DestinationPath "$env:USERPROFILE\.claude\skills\"
```

## 사용 예시

Claude Code 세션에서 작업 폴더로 이동한 다음:

```
> 우리캐피탈 로그인 화면 만들어줘. ID/비밀번호 + 로그인 버튼 + 회원가입 링크
> [캡쳐 이미지 첨부] 이 화면대로 퍼블리싱해줘
> wooricap 스타일로 대출 신청 1단계 화면 만들어줘
```

스킬이 자동으로 트리거되어 현재 폴더에 HTML 파일을 만들어준다.

## 자원 업데이트

우리캐피탈 사이트의 CSS/JS가 변경됐을 때:

```bash
# 어떤 파일이 바뀔지 미리 확인:
python scripts/update_assets.py --check

# 실제 업데이트:
python scripts/update_assets.py

# 강제 전체 재다운로드:
python scripts/update_assets.py --force
```

또는 Claude에게 그냥 말해도 된다: "우리캐피탈 정적 자원 업데이트해줘"

## 폴더 구조

```
wooricap-publisher/
├── SKILL.md                  ← Claude가 읽는 스킬 본체
├── README.md                 ← 이 파일
├── assets/                   ← 우리캐피탈 정적 자원
│   ├── css/   (12개 파일)
│   ├── fonts/ (Pretendard 5종 + HGGGothicssi-200)
│   └── js/    (cmm/inputmask/jquery/moment/ui)
├── references/
│   ├── design-system-notes.md  ← 디자인 시스템 분석
│   ├── 01-main.png             ← 참고 시안 (메인)
│   ├── 02-input-form-1.png     ← 참고 시안 (입력 폼)
│   ├── 03-input-form-2.png     ← 참고 시안 (입력 폼)
│   └── 04-guide-page.png       ← 참고 시안 (안내)
└── scripts/
    └── update_assets.py        ← 자원 다운로드/업데이트
```

## 알려진 제약

- 이미지/아이콘 자원은 스킬에 포함되어 있지 않다. 결과 HTML이 우리캐피탈 운영 도메인의 절대 URL을 참조하므로 인터넷 연결 시 정상 표시된다. 오프라인 작업이 필요하면 별도로 이미지 자원을 추가해야 한다.
- `hgg` 600/800, `SpoqaHanSansNeo` 폰트는 `jb-font.css`에 선언만 되어 있고 실제 woff2 파일이 없다. 사용 시 Pretendard로 자동 fallback 된다.
