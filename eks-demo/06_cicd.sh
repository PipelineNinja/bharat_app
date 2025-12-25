#!/bin/bash
clear

echo "▶ Triggering CI/CD pipeline"
echo
echo "This will:"
echo "- Push a controlled change (README.md)"
echo "- Trigger GitHub Actions"
echo "- Perform rolling deployment on EKS"
echo

read

echo
echo "$ git status"
read
git status

read
echo
echo "$ git add README.md"
read
git add README.md

read
echo
echo "$ git commit -m \"Trigger CI pipeline\""
read
git commit -m "Trigger CI pipeline time for Demo purpose "

read
echo
echo "$ git push origin main"
read
git push origin main

echo
echo "✔ CI/CD pipeline triggered via README.md change"

