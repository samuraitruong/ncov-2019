#!/bin/sh

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_website_files() {
  git checkout -b staging
  git status
  git add --all
  echo "------------------------------ run gt commit -----------------"
  git commit -a --message "Travis build: $TRAVIS_BUILD_NUMBER [skip ci]"
  echo "---------------------------------------------------------"
  git status
  
}

push_changes() {
  echo "---------------------GIT PUSH----------------------------------------------"
  git remote add tv https://${GH_TOKEN}@github.com/samuraitruong/ncov-2019.git>/dev/null 2>&1
  git log -3
  git remote -v
  git checkout master
  git merge staging
  git push tv master
  echo "----------------------------- VERIFY ---------------------------------------"
  git status
}

setup_git
commit_website_files
push_changes