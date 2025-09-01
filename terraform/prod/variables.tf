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
  type        = string
  default     = "urban-district.click"
}

variable "bucket_name" {
  description = "S3 bucket name for storing images"
  type        = string
  default     = "urban-district-images"
}

variable "carts_table" {
  description = "DynamoDB table for carts"
  type        = string
  default     = "urban-district-carts-v2"
}

variable "products_table" {
  description = "DynamoDB table for products"
  type        = string
  default     = "urban-district-products"
}

variable "lambda_functions" {
  type = map(object({
    name        = string
    role_arn    = string
    handler     = string
    runtime     = string
    memory_size = number
    timeout     = number
    source      = string
  }))

  default = {
    cartApi = {
      name        = "urban-district-cart-api"
      role_arn    = "arn:aws:iam::835175800383:role/urban-district-cart-api-role-cnf7onga"
      handler     = "index.handler"
      runtime     = "nodejs22.x"
      memory_size = 128
      timeout     = 3
      source      = "urban-district-cart-api.zip"
    }

    getUploadUrl = {
      name        = "urban-district-getUploadUrl"
      role_arn    = "arn:aws:iam::835175800383:role/urban-district-getUploadUrl-role-b70hd9ri"
      handler     = "index.handler"
      runtime     = "nodejs22.x"
      memory_size = 128
      timeout     = 3
      source      = "urban-district-getUploadUrl.zip"
    }

    productApi = {
      name        = "urban-district-product-api"
      role_arn    = "arn:aws:iam::835175800383:role/urban-district-product-api-role-4cgbsyim"
      handler     = "index.handler"
      runtime     = "nodejs22.x"
      memory_size = 128
      timeout     = 3
      source      = "urban-district-product-api.zip"
    }
  }
}