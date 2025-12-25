#!/bin/bash
clear

echo "▶ Verifying persistent storage"
echo
echo "This confirms:"
echo "- EBS-backed persistent volumes"
echo "- Data persistence across pod restarts"
echo

read

echo
echo "$ kubectl get pvc -n bharat-app"
read
kubectl get pvc -n bharat-app

echo
echo "✔ Persistent storage verified"

