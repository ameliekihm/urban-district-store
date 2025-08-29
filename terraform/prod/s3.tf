data "aws_s3_bucket" "frontend" {
  bucket = "urban-district.click"
}

resource "aws_s3_bucket_policy" "frontend" {
  bucket = data.aws_s3_bucket.frontend.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid    = "AllowCloudFrontOAI",
        Effect = "Allow",
        Principal = {
          AWS = "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity E1OU08X145X8DY"
        },
        Action   = "s3:GetObject",
        Resource = "arn:aws:s3:::${data.aws_s3_bucket.frontend.id}/*"
      }
    ]
  })
}
