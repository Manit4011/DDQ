import { AuthenticationDetails, CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import userpool from '../states/userpool';

export const authenticate=(Email: string,Password: string): Promise<CognitoUserSession> =>{
    return new Promise((resolve,reject)=>{
        const user=new CognitoUser({
            Username:Email,
            Pool:userpool
        });

        const authDetails= new AuthenticationDetails({
            Username:Email,
            Password
        });

        user.authenticateUser(authDetails,{
            onSuccess:(result)=>{
                console.log("login successful",result);
                resolve(result);
            },
            onFailure:(err)=>{
                console.log("login failed",err);
                reject(err);
            }
        });
    });
};

export const logout = () => {
    const user = userpool.getCurrentUser();
    user?.signOut();
    sessionStorage.removeItem('access-token');
    window.location.href = '/';
};

// export const getSession = async () => {
//     return await new Promise((resolve,reject) =>{
//         const user = userpool.getCurrentUser();
//         if(user){
//             user.getSession(async (err: any,session: unknown )=>{
//                 if(err){
//                     reject(err);
//                 }else{
//                     // resolve(session);
//                     const attributes =await new Promise((resolve,reject)=>{
//                         user.getUserAttributes((err,attributes) =>{
//                             if(err){
//                                 console.log(err);
//                                 reject(err);
//                             }else{
//                                 const results = {};
//                                 for(let attribute of attributes){
//                                     const {Name,Value} = attribute;
//                                     results[Name] = Value;
//                                 }
//                                 resolve(results);
//                                 console.log(results);
                                
//                             }
//                         })
//                     })
//                     resolve({user,...session,...attributes})
//                 }
//             })
//         }else{
//             reject();
//         }
//     })
// }
export const getSession = async () => {
    return await new Promise((resolve, reject) => {
        const user = userpool.getCurrentUser();
        if (user) {
            user.getSession(async (err: any, session: any) => {
                if (err) {
                    reject(err);
                } else {
                    try {
                        const attributes = await new Promise<Record<string, string>>((resolve, reject) => {
                            user.getUserAttributes((err, attributes) => {
                                if (err || !attributes) {
                                    console.error(err || "No attributes found");
                                    reject(err || new Error("No attributes found"));
                                } else {
                                    const results: Record<string, string> = {};
                                    for (const attribute of attributes) {
                                        const { Name, Value } = attribute;
                                        results[Name] = Value;
                                    }
                                    resolve(results);
                                    sessionStorage.setItem('user-email',results.email);
                                    sessionStorage.setItem('username',results.sub);
                                }
                            });
                        });
                        resolve({ user, session, attributes });
                    } catch (error) {
                        reject(error);
                    }
                }
            });
        } else {
            reject(new Error("No current user found"));
        }
    });
};
