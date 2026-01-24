#!/bin/bash
set -e

yum update -y
amazon-linux-extras install docker -y
yum install -y git

systemctl enable docker
systemctl start docker

usermod -aG docker ec2-user

# Install Docker Compose v2 as standalone binary (simple & reliable)
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Optional convenience
ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose

echo "Docker and Docker Compose installed." > /etc/motd
