#!/bin/bash
clear

echo "▶ Verifying application workloads"
echo
echo "This shows:"
echo "- Running pods"
echo "- Node scheduling"
echo "- Deployment readiness"
echo

# Silent pause (no text)
read

echo
echo "$ kubectl get pods -n bharat-app -o wide"
read
kubectl get pods -n bharat-app -o wide

read

echo
echo "$ kubectl get deploy -n bharat-app"
read
kubectl get deploy -n bharat-app

echo
echo "✔ Application workloads verified"

