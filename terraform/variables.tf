variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "project" {
  description = "Project name"
  type        = string
  default     = "urban-district"
}

variable "env" {
  description = "Deployment environment (dev, staging, prod)"
  type        = string
}

variable "domain" {
  description = "Root domain name"
  type        = string
  default     = "urban-district.click"
}

variable "root_domain" {
  description = "Main domain"
  default     = "urban-district.click"
}