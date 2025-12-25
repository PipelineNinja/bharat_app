#!/bin/bash
clear

echo "▶ Verifying managed Kubernetes cluster (Amazon EKS)"
echo
echo "This confirms:"
echo "- Managed control plane"
echo "- Worker nodes"
echo "- AWS-backed infrastructure"
echo

read

echo
echo "$ kubectl get nodes -o wide"
read
kubectl get nodes -o wide

echo
echo "✔ Cluster verification completed"

