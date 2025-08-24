import { v4 as uuid } from 'uuid';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  QueryCommand,
  ScanCommand,
  DeleteCommand,
} from '@aws-sdk/lib-dynamodb';

const REGION = process.env.REACT_APP_AWS_REGION;
const IDENTITY_POOL_ID = process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID;
const USER_POOL_ID = process.env.REACT_APP_COGNITO_USER_POOL_ID;

const PRODUCTS_TABLE = process.env.REACT_APP_DDB_PRODUCTS_TABLE;
const CARTS_TABLE = process.env.REACT_APP_DDB_CARTS_TABLE;

let cachedIdToken = null;
let ddbDoc = null;

function getClient() {
  const idToken = localStorage.getItem('id_token') || '';

  if (ddbDoc && cachedIdToken === idToken) return ddbDoc;

  const loginsKey = `cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}`;

  const base = new DynamoDBClient({
    region: REGION,
    credentials: fromCognitoIdentityPool({
      clientConfig: { region: REGION },
      identityPoolId: IDENTITY_POOL_ID,
      logins: idToken ? { [loginsKey]: idToken } : undefined,
    }),
  });

  ddbDoc = DynamoDBDocumentClient.from(base, {
    marshallOptions: { removeUndefinedValues: true },
  });
  cachedIdToken = idToken;

  return ddbDoc;
}

export async function addNewProduct(product, image) {
  const id = uuid();
  const item = {
    id,
    ...product,
    price: parseInt(product.price, 10),
    image,
    option: product.options.split(',').map((o) => o.trim()),
    createdAt: Date.now(),
  };

  await getClient().send(
    new PutCommand({
      TableName: PRODUCTS_TABLE,
      Item: item,
    })
  );
  return item;
}

export async function getProducts() {
  const res = await getClient().send(
    new ScanCommand({
      TableName: PRODUCTS_TABLE,
    })
  );
  return res.Items || [];
}

export async function addOrUpdateCart(userId, product) {
  const item = {
    userId,
    productId: product.id,
    quantity: product.quantity || 1,
    snapshot: {
      id: product.id,
      title: product.title,
      price: Number(product.price),
      image: product.image,
      option: product.option,
    },
  };

  await getClient().send(
    new PutCommand({
      TableName: CARTS_TABLE,
      Item: item,
    })
  );
  return item;
}

export async function getCart(userId) {
  const res = await getClient().send(
    new QueryCommand({
      TableName: CARTS_TABLE,
      KeyConditionExpression: 'userId = :u',
      ExpressionAttributeValues: {
        ':u': userId,
      },
    })
  );

  return (res.Items || []).map((item) => ({
    id: item.productId,
    quantity: item.quantity,
    ...item.snapshot,
  }));
}

export async function removeFromCart(userId, productId) {
  await getClient().send(
    new DeleteCommand({
      TableName: CARTS_TABLE,
      Key: {
        userId,
        productId,
      },
    })
  );
}
