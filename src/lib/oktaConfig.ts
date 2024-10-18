export const oktaConfig = {
    //INFO: clientId, issuer i redirectUri są ze strony admina w OKTA
    //      reszta w sumie nie wiem.
    //      Zależności do ściągnięcia żeby używać OKTA:
    //      npm install @okta/okta-signin-widget@6.3.3
    //      npm install @okta/okta-react@6.4.3
    clientId: '0oakbvlikiEE3X6SO5d7',
    issuer:'https://dev-26581089.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpCheck: true,
}