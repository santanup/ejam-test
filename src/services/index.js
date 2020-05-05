import deployment from './deployment/deployment.service';
import version from './version/version.service.js';
// eslint-disable-next-line no-unused-vars
export default function (app) {
    app.configure(deployment);
    app.configure(version);
}
