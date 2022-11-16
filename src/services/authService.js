const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const AWS = require('aws-sdk');
const dotenv = require("dotenv");
//const fetch = require("node-fetch");

dotenv.config({ path: './.env' });

const poolData = { UserPoolId: process.env.USER_POOL_ID, ClientId: process.env.APP_CLIENT_ID };

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const createUser = async (info) => {
    try {
        return new Promise((resolve, reject) => {
            let attributesList = [];
            attributesList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
                Name: "custom:country",
                Value: "India"
            }));
            attributesList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
                Name: "custom:age",
                Value: "24"
            }));

            userPool.signUp(info.email, info.password, attributesList, null, ((error, result) => {
                if (error) {
                    return reject(error)
                }
                else {
                    return resolve(result);
                }

            }))
        })
    } catch (error) {
        throw error;
    }

}

const loginUser = (params) => {
    const userData = getCognitoUserDetails(params.email, params.password);
    const authenticationDetails = userData.authenticationDetails;
    const cognitoUser = userData.cognitoUser;

    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
                resolve({
                    accssToken: result.getAccessToken().getJwtToken(),
                    id_token: result.getIdToken().getJwtToken(),
                    refresh_token: result.getRefreshToken().getToken()
                })
            },
            onFailure: (err) => {
                reject(err);
            },
        });
    })
}

const deleteUser = (params) => {
    const userData = getCognitoUserDetails(params.email, params.password);
    const authenticationDetails = userData.authenticationDetails;
    const cognitoUser = userData.cognitoUser;
    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
                cognitoUser.deleteUser((err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            },
            onFailure: (err) => {
                reject(err);
            },
        });
    })
}

const changePassword = (params) => {
    const userData = getCognitoUserDetails(params.email, params.password);
    const authenticationDetails = userData.authenticationDetails;
    const cognitoUser = userData.cognitoUser;
    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
                cognitoUser.changePassword(params.password, params.newPassword, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            },
            onFailure: (err) => {
                reject(err);
            },
        });
    })
}

const getCognitoUserDetails = (email, pass) => {
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: email,
        Password: pass,
    });

    const userData = {
        Username: email,
        Pool: userPool
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    return {
        authenticationDetails,
        cognitoUser
    };
}

module.exports = { createUser, deleteUser, loginUser, changePassword }