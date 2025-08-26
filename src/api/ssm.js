import { SSMClient, GetParametersCommand } from '@aws-sdk/client-ssm';

const ssmClient = new SSMClient({
  region: 'us-east-1',
});

export async function getEnvParams() {
  const command = new GetParametersCommand({
    Names: [
      '/urban-district-store/REACT_APP_COGNITO_DOMAIN',
      '/urban-district-store/REACT_APP_COGNITO_CLIENT_ID',
      '/urban-district-store/REACT_APP_COGNITO_SIGNIN_REDIRECT_URI',
      '/urban-district-store/REACT_APP_COGNITO_SIGNOUT_REDIRECT_URI',
      '/urban-district-store/REACT_APP_COGNITO_USER_POOL_ID',
      '/urban-district-store/REACT_APP_COGNITO_IDENTITY_POOL_ID',
      '/urban-district-store/REACT_APP_DDB_PRODUCTS_TABLE',
      '/urban-district-store/REACT_APP_DDB_CARTS_TABLE',
      '/urban-district-store/REACT_APP_AWS_REGION',
      '/urban-district-store/REACT_APP_LAMBDA_UPLOAD_URL',
    ],
    WithDecryption: false,
  });

  const response = await ssmClient.send(command);
  const envs = {};
  response.Parameters.forEach((param) => {
    const key = param.Name.split('/').pop();
    envs[key] = param.Value;
  });
  return envs;
}
