var Msal = require("msal");
// https://docs.microsoft.com/nl-nl/azure/active-directory/develop/scenario-web-app-sign-user-app-registration?tabs=aspnetcore#register-an-app-by-using-the-quickstarts
const msalConfig = {
  auth: {
    clientId: "e56326cc-38b0-4d16-9630-d2d4e265fb7d",
    authority: "https://login.microsoftonline.com/457d5685-0467-4d05-b23b-8f817adda47c",
    redirectUri: process.env.NODE_ENV === "development" ? "https://localhost:8762" : "https://nlbavwixs.infor.com:8762",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};
const loginRequest = {
  scopes: ["openid", "profile", "User.Read"],
};
const myMSALObj = new Msal.UserAgentApplication(msalConfig);

function getTokenPopup(request) {
  return myMSALObj.acquireTokenSilent(request).catch((error) => {
    console.log(error);
    console.log("silent token acquisition fails. acquiring token using popup");

    // fallback to interaction when silent call fails
    return myMSALObj
      .acquireTokenPopup(request)
      .then((tokenResponse) => {
        return tokenResponse;
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

export function signOut() {
  myMSALObj.logout();
}
export async function signIn() {
  try {
    const loginResponse = await myMSALObj.loginPopup(loginRequest);

    if (loginResponse) {
      console.log("id_token acquired at: " + new Date().toString());
      console.log(loginResponse);
      const auth = myMSALObj.getAccount();
      console.log({ auth });
      if (auth) {
        if (auth && auth.userName) {
          return auth;
        }
      }
    }
  } catch (error) {
    console.log(error);
    return null;
  }
  return null;
}
