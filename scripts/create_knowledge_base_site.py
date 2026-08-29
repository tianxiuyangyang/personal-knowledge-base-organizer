#!/usr/bin/env python3
"""Copy the canonical 知境 static site and optionally personalize visible identity strings."""
from __future__ import annotations

import argparse
import html
import json
import shutil
import sys
from pathlib import Path

SKILL_ROOT = Path(__file__).resolve().parents[1]
TEMPLATE = SKILL_ROOT / "assets" / "zhijing-site-template"


def fail(message: str) -> None:
    print(f"error: {message}", file=sys.stderr)
    raise SystemExit(2)


def read_profile(path: Path | None) -> dict[str, str]:
    defaults = {
        "display_name": "张睿琛",
        "initial": "Z",
        "status": "持续构建中",
        "brand": "知境",
        "app_title": "个人知识库",
    }
    if path is None:
        return defaults
    try:
        supplied = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        fail(f"cannot read profile JSON: {exc}")
    if not isinstance(supplied, dict):
        fail("profile JSON must be an object")
    for key in defaults:
        if key in supplied:
            value = str(supplied[key]).strip()
            if value:
                defaults[key] = value
    return defaults


def personalize_html(html_path: Path, profile: dict[str, str]) -> None:
    text = html_path.read_text(encoding="utf-8")
    safe = {key: html.escape(value) for key, value in profile.items()}
    replacements = {
        "<title>知境 · 个人知识库</title>": f"<title>{safe['brand']} · {safe['app_title']}</title>",
        "<strong>知境</strong><small>PERSONAL OS</small>": f"<strong>{safe['brand']}</strong><small>PERSONAL OS</small>",
        "<i>Z</i><div><strong>张睿琛</strong><small>持续构建中</small></div>": f"<i>{safe['initial']}</i><div><strong>{safe['display_name']}</strong><small>{safe['status']}</small></div>",
    }
    for source, target in replacements.items():
        if source not in text:
            print(f"warning: template marker not found: {source[:42]!r}", file=sys.stderr)
        text = text.replace(source, target)
    html_path.write_text(text, encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser(description="Create a 知境-style personal knowledge-base site.")
    parser.add_argument("destination", type=Path, help="output directory for the static website")
    parser.add_argument("--profile", type=Path, help="optional JSON profile; see references/profile.example.json")
    parser.add_argument("--force", action="store_true", help="allow a non-empty destination directory")
    args = parser.parse_args()

    if not TEMPLATE.is_dir():
        fail(f"missing bundled template: {TEMPLATE}")
    target = args.destination.expanduser().resolve()
    if target.exists() and any(target.iterdir()) and not args.force:
        fail(f"destination is not empty: {target}; choose an empty directory or pass --force")
    target.mkdir(parents=True, exist_ok=True)
    for source in TEMPLATE.iterdir():
        if source.is_file():
            shutil.copy2(source, target / source.name)
    personalize_html(target / "index.html", read_profile(args.profile))
    print(f"Created 知境-style personal knowledge-base site: {target}")
    print("Run: python -m http.server 8080")
    print("Then open: http://localhost:8080")


if __name__ == "__main__":
    main()
