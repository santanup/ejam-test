import {BadRequest, Conflict} from '@feathersjs/errors';

const preventDuplicate = () => async context => {

    const {app, data} = context;

    const {deployment, version} = data;

    const result = await app
        .service('api/v1/version')
        .find({query: {deployment, version}, paginate: false});

    if (result.length) throw new Conflict('Version name is already exist on this deployment');

    return context;
};

export default {
    before: {
        all: [],
        find: [],
        get: [],
        create: [preventDuplicate()],
        update: [],
        patch: [],
        remove: []
    },

    after: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
};
