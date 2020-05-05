const app = require('../../src/app');

describe('\'Version\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/v1/version');
    expect(service).toBeTruthy();
  });
});
