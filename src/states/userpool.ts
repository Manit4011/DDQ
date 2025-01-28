import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.REACT_APP_POOL_ID as string,
  ClientId: process.env.REACT_APP_APP_CLIENT_ID as string,
};

const userPool = new CognitoUserPool(poolData);
export default userPool;