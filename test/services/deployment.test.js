const app = require('../../src/app');

describe('\'Deployment\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/v1/deployment');
    expect(service).toBeTruthy();
  });
});
