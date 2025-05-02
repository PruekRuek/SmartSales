import { UserManager } from 'oidc-client-ts';

const cognitoAuthConfig = {
  authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_03jmzfsgh',
  client_id: '1706k5korvt64vjse4n0allpj0',
  redirect_uri: 'http://localhost:5174/callback',
  response_type: 'code',
  scope: 'email openid phone profile'
};

export const userManager = new UserManager(cognitoAuthConfig);

export async function signOutRedirect() {
  const clientId = cognitoAuthConfig.client_id;
  const logoutUri = 'http://localhost:5174'; // หน้า logout หรือ root page
  const cognitoDomain = 'https://us-east-103jmzfsgh.auth.us-east-1.amazoncognito.com';

  window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  
}
