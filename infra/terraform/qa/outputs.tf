output "bastion_ip" {
  value = aws_instance.bastion.public_ip
}

output "docker_host_ip" {
  value = aws_instance.docker_host.public_ip
}
