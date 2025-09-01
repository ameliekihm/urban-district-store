# Urban District Store 🛍️
<div align="center">
   <img width="850" height="300" alt="Image" src="https://github.com/user-attachments/assets/8be9269f-9edc-4a9a-8d9a-b5594a0fe309" />
</div>

> **React + AWS Serverless + Terraform** e-commerce platform migrated from Firebase to AWS, featuring a fully automated multi-environment CI/CD pipeline.

## 1. Project Overview

Urban District Store is a **React-based e-commerce platform** that allows users to browse products, manage shopping carts, and authenticate via Google OAuth2.  
Originally built using **Firebase + Cloudinary + Netlify**, the project has been fully migrated to an **AWS Serverless Architecture** with Terraform-managed infrastructure and GitHub Actions CI/CD.

## 2. Live Demo

| Environment     | URL                                                                  | Purpose             |
| --------------- | -------------------------------------------------------------------- | ------------------- |
| **Production**  | [https://urban-district.click](https://urban-district.click)                 | Live site           |
| **Staging**     | [https://staging.urban-district.click](https://staging.urban-district.click) | Pre-release testing |
| **Development** | [https://dev.urban-district.click](https://dev.urban-district.click)         | Active development  |

## 3. Key Features

- ### Authentication & User Management
   - Google OAuth2 login using **AWS Cognito** (OIDC)
   - Role-based admin support for product management
   - Session persistence and profile synchronization

- ### Product Management
   - Create, edit, and delete products
   - Image uploads using **AWS S3** (Lambda-based Pre-signed URL)
   - Detailed product pages with customer reviews

- ### Shopping Cart & Orders
   - Add/remove products from the cart
   - DynamoDB-powered real-time updates
   - Order summary with subtotal and shipping cost calculation

- ### Admin Features
   - Role-based access control using AWS Cognito
   - Admin users can see a pencil icon ✏️ in the top navigation bar
     <img width="570" height="36" alt="Image" src="https://github.com/user-attachments/assets/b6c23459-5977-4157-9a61-154919942d0a" />
   - Clicking the icon opens the Add New Product form
   - New products are uploaded to AWS S3 (images) and stored in DynamoDB (metadata)
   - Regular users cannot see the pencil icon or access the product upload page


## 4. System Architecture

```plaintext
React 
   │
   ├── CloudFront + S3 (Static Hosting)
   │
   ├── Cognito (Google OAuth2 + RBAC)
   │
   ├── API Gateway → Lambda → DynamoDB (Products & Carts)
   │
   ├── S3 (Image Storage) ← Pre-signed URL via Lambda
   │
   └── Route 53 (HTTPS + Custom Domain)
   │
   └── SSM Parameter Store (Multi-Env Variable Management)
```
<div align="center">
   <img width="900" height="363" alt="Image" src="https://github.com/user-attachments/assets/342b7f4a-cf3a-46d1-9746-62f69c451542" />
</div>


## 5. Infrastructure & Deployment

- ### Multi-Environment Setup
  - Fully isolated environments: **dev**, **staging**, **prod**
  - Separate AWS resources per environment: S3, CloudFront, Route53, Cognito, DynamoDB
  - Managed entirely via **Terraform**

- ### CI/CD Pipeline
   - **Branch Strategy**:
    `feature/*`(`dev`) →  → `staging` → `main`
- **Automatic Deployments**:
  - Pushing to `dev` → deploys to [dev.urban-district.click](https://dev.urban-district.click)
  - Pushing to `staging` → deploys to [staging.urban-district.click](https://staging.urban-district.click)
  - Merging to `main` → deploys to [urban-district.click](https://urban-district.click)

<div align="center">
   <img width="819" height="331" alt="Image" src="https://github.com/user-attachments/assets/3cb19550-4b80-4d33-b88d-d5f3bed42fc6" />
</div>

- ### Terraform Highlights
   - Infrastructure as Code (**IaC**) for consistent, repeatable deployments
   - Uses `terraform refresh` to detect and resolve console drift
   - Environment-specific state files managed remotely

## 6. Folder Structure

```plaintext
urban-district-store/
├── .github/workflows/
│   └── deploy.yml        # GitHub Actions for auto-deployment
├── public/
│   ├── env.*.js          # Environment-specific variables
│   ├── images/
│   ├── reviews.csv
│   └── index.html
├── src/
│   ├── api/              # AWS API modules (DynamoDB, S3, SSM)
│   ├── components/ui     # Reusable UI components
│   ├── context           # Authentication context
│   ├── hooks             # Custom React hooks
│   ├── pages             # Product pages, Cart, Checkout, etc.
│   └── App.js
├── terraform/
│   ├── dev/              # Dev environment Terraform configs
│   ├── staging/          # Staging environment Terraform configs
│   ├── prod/             # Production environment Terraform configs
│   └── lambda/           # AWS Lambda source code
└── package.json
```



## 7. Getting Started

```bash
git clone https://github.com/ameliekihm/urban-district.git
cd urban-district
yarn install
yarn start
```

### Environment Variables

`.env.local` example:

```env
REACT_APP_API_URL=https://api.dev.urban-district.click
REACT_APP_COGNITO_DOMAIN=us-east-16o6di1fuy.auth.us-east-1.amazoncognito.com
REACT_APP_COGNITO_CLIENT_ID=xxxxxx
REACT_APP_S3_BUCKET=urban-district-dev
```



## 8. Tech Stack

| Layer        | Technology                  |
| ------------ | --------------------------- |
| **Frontend** | React, Tailwind CSS      |
| **Auth**     | AWS Cognito + Google OAuth2 |
| **Database** | AWS DynamoDB                |
| **Storage**  | AWS S3                      |
| **API**      | API Gateway + Lambda        |
| **Infra**    | Terraform, GitHub Actions   |
| **Deploy**   | S3 + CloudFront + Route53   |



## 9. Project Timeline

| Date       | Change                               | Commit                                                              |
| ---------- | ------------------------------------ | ------------------------------------------------------------------- |
| 2025.08.22 | Added Cognito-based Google login     | `feat: Implement Google login redirect with AWS Cognito`            |
| 2025.08.23 | Migrated DB from Firebase → DynamoDB | `feat: migrate product & cart DB from Firebase to DynamoDB`         |
| 2025.08.24 | Moved image uploads to S3            | `feat: migrate image upload from Cloudinary to AWS S3 using Lambda` |
| 2025.08.27 | Converted APIs to serverless         | `feat: migrate product & cart APIs to AWS serverless architecture`  |
| 2025.08.28 | Added Terraform IaC setup            | `feat(terraform): add IaC setup for dev/staging/prod`               |
| 2025.08.29 | Implemented GitHub Actions CI/CD     | `chore: setup multi-environment CI/CD pipeline (dev/staging/prod)`  |
| 2025.08.30 | Staging environment deployment       | `chore: initial staging setup for CI/CD deployment`                 |
| 2025.09.01 | Synced production environment        | `chore(terraform/prod): sync prod environment with console values`  |



## 10. Learning Highlights

- Migrated from **Firebase** to a full **AWS Serverless Architecture**
- Integrated **Cognito + Google OAuth2** authentication
- Built environment-isolated infrastructure with **Terraform**
- Implemented multi-environment **CI/CD** using GitHub Actions
- Learned advanced AWS services: DynamoDB, S3, API Gateway, Lambda, CloudFront
