// Initializes the `Version` service on path `/api/v1/version`
import { Version } from './version.class';

import createModel from '../../models/version.model';
import hooks from './version.hooks';

export default function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate')
    };

    // Initialize our service with any options it requires
    app.use('/api/v1/version', new Version(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('api/v1/version');

    service.hooks(hooks);
}
