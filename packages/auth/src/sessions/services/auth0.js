import auth0 from "auth0-js";

class Auth0 {
  auth = new auth0.WebAuth(AUTH0_CONFIG);

  constructor() {
    this.login = this.login.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
  }

  login() {
    this.auth.authorize();
  }

  handleAuthentication(callback) {
    this.auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        callback(authResult.accessToken);
      } else if (err) {
        console.log(
          `Error: ${err.error}. Check the console for further details.`
        );
      }
    });
  }
}

const authzero = new Auth0();

export default authzero;
