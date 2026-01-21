variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "project_name" {
  type    = string
  default = "daycare-qa"
}

variable "key_pair_name" {
  type        = string
  description = "Existing EC2 Key Pair name (AWS Academy)"
}
