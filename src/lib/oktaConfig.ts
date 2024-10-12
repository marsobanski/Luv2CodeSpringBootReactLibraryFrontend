export const oktaConfig = {
    //INFO: clientId, issuer i redirectUri są ze strony admina w OKTA
    //      reszta w sumie nie wiem
    clientId: '0oakbvlikiEE3X6SO5d7',
    issuer:'https://dev-26581089.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/logic/callback',
    scopes: ['openId', 'profile', 'email'],
    pkce: true,
    disableHttpCheck: true,
}