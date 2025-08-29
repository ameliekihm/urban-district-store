terraform {
  backend "s3" {
    bucket         = "urban-district-tfstate"   
    key            = "terraform.tfstate"        
    region         = "us-east-1"                
    dynamodb_table = "urban-district-tflock"    
    encrypt        = true
  }
}
