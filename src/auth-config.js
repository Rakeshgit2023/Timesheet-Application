import { LogLevel } from "@azure/msal-browser";

export  const msalConfig = {
    auth:{
        clientId:'9cec9b09-96ef-418e-8a07-bb88954be683',
        authority:'https://login.microsoftonline.com/06191626-9f52-42fe-8889-97d24d7a6e95',
        redirectUrl:'/role',
        postLogoutRedirectUrl:'/',
     
        navigateToLoginRequestUrl:false,
    },
    cache:{

        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie:false,
    },
    system:{
        loggerOptions:{
            loggerCallback: (level,message,containsPii) =>{

                if(containsPii){
                    return ;
                }
                switch (level){
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;   
                    case LogLevel.Warning:
                        console.warn(message);
                        return;   
                    default:
                        return;    
                }
            },
        },
    },
};


export const loginRequest = {
    scopes: ['user.read'],
};