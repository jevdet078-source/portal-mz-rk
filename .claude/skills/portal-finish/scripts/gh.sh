#!/usr/bin/env bash
# gh от имени jevdet078-source: токен берётся из Git Credential Manager и на экран не выводится.
# В песочнице Claude gh по умолчанию видит другой аккаунт без права push (403), поэтому так.
#   bash .claude/skills/portal-finish/scripts/gh.sh pr list --repo jevdet078-source/portal-mz-rk --state open
set -e
TOKEN=$(printf 'protocol=https\nhost=github.com\nusername=jevdet078-source\n\n' \
  | git -c credential.helper= -c credential.helper=manager credential fill 2>/dev/null \
  | sed -n 's/^password=//p')
if [ -z "$TOKEN" ]; then
  echo "Нет токена jevdet078-source в Git Credential Manager. Нужен вход в терминале пользователя: gh auth login --web (или git push один раз)." >&2
  exit 1
fi
GH_TOKEN="$TOKEN" exec gh "$@"
