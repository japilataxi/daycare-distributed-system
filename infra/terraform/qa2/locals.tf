locals {
  name_prefix = "${var.project_name}-${var.environment}"

  http_ingress_cidr = var.enable_alb ? null : "0.0.0.0/0"
}
