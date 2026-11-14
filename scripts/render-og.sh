#!/bin/sh
# Renders scripts/og-image.html to public/og-image.png (1200x630).
# Needs network for Google Fonts; check the PNG after re-rendering.
set -e
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1 --window-size=1200,630 --virtual-time-budget=5000 \
  --screenshot="$PWD/public/og-image.png" "file://$PWD/scripts/og-image.html"
