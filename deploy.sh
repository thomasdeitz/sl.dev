#!/bin/bash

echo "Starting deployment" 
echo "Getting deployment target."

TARGET=$STAGING_TARGET

echo "Getting source harp.js code from $TRAVIS_REPO_SLUG"
CURRENT_REPO_SLUG=$(echo $TRAVIS_REPO_SLUG | cut -d "/" -f2 )
CURRENT_COMMIT=`git rev-parse HEAD`

echo "Targeting $TARGET repository"
TARGET_URL='https://github.com/thomasdeitz/'$TARGET'.git'
TARGET_URL_WITH_CREDENTIALS=${TARGET_URL/\/\/github.com/\/\/$GITHUB_TOKEN@github.com}

echo "Cloning repository from $TARGET_URL"
cd ../
git clone $TARGET_URL || exit 1
cd $TARGET || exit 1

echo "Checking out master from $TARGET"
git checkout master || exit 1
cd ../

echo "Compiling new static content for $TARGET_URL"
harp compile $CURRENT_REPO_SLUG $TARGET || exit 1
cd $TARGET

echo "Preserving CNAME"
git checkout CNAME || exit 1

echo "Commit updates"
git add -A || exit 1
git commit --allow-empty -m "Compiled content for $CURRENT_COMMIT" || exit 1

echo "Pushing updates"
git push --force --quiet "$TARGET_URL_WITH_CREDENTIALS" || exit 1

cd ../

echo "Cleaning up temp files"  
rm -Rf $TARGET || exit 1
rm -Rf $CURRENT_REPO_SLUG || exit 1

echo "Deployed successfully."  
exit 0