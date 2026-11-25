#!/usr/bin/env bash
# Builds the site and publishes it as a new release on the VPS. Nothing is deleted on the server.
#   VPS=deploy@203.0.113.10 ./deploy/deploy.sh
# Roll back: ssh "$VPS" 'ln -sfn /var/www/portfolio/releases/<previous> /var/www/portfolio/current'
set -euo pipefail
: "${VPS:?Set VPS=user@host}"
ROOT="${ROOT:-/var/www/portfolio}"
RELEASE="$(date +%Y%m%d-%H%M%S)"

cd "$(dirname "$0")/.."
npm ci
CI=true npm test -- --watchAll=false
npm run build

ssh "$VPS" "mkdir -p '$ROOT/releases/$RELEASE'"
rsync -az build/ "$VPS:$ROOT/releases/$RELEASE/"
ssh "$VPS" "ln -sfn '$ROOT/releases/$RELEASE' '$ROOT/current'"
echo "Published $RELEASE"
