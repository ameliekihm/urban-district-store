resource "aws_lambda_function" "functions" {
  for_each         = var.lambda_functions
  function_name    = each.value.name
  role             = each.value.role_arn
  handler          = each.value.handler
  runtime          = each.value.runtime
  memory_size      = each.value.memory_size
  timeout          = each.value.timeout

  filename         = "${path.module}/../lambda/dist/dev/${each.value.source}"
  source_code_hash = filebase64sha256("${path.module}/../lambda/dist/dev/${each.value.source}")

  lifecycle {
    ignore_changes = [
      role,
      filename,
      source_code_hash,
      publish
    ]
  }
}