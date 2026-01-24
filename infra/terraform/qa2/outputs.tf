output "bastion_public_ip" {
  value       = aws_instance.bastion.public_ip
  description = "Public IP of the bastion host"
}

output "docker_host_public_ip" {
  value       = var.docker_host_public ? aws_instance.docker_host.public_ip : null
  description = "Public IP of the docker host (only if public)"
}

output "docker_host_private_ip" {
  value       = aws_instance.docker_host.private_ip
  description = "Private IP of the docker host"
}

output "alb_dns_name" {
  value       = var.enable_alb ? aws_lb.qa[0].dns_name : null
  description = "Public DNS name of the ALB (if enabled)"
}
