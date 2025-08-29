output "project_name" {
  description = "Project name"
  value       = var.project
}

output "environment" {
  value = var.env
}


output "domain" {
  description = "Root domain name"
  value       = var.domain
}

output "region" {
  description = "AWS region"
  value       = var.aws_region
}
