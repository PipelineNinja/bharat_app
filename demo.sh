#!/bin/bash

# Colors for clean demo output
TEXT_COLOR="\e[36m"
CMD_COLOR="\e[33m"
RESET="\e[0m"

pause() {
  read -p ""
}

show_text() {
  clear
  echo -e "${TEXT_COLOR}$1${RESET}"
  echo
  echo "Press ENTER to continue..."
  pause
}

show_cmd() {
  echo
  echo -e "${CMD_COLOR}$ $1${RESET}"
  echo
  echo "Press ENTER to execute command..."
  pause
}

run_cmd() {
  eval "$1"
  echo
  echo "Press ENTER for next step..."
  pause
}

# --------------------------------------------------
# 1. Show EKS cluster nodes
# --------------------------------------------------
show_text "#1 Show that this is a real managed Kubernetes cluster (EKS)"
show_cmd "kubectl get nodes -o wide"
run_cmd "kubectl get nodes -o wide"

# --------------------------------------------------
# 2. Show application pods
# --------------------------------------------------
show_text "#2 Show that application pods are running and scheduled on node"
show_cmd "kubectl get pods -n bharat-app -o wide"
run_cmd "kubectl get pods -n bharat-app -o wide"

# --------------------------------------------------
# 3. Show deployment status
# --------------------------------------------------
show_text "#3 Show deployment status, replicas, and readiness"
show_cmd "kubectl get deploy -n bharat-app"
run_cmd "kubectl get deploy -n bharat-app"

# --------------------------------------------------
# 4. Show persistent storage (PVC)
# --------------------------------------------------
show_text "#4 Show persistent storage attached to the application (EBS via PVC)"
show_cmd "kubectl get pvc -n bharat-app"
run_cmd "kubectl get pvc -n bharat-app"

# --------------------------------------------------
# 5. Show HPA
# --------------------------------------------------
show_text "#5 Show Horizontal Pod Autoscaler configuration (auto-scaling enabled)"
show_cmd "kubectl get hpa -n bharat-app"
run_cmd "kubectl get hpa -n bharat-app"

# --------------------------------------------------
# 6. Show container image from ECR
# --------------------------------------------------
show_text "#6 Show container image source proving CI/CD from AWS ECR"
show_cmd "kubectl describe deploy bharat-app -n bharat-app | grep -i image"
run_cmd "kubectl describe deploy bharat-app -n bharat-app | grep -i image"

# --------------------------------------------------
# 7. Show LoadBalancer exposure
# --------------------------------------------------
show_text "#7 Show that the application is exposed publicly via LoadBalancer"
show_cmd "kubectl get svc -n bharat-app"
run_cmd "kubectl get svc -n bharat-app"

# --------------------------------------------------
# 8. Trigger GitHub Actions CI/CD
# --------------------------------------------------
show_text "#8 Triggering GitHub Actions for rolling deployment on EKS"

show_cmd "git status"
run_cmd "git status"

show_cmd "git add ."
run_cmd "git add ."

show_cmd "git commit -m \"Trigger CI pipeline\""
run_cmd "git commit -m \"Trigger CI pipeline\""

show_cmd "git push origin main"
run_cmd "git push origin main"

# --------------------------------------------------
# END
# --------------------------------------------------
clear
echo -e "${TEXT_COLOR}🎉 Demo completed successfully!${RESET}"

