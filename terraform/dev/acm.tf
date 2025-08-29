variable "acm_certificate_arn" {
  description = "Existing ACM certificate ARN"
  type        = string
  default     = "arn:aws:acm:us-east-1:835175800383:certificate/7de32f08-406d-4eaa-b38e-500457c57d03"
}

data "aws_acm_certificate" "existing" {
  domain      = var.root_domain
  statuses    = ["ISSUED"]
  most_recent = true
}

output "acm_certificate_arn" {
  value = var.acm_certificate_arn != "" ? var.acm_certificate_arn : data.aws_acm_certificate.existing.arn
}
