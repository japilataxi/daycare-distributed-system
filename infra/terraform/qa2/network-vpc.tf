resource "aws_vpc" "qa" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "${local.name_prefix}-vpc"
  }
}

resource "aws_internet_gateway" "qa" {
  vpc_id = aws_vpc.qa.id

  tags = {
    Name = "${local.name_prefix}-igw"
  }
}
