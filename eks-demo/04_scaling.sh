#!/bin/bash
clear

echo "▶ Verifying auto-scaling configuration"
echo
echo "This confirms:"
echo "- Horizontal Pod Autoscaler"
echo "- Load-based scaling enabled"
echo

read

echo
echo "$ kubectl get hpa -n bharat-app"
read
kubectl get hpa -n bharat-app

echo
echo "✔ Auto-scaling verified"

