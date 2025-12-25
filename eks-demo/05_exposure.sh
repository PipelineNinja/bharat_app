#!/bin/bash
clear

echo "▶ Verifying public access"
echo
echo "This confirms:"
echo "- AWS LoadBalancer integration"
echo "- External application access"
echo

read

echo
echo "$ kubectl get svc -n bharat-app"
read
kubectl get svc -n bharat-app

echo
echo "✔ Application exposure verified"

