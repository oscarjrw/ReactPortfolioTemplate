#!/usr/bin/env bash
# Run ON THE VPS, from the cloned repository: ./deploy/deploy.sh
# Pulls the current branch from GitHub, builds it in a throwaway Node container, publishes it as a new release.
# Roll back: ln -sfn /var/www/portfolio/releases/<previous> /var/www/portfolio/current
set -euo pipefail
ROOT="${ROOT:-/var/www/portfolio}"
NODE_IMAGE="${NODE_IMAGE:-node:22-alpine}"

# Everything is inside a function so that git can replace this file while it runs.
main() {
    cd "$(dirname "$0")/.."
    git pull --ff-only

    # Source maps are off: they are not needed online and make the build use much more memory.
    docker run --rm --user "$(id -u):$(id -g)" -e HOME=/tmp -e GENERATE_SOURCEMAP=false \
        -v "$PWD:/app" -w /app "$NODE_IMAGE" sh -c "npm ci --no-audit --no-fund && npm run build"

    local release
    release="$(date +%Y%m%d-%H%M%S)-$(git rev-parse --short HEAD)"
    mkdir -p "$ROOT/releases/$release"
    cp -R build/. "$ROOT/releases/$release/"
    chmod -R a+rX "$ROOT/releases/$release"
    ln -sfn "$ROOT/releases/$release" "$ROOT/current"
    echo "Published $release"
}
main "$@"
exit
