variable "aws_region" {
  type        = string
  description = "AWS region for QA environment"
  default     = "us-east-1"
}

variable "project_name" {
  type        = string
  description = "Project name tag"
  default     = "daycare"
}

variable "environment" {
  type        = string
  description = "Environment name"
  default     = "qa"
}

variable "vpc_cidr" {
  type        = string
  description = "VPC CIDR"
  default     = "10.20.0.0/16"
}

variable "az_1" {
  type        = string
  description = "First availability zone"
  default     = "us-east-1a"
}

variable "az_2" {
  type        = string
  description = "Second availability zone"
  default     = "us-east-1b"
}

variable "public_subnet_1_cidr" {
  type    = string
  default = "10.20.1.0/24"
}

variable "public_subnet_2_cidr" {
  type    = string
  default = "10.20.2.0/24"
}

variable "private_subnet_1_cidr" {
  type    = string
  default = "10.20.11.0/24"
}

variable "private_subnet_2_cidr" {
  type    = string
  default = "10.20.12.0/24"
}

variable "key_pair_name" {
  type        = string
  description = "Existing EC2 Key Pair name (must exist in AWS)"
}

variable "ssh_allowed_cidr" {
  type        = string
  description = "CIDR allowed to SSH into bastion (use x.x.x.x/32). Temporary can be 0.0.0.0/0"
  default     = "0.0.0.0/0"
}

variable "docker_host_public" {
  type        = bool
  description = "Option A: true = public Docker host. Option B: false = private Docker host (requires NAT)."
  default     = true
}

variable "enable_alb" {
  type        = bool
  description = "Optional: Create a public ALB in front of the Docker host"
  default     = false
}

variable "instance_type_bastion" {
  type    = string
  default = "t3.micro"
}

variable "instance_type_docker_host" {
  type    = string
  default = "t3.small"
}

variable "root_volume_size_gb" {
  type        = number
  description = "Root volume size for instances"
  default     = 30
}
