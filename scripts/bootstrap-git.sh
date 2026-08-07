#!/usr/bin/env bash
# Configure local git identity and hooks for APIDrift. Safe to re-run.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "${ROOT}"

git config user.name "Abdullah Ahmed"
git config user.email "contactabdullahahmed@gmail.com"
git config core.hooksPath .githooks

chmod +x scripts/check-git-identity.sh .githooks/pre-commit .githooks/commit-msg .githooks/pre-push
./scripts/check-git-identity.sh

echo "OK: core.hooksPath=.githooks (push is blocked by pre-push)"
