data "aws_route53_zone" "primary" {
  name         = "urban-district.click."
  private_zone = false
}

resource "aws_route53_record" "frontend" {
  zone_id = data.aws_route53_zone.primary.zone_id
  name    = "urban-district.click"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.frontend.domain_name
    zone_id                = aws_cloudfront_distribution.frontend.hosted_zone_id
    evaluate_target_health = false
  }
}
