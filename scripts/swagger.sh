#!/bin/bash

PROJECT_VERSION=$(
  yq '.info.version' src/swagger.yaml
)

echo "Project Paccurate Swagger version is: $PROJECT_VERSION"

LATEST_VERSION=$(
  curl 'https://api.paccurate.io/static/api/' |
  grep '/swagger.yaml' |
  grep -Eo '[0-9]{1,}.[0-9]{1,}.[0-9]{1,}'
)

echo "Latest Paccurate Swagger version is: $PROJECT_VERSION"

SWAGGER_URL="https://api.paccurate.io/static/api/$LATEST_VERSION/swagger.yaml"
SWAGGER_PATH='src/swagger.yaml'

if [[ $PROJECT_VERSION == $LATEST_VERSION ]]; then
  echo "Paccurate Swagger version has not changed. Exiting"
  exit
fi

git stash

echo "Downloading Paccurate Swagger: $SWAGGER_URL"
curl $SWAGGER_URL -o $SWAGGER_PATH
npx prettier --write $SWAGGER_PATH

echo 'Converting Swagger to types'
npm run swagger-to-types

echo 'Creating PR'
BRANCH='feat/types'
git checkout -b $BRANCH
git commit -am "feat(types): bump Paccurate Swagger version from $PROJECT_VERSION to $LATEST_VERSION"
git push origin $BRANCH
gh pr create --assignee remarkablemark --fill --reviewer remarkablemark

git stash pop
