var Msal = require("msal");
const msalConfig = {
  auth: {
    clientId: "e56326cc-38b0-4d16-9630-d2d4e265fb7d",
    authority: "https://login.microsoftonline.com/457d5685-0467-4d05-b23b-8f817adda47c",
    redirectUri: "https://localhost:8762",
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

function signOut() {
  myMSALObj.logout();
}
export async function signIn() {
  try {
    const loginResponse = await myMSALObj.loginPopup(loginRequest);

    if (loginResponse) {
      console.log("id_token acquired at: " + new Date().toString());
      console.log(loginResponse);

      if (myMSALObj.getAccount()) {
        const auth = myMSALObj.getAccount();
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
