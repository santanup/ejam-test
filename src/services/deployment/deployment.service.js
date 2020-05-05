// Initializes the `Deployment` service on path `/api/v1/deployment`
import { Deployment } from './deployment.class';

import createModel from '../../models/deployment.model';
import hooks from './deployment.hooks';

export default function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate')
    };

    // Initialize our service with any options it requires
    app.use('/api/v1/deployment', new Deployment(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('api/v1/deployment');

    service.hooks(hooks);
}
