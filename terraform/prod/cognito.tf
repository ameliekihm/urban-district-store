resource "aws_cognito_user_pool" "main" {
  name = "User pool - y5w0gk"

  auto_verified_attributes = ["email"]
  username_attributes      = ["email"]
  deletion_protection      = "ACTIVE"

  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
    recovery_mechanism {
      name     = "verified_phone_number"
      priority = 2
    }
  }

  email_configuration {
    email_sending_account = "COGNITO_DEFAULT"
  }

  password_policy {
    minimum_length                   = 8
    password_history_size            = 0
    require_lowercase                = true
    require_numbers                  = true
    require_symbols                  = true
    require_uppercase                = true
    temporary_password_validity_days = 7
  }

  schema {
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    name                     = "email"
    required                 = true
    string_attribute_constraints {
      min_length = "0"
      max_length = "2048"
    }
  }

  username_configuration {
    case_sensitive = false
  }

  verification_message_template {
    default_email_option = "CONFIRM_WITH_CODE"
  }
}

resource "aws_cognito_user_pool_client" "app" {
  name         = "urban-district"
  user_pool_id = aws_cognito_user_pool.main.id

  allowed_oauth_flows                  = ["code"]
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_scopes                 = ["email", "openid", "phone", "profile"]
  supported_identity_providers         = ["COGNITO", "Google"]

  callback_urls = [
    "http://localhost:3000/callback",
    "https://dev.urban-district.click/callback",
    "https://staging.urban-district.click/callback",
    "https://urban-district.click/callback"
  ]

  logout_urls = [
    "http://localhost:3000",
    "https://dev.urban-district.click",
    "https://staging.urban-district.click",
    "https://urban-district.click"
  ]

  explicit_auth_flows = [
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_SRP_AUTH",
    "ALLOW_USER_AUTH"
  ]

  read_attributes = [
    "address", "birthdate", "email", "email_verified", "family_name",
    "gender", "given_name", "locale", "middle_name", "name",
    "nickname", "phone_number", "phone_number_verified", "picture",
    "preferred_username", "profile", "updated_at", "website", "zoneinfo"
  ]

  write_attributes = [
    "address", "birthdate", "email", "family_name", "gender",
    "given_name", "locale", "middle_name", "name", "nickname",
    "phone_number", "picture", "preferred_username", "profile",
    "updated_at", "website", "zoneinfo"
  ]

  access_token_validity  = 60
  id_token_validity      = 60
  refresh_token_validity = 5
  token_validity_units {
    access_token  = "minutes"
    id_token      = "minutes"
    refresh_token = "days"
  }

  lifecycle {
    ignore_changes = [
      default_redirect_uri,
      auth_session_validity,
      enable_token_revocation,
      prevent_user_existence_errors,
      read_attributes,
      write_attributes,
    ]
  }
}

resource "aws_cognito_identity_pool" "main" {
  identity_pool_name               = "urban-district-identity"
  allow_unauthenticated_identities = true

  cognito_identity_providers {
    client_id               = aws_cognito_user_pool_client.app.id
    provider_name           = aws_cognito_user_pool.main.endpoint
    server_side_token_check = false
  }
}