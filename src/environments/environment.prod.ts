export const environment = {
  production: true,
  serverHost: 'https://backend.toastware.com',
  serverPort: '8080',
  shopPath: '/api/shop',
  authPath: '/api/auth',
  serverDomain: function (): string {
    return this.serverHost;
  }
};
