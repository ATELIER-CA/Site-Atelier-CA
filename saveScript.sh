#!/bin/bash

echo "Running git add ."
git add .

echo "Running git commit -m \"$1\""
git commit -m "$1"

echo "Running git push"
git push