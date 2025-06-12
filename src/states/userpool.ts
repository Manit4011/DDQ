import { CognitoUserPool, CognitoUser } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.REACT_APP_POOL_ID as string,
  ClientId: process.env.REACT_APP_APP_CLIENT_ID as string,
};

const userPool = new CognitoUserPool(poolData);

export const confirmUserRegistration = (
  email: string,
  code: string
): Promise<void> => {
  const user = new CognitoUser({ Username: email, Pool: userPool });

  return new Promise((resolve, reject) => {
    user.confirmRegistration(code, true, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export const resendConfirmationCode = (email: string): Promise<void> => {
  const user = new CognitoUser({ Username: email, Pool: userPool });

  return new Promise((resolve, reject) => {
    user.resendConfirmationCode((err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export const initiateForgotPassword = (email: string): Promise<void> => {
  const user = new CognitoUser({ Username: email, Pool: userPool });
  
  return new Promise((resolve, reject) => {
    user.forgotPassword({
      onSuccess: () => resolve(),
      onFailure: (err) => reject(err),
    });
  });
};

export const confirmForgotPassword = (
  email: string,
  code: string,
  newPassword: string
): Promise<void> => {
  const user = new CognitoUser({ Username: email, Pool: userPool });

  return new Promise((resolve, reject) => {
    user.confirmPassword(code, newPassword, {
      onSuccess: () => resolve(),
      onFailure: (err) => reject(err),
    });
  });
};
export default userPool;