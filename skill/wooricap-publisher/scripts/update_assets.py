#!/usr/bin/env python3
"""
우리캐피탈 정적 자원 다운로드/업데이트 스크립트.

스킬 폴더 기준으로 assets/ 하위에 우리캐피탈 사이트의 CSS/JS/폰트를 받아온다.
이미 존재하는 파일이 있으면 변경된 경우에만 갱신하고, 변경 사항을 요약 출력한다.

사용법:
  python scripts/update_assets.py             # 변경된 파일만 업데이트
  python scripts/update_assets.py --force     # 강제 전체 재다운로드
  python scripts/update_assets.py --check     # 다운로드 없이 변경 확인만

크로스 플랫폼: Windows / macOS / Linux 모두 동작 (표준 라이브러리만 사용).
"""

import argparse
import hashlib
import os
import sys
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

# 스킬 루트 경로 (이 스크립트 기준 상위 폴더)
SKILL_ROOT = Path(__file__).resolve().parent.parent
ASSETS_ROOT = SKILL_ROOT / "assets"
BASE_URL = "https://www.wooricap.com"

# 다운로드할 자원 목록
# (사이트 경로, 로컬 저장 경로) - 로컬은 스킬의 assets/ 기준 상대 경로
ASSETS = [
    # CSS
    ("/assets/css/datepicker.css", "css/datepicker.css"),
    ("/assets/css/jb-common.css", "css/jb-common.css"),
    ("/assets/css/jb-font.css", "css/jb-font.css"),
    ("/assets/css/jb-layout.css", "css/jb-layout.css"),
    ("/assets/css/jb-reset.css", "css/jb-reset.css"),
    ("/assets/css/jb-style.css", "css/jb-style.css"),
    ("/assets/css/style-contents.css", "css/style-contents.css"),
    ("/assets/css/style-cst.css", "css/style-cst.css"),
    ("/assets/css/style-fin.css", "css/style-fin.css"),
    ("/assets/css/style-product.css", "css/style-product.css"),
    ("/assets/css/style-main.css", "css/style-main.css"),
    ("/assets/css/swiper-bundle.min.css", "css/swiper-bundle.min.css"),
    # Fonts
    ("/assets/fonts/HGGGothicssi-200.woff2", "fonts/HGGGothicssi-200.woff2"),
    ("/assets/fonts/Pretendard-Regular.woff2", "fonts/Pretendard-Regular.woff2"),
    ("/assets/fonts/Pretendard-Medium.woff2", "fonts/Pretendard-Medium.woff2"),
    ("/assets/fonts/Pretendard-SemiBold.woff2", "fonts/Pretendard-SemiBold.woff2"),
    ("/assets/fonts/Pretendard-Bold.woff2", "fonts/Pretendard-Bold.woff2"),
    ("/assets/fonts/Pretendard-ExtraBold.woff2", "fonts/Pretendard-ExtraBold.woff2"),
    # JS - cmm (?r=숫자 쿼리스트링은 캐시 버스터일 뿐 같은 파일)
    ("/assets/js/cmm/HPApp.js", "js/cmm/HPApp.js"),
    ("/assets/js/cmm/MDMutilingual.js", "js/cmm/MDMutilingual.js"),
    ("/assets/js/cmm/common_auth.js", "js/cmm/common_auth.js"),
    ("/assets/js/cmm/common_stpl.js", "js/cmm/common_stpl.js"),
    ("/assets/js/cmm/common_stpl_dtl.js", "js/cmm/common_stpl_dtl.js"),
    ("/assets/js/cmm/jbwrcAppInterface.js", "js/cmm/jbwrcAppInterface.js"),
    ("/assets/js/cmm/jbwrcEvent.js", "js/cmm/jbwrcEvent.js"),
    ("/assets/js/cmm/jbwrcFnc.js", "js/cmm/jbwrcFnc.js"),
    ("/assets/js/cmm/jbwrcUtil.js", "js/cmm/jbwrcUtil.js"),
    ("/assets/js/cmm/js.cookie.min.js", "js/cmm/js.cookie.min.js"),
    ("/assets/js/cmm/qrcode.min.js", "js/cmm/qrcode.min.js"),
    ("/assets/js/cmm/rxjs.umd.min.js", "js/cmm/rxjs.umd.min.js"),
    ("/assets/js/cmm/xtractor-cookie.js", "js/cmm/xtractor-cookie.js"),
    # JS - inputmask
    ("/assets/js/inputmask/inputmask.extensions.js", "js/inputmask/inputmask.extensions.js"),
    ("/assets/js/inputmask/inputmask.js", "js/inputmask/inputmask.js"),
    ("/assets/js/inputmask/jquery.inputmask.js", "js/inputmask/jquery.inputmask.js"),
    # JS - jquery
    ("/assets/js/jquery/jquery-3.6.1.min.js", "js/jquery/jquery-3.6.1.min.js"),
    ("/assets/js/jquery/jquery.tmpl.js", "js/jquery/jquery.tmpl.js"),
    # JS - moment
    ("/assets/js/moment/moment.min.js", "js/moment/moment.min.js"),
    # JS - ui
    ("/assets/js/ui/jb-layout.js", "js/ui/jb-layout.js"),
    ("/assets/js/ui/jb-ui.js", "js/ui/jb-ui.js"),
]


def file_hash(path: Path) -> str:
    """파일의 SHA1 해시 반환 (변경 감지용)."""
    if not path.exists():
        return ""
    h = hashlib.sha1()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            h.update(chunk)
    return h.hexdigest()


def download(url: str) -> bytes:
    """URL에서 파일 다운로드. 사용자 에이전트 헤더 포함 (일부 서버 요구)."""
    req = Request(url, headers={"User-Agent": "wooricap-publisher-skill/1.0"})
    with urlopen(req, timeout=30) as resp:
        return resp.read()


def main() -> int:
    parser = argparse.ArgumentParser(description="우리캐피탈 정적 자원 업데이트")
    parser.add_argument("--force", action="store_true", help="강제 전체 재다운로드")
    parser.add_argument("--check", action="store_true", help="다운로드 없이 변경 확인만")
    args = parser.parse_args()

    if not ASSETS_ROOT.exists():
        ASSETS_ROOT.mkdir(parents=True, exist_ok=True)

    updated = []
    unchanged = []
    failed = []
    new_files = []

    print(f"스킬 루트: {SKILL_ROOT}")
    print(f"기준 URL: {BASE_URL}")
    print(f"총 {len(ASSETS)}개 자원 점검 중...\n")

    for remote_path, local_rel in ASSETS:
        local_path = ASSETS_ROOT / local_rel
        url = BASE_URL + remote_path
        is_new = not local_path.exists()
        try:
            if args.check:
                if is_new:
                    new_files.append(local_rel)
                    print(f"  [NEW]    {local_rel}")
                else:
                    print(f"  [EXISTS] {local_rel}")
                continue

            data = download(url)
            local_path.parent.mkdir(parents=True, exist_ok=True)

            if is_new:
                local_path.write_bytes(data)
                new_files.append(local_rel)
                print(f"  [NEW]     {local_rel} ({len(data):,} bytes)")
                continue

            old_hash = file_hash(local_path)
            new_hash = hashlib.sha1(data).hexdigest()
            if args.force or old_hash != new_hash:
                local_path.write_bytes(data)
                updated.append(local_rel)
                print(f"  [UPDATED] {local_rel} ({len(data):,} bytes)")
            else:
                unchanged.append(local_rel)
                # print(f"  [SAME]    {local_rel}")  # noisy, only print on -v if added later

        except HTTPError as e:
            failed.append((local_rel, f"HTTP {e.code}"))
            print(f"  [FAIL]    {local_rel} -- HTTP {e.code}", file=sys.stderr)
        except URLError as e:
            failed.append((local_rel, str(e.reason)))
            print(f"  [FAIL]    {local_rel} -- {e.reason}", file=sys.stderr)
        except Exception as e:
            failed.append((local_rel, str(e)))
            print(f"  [FAIL]    {local_rel} -- {e}", file=sys.stderr)

    print()
    print("=" * 60)
    print(f"  요약: 신규 {len(new_files)}, 업데이트 {len(updated)}, "
          f"동일 {len(unchanged)}, 실패 {len(failed)}")
    print("=" * 60)

    if failed:
        print("\n실패한 자원 (수동 확인 필요):")
        for rel, reason in failed:
            print(f"  - {rel}: {reason}")
        return 1

    return 0


if __name__ == "__main__":
    sys.exit(main())
