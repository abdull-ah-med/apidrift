#!/usr/bin/env bash
# Enforces Abdullah Ahmed author identity for this repository.
# Fail closed: any mismatch aborts the git operation that invoked this script.
set -euo pipefail

REQUIRED_NAME="Abdullah Ahmed"
REQUIRED_EMAIL="contactabdullahahmed@gmail.com"
REQUIRED_GH_LOGIN="abdull-ah-med"

fail() {
  echo "ERROR: git identity check failed: $*" >&2
  echo "Required: name='${REQUIRED_NAME}' email='${REQUIRED_EMAIL}' GitHub='${REQUIRED_GH_LOGIN}'" >&2
  echo "Commits are forbidden until identity matches. Never push from this repo." >&2
  exit 1
}

NAME="$(git config --get user.name || true)"
EMAIL="$(git config --get user.email || true)"

[[ "${NAME}" == "${REQUIRED_NAME}" ]] || fail "user.name is '${NAME}'"
[[ "${EMAIL}" == "${REQUIRED_EMAIL}" ]] || fail "user.email is '${EMAIL}'"

if [[ -n "${GIT_AUTHOR_NAME:-}" && "${GIT_AUTHOR_NAME}" != "${REQUIRED_NAME}" ]]; then
  fail "GIT_AUTHOR_NAME is '${GIT_AUTHOR_NAME}'"
fi
if [[ -n "${GIT_AUTHOR_EMAIL:-}" && "${GIT_AUTHOR_EMAIL}" != "${REQUIRED_EMAIL}" ]]; then
  fail "GIT_AUTHOR_EMAIL is '${GIT_AUTHOR_EMAIL}'"
fi
if [[ -n "${GIT_COMMITTER_NAME:-}" && "${GIT_COMMITTER_NAME}" != "${REQUIRED_NAME}" ]]; then
  fail "GIT_COMMITTER_NAME is '${GIT_COMMITTER_NAME}'"
fi
if [[ -n "${GIT_COMMITTER_EMAIL:-}" && "${GIT_COMMITTER_EMAIL}" != "${REQUIRED_EMAIL}" ]]; then
  fail "GIT_COMMITTER_EMAIL is '${GIT_COMMITTER_EMAIL}'"
fi

# Optional GitHub account check: only enforce when gh returns a real login string.
# Bad/expired tokens must not block local commits (push remains forbidden via pre-push).
if command -v gh >/dev/null 2>&1; then
  LOGIN="$(gh api user --jq .login 2>/dev/null || true)"
  if [[ "${LOGIN}" =~ ^[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?$ ]]; then
    if [[ "${LOGIN}" != "${REQUIRED_GH_LOGIN}" ]]; then
      fail "gh authenticated as '${LOGIN}', expected '${REQUIRED_GH_LOGIN}'"
    fi
  fi
fi

echo "OK: git identity ${REQUIRED_NAME} <${REQUIRED_EMAIL}>"
