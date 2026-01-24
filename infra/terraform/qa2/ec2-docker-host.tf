resource "aws_instance" "docker_host" {
  ami           = data.aws_ami.amazon_linux_2.id
  instance_type = var.instance_type_docker_host

  subnet_id = var.docker_host_public ? aws_subnet.public_2.id : aws_subnet.private_1.id

  vpc_security_group_ids = [aws_security_group.docker_host_sg.id]
  key_name               = var.key_pair_name

  associate_public_ip_address = var.docker_host_public ? true : false

  user_data = file("${path.module}/user-data/docker-host.sh")

  root_block_device {
    volume_size = var.root_volume_size_gb
    volume_type = "gp3"
  }

  tags = {
    Name = "${local.name_prefix}-docker-host"
    Role = "docker-host"
  }

  depends_on = [
    aws_route_table_association.public_2,
    aws_route_table_association.private_1
  ]
}
