resource "aws_apigatewayv2_api" "urban_district_api" {
  name          = "${var.project}-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["GET", "POST", "DELETE", "OPTIONS", "PUT"]
    allow_headers = ["*"]
  }
}

resource "aws_apigatewayv2_stage" "dev" {
  api_id      = aws_apigatewayv2_api.urban_district_api.id
  name        = var.env
  auto_deploy = true
  description = "Staging Environment"
}

resource "aws_apigatewayv2_integration" "lambda_integration" {
  for_each = {
    for k, v in aws_lambda_function.functions : k => v
    if k != "getUploadUrl"
  }

  api_id                 = aws_apigatewayv2_api.urban_district_api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.functions[each.key].arn
  payload_format_version = "2.0"

  lifecycle {
    ignore_changes = [
      request_parameters,
      integration_uri
    ]
  }
}


resource "aws_apigatewayv2_route" "routes" {
  for_each = {
    "POST /products"           = { function = "productApi" }
    "GET /products"            = { function = "productApi" }
    "ANY /cart"                = { function = "cartApi" }
    "DELETE /cart/{productId}" = { function = "cartApi" }
  }

  api_id    = aws_apigatewayv2_api.urban_district_api.id
  route_key = each.key
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration[each.value.function].id}"

  lifecycle {
    ignore_changes = [target]
  }
}

