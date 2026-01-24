#!/bin/bash
set -e

yum update -y
yum install -y git

# Basic hardening defaults (simple)
sed -i 's/^#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config || true
systemctl restart sshd || true
