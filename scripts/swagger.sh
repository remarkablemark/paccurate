#!/usr/bin/env bash

set -e -u -o pipefail

CURRENT_VERSION=$(yq '.info.version' src/swagger.yaml)

echo "Current Paccurate Swagger version: $CURRENT_VERSION"

LATEST_VERSION=$(curl -s https://api.paccurate.io/static/api/openapi.json | jq .info.version -r)

echo "Latest Paccurate Swagger version: $CURRENT_VERSION"

SWAGGER_URL="https://api.paccurate.io/static/api/$LATEST_VERSION/swagger.yaml"
SWAGGER_PATH='src/swagger.yaml'

if [[ $CURRENT_VERSION == $LATEST_VERSION ]]; then
  echo "Paccurate Swagger version has not changed. Exiting"
  exit
fi

git stash

echo "Downloading Paccurate Swagger: $SWAGGER_URL"
curl $SWAGGER_URL -o $SWAGGER_PATH
npx prettier --write $SWAGGER_PATH

echo 'Converting Swagger to types'
npm run swagger-to-types

echo 'Creating PR...'
BRANCH="feat/swagger-$LATEST_VERSION"
git checkout -b $BRANCH
git commit -am \
  "feat(types): bump Paccurate Swagger version from $CURRENT_VERSION to $LATEST_VERSION"
  -m "https://api.paccurate.io/static/api/$LATEST_VERSION/swagger.yaml"
git push --force origin $BRANCH
gh pr create --assignee remarkablemark --fill --reviewer remarkablemark

git stash pop || true
