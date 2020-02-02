#!/bin/sh

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_website_files() {
  git add .
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER [no CI]"
}

push_changes() {
  git remote add tv https://${GH_TOKEN}@github.com/MVSE-outreach/resources.git > /dev/null 2>&1
  git push --quiet --set-upstream tv master
}

setup_git
commit_website_files
push_changes