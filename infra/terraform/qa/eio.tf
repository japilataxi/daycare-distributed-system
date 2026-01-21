resource "aws_eip" "docker_host" {
  domain = "vpc"
  tags = { Name = "${var.project_name}-docker-host-eip" }
}

resource "aws_eip_association" "docker_host" {
  instance_id   = aws_instance.docker_host.id
  allocation_id = aws_eip.docker_host.id
}

output "docker_host_elastic_ip" {
  value = aws_eip.docker_host.public_ip
}
