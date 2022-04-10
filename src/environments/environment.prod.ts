export const environment = {
  production: true,
  serverHost: 'http://161.97.123.113',
  serverPort: '8080',
  serverDomain: function (): string {
    return this.serverHost + ':' + this.serverPort;
  }
};
