
import auth0 from 'auth0-js';
import Auth0 from 'auth0-lock';

import { auth0Config } from '../config';

import { maybeSetToken } from './apiCalls/api';


export default class Auth {
  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.renewalInProgress = false;
    // this.auth0Lock = auth0Lock.Auth0LockPasswordless;

    const passwordlessOptions = {
      // allowedConnections: ['email', 'google'],
      // passwordlessMethod: 'code',
      auth: {
        redirectUrl: auth0Config.redirectUrl,
        responseType: 'token id_token',
        params: {
          scope: 'openid email profile'
        }
      },
      // container: 'hiw-login-container',
      autoclose: true,
      loginAfterSignUp: true,
      // closable: true,
      languageDictionary: {
        // signUpTerms: "I agree to the <a href='/terms' target='_new'>terms of service</a> and <a href='/privacy' target='_new'>privacy policy</a>.",
        title: auth0Config.name,
      },
      theme: {
        labeledSubmitButton: true,
        logo: auth0Config.logo,
        primaryColor: auth0Config.primaryColor,
        // authButtons: {
        //   connectionName: {
        //     displayName: "...",
        //     primaryColor: "...",
        //     foregroundColor: "...",
        //     icon: "https://.../logo.png"
        //   }
        // }
      }
    };

    // const lockPasswordless = new Auth0LockPasswordless(
    //   auth0Config.clientId,
    //   auth0Config.domain,
    //   passwordlessOptions
    // );
    //
    // this.lock = lockPasswordless;
    this.lock = new Auth0(auth0Config.clientId, auth0Config.domain, passwordlessOptions);
    this.auth0 = new auth0.WebAuth({
      domain: auth0Config.domain,
      clientID: auth0Config.clientId,
    })
    // global.lock = this.auth0;
  }

  login(Router) {
    this.lock.show();
    // this.auth0.authorize({
    //   audience: 'https://customerfeedback.io',
    //   // scope: 'read:order write:order',
    //   responseType: 'token',
    //   redirectUri: auth0Config.redirectUrl
    // });
    this.lock.on("authenticated", (authResult) => {
      this.setSession(authResult, null);
      // this.auth0.hide();
      if (Router) {
        Router.push({
          pathname: '/projects',
          query: { }
        })
      }
    })
    // this.auth0.authorize();
    this.lock.checkSession({}, (err, authResult) => {
      if (!err && authResult) {
        this.setSession(authResult, null);
      }
      // handle error or new tokens
    });
  }

  handleAuthentication(history) {
    this.auth0.parseHash((err, authResult) => {
      // { url: 'board', query: { boardID }}
      let redirect = localStorage.getItem('@NOCO-redirect')
      if (redirect) redirect = JSON.parse(redirect);
      else redirect = { query: '', url: '' }
      const { url, query } = redirect;

      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult, history);
        history.push({
          pathname: url ? `/${url}` : '/projects',
          query: query ? query : { },
        })
        localStorage.removeItem('@NOCO-redirect');
      } else if (err) {
          if (err.error) err = `${err.error} - ${err.errorDescription}`;        history.push({
          pathname: '/',
          query: { error: err }
        })
      }
    });
  }

  getSession() {
    const access_token = localStorage.getItem('@NOCO-access_token');
    const id_token = localStorage.getItem('@NOCO-id_token');
    return { access_token, token: id_token };
  }

  setSession(authResult, history, navigate = true) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify((authResult.idTokenPayload.exp * 1000));
    localStorage.setItem('@NOCO-access_token', authResult.accessToken);
    localStorage.setItem('@NOCO-id_token', authResult.idToken);
    localStorage.setItem('@NOCO-expires_at', expiresAt);
    this.scheduleRenewal()
    // navigate to the home route
    if (history && navigate) {
      history.push({
        pathname: '/projects',
      })
    }
  }

  logout(history) {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('@NOCO-access_token');
    localStorage.removeItem('@NOCO-id_token');
    localStorage.removeItem('@NOCO-expires_at');
    // navigate to the home route
    history.push({
      pathname: '/',
    })
    window.location = `https://${auth0Config.domain}/v2/logout?returnTo=${auth0Config.redirectUrl.replace('/callback', '')}&client_id=${auth0Config.clientId}`
  }

  renewToken() {
    this.auth0.checkSession({},
      (err, result) => {
        if (err) {
          console.error(`Could not get a new token (${err.error}: ${err.error_description}).`);
        } else {
          this.setSession(result, null, false);
        }
      }
    );
  }

  scheduleRenewal() {
    if (this.renewalInProgress) return;
    this.renewalInProgress = true;
    setTimeout(() => {
      this.renewalInProgress = false;
    }, 10000)
    const expiresAt = JSON.parse(localStorage.getItem('@NOCO-expires_at'));
    const delay = expiresAt - Date.now();
    if (delay > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.renewToken();
      }, delay);
    }
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('@NOCO-expires_at'));
    // console.log('EXPIRESAT', expiresAt)
    // console.log('is okay? ', new Date().getTime() < expiresAt);
    return new Date().getTime() < expiresAt;
  }
}

