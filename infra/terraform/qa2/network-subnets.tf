resource "aws_subnet" "public_1" {
  vpc_id                  = aws_vpc.qa.id
  cidr_block              = var.public_subnet_1_cidr
  availability_zone       = var.az_1
  map_public_ip_on_launch = true

  tags = {
    Name = "${local.name_prefix}-public-1"
    Tier = "public"
  }
}

resource "aws_subnet" "public_2" {
  vpc_id                  = aws_vpc.qa.id
  cidr_block              = var.public_subnet_2_cidr
  availability_zone       = var.az_2
  map_public_ip_on_launch = true

  tags = {
    Name = "${local.name_prefix}-public-2"
    Tier = "public"
  }
}

resource "aws_subnet" "private_1" {
  vpc_id            = aws_vpc.qa.id
  cidr_block        = var.private_subnet_1_cidr
  availability_zone = var.az_1

  tags = {
    Name = "${local.name_prefix}-private-1"
    Tier = "private"
  }
}

resource "aws_subnet" "private_2" {
  vpc_id            = aws_vpc.qa.id
  cidr_block        = var.private_subnet_2_cidr
  availability_zone = var.az_2

  tags = {
    Name = "${local.name_prefix}-private-2"
    Tier = "private"
  }
}
