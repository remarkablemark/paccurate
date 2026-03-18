#!/usr/bin/env bash

set -e -u -o pipefail

OPENAPI_URL='https://api.paccurate.io/static/api/openapi.json'
OPENAPI_PATH='src/openapi.json'

CURRENT_VERSION=''
if [[ -f $OPENAPI_PATH ]]; then
  CURRENT_VERSION=$(jq '.info.version' "$OPENAPI_PATH" -r)
fi

if [[ -n $CURRENT_VERSION ]]; then
  echo "Current Paccurate OpenAPI version: $CURRENT_VERSION"
else
  echo 'Current Paccurate OpenAPI version: none'
fi

LATEST_OPENAPI=$(mktemp)
curl -fsSL "$OPENAPI_URL" -o "$LATEST_OPENAPI"
LATEST_VERSION=$(jq '.info.version' "$LATEST_OPENAPI" -r)

echo "Latest Paccurate OpenAPI version: $LATEST_VERSION"

if [[ $CURRENT_VERSION == $LATEST_VERSION ]]; then
  echo 'Paccurate OpenAPI version has not changed. Exiting'
  rm -f "$LATEST_OPENAPI"
  exit
fi

git stash

echo "Saving Paccurate OpenAPI: $OPENAPI_URL"
mv "$LATEST_OPENAPI" "$OPENAPI_PATH"
npx prettier --write "$OPENAPI_PATH"

echo 'Converting OpenAPI to types'
npm run openapi-to-types

echo 'Creating PR...'
BRANCH="feat/openapi-$LATEST_VERSION"
git checkout -b $BRANCH
git commit -am \
  "feat(types): bump Paccurate OpenAPI version from ${CURRENT_VERSION:-none} to $LATEST_VERSION" \
  -m "$OPENAPI_URL"
git push --force origin $BRANCH
gh pr create --assignee remarkablemark --fill --reviewer remarkablemark

git stash pop || true
