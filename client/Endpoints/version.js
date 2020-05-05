import app from './index';

export const versionService = app.service('api/v1/version');

export const createVersion = (version, deployment) => versionService.create({version, deployment});

export const updateVersion = (_id, version) => versionService.patch(_id, {version});

export const deleteVersion = (_id) => versionService.remove(_id);

export const getVersions = ($skip = 0) => versionService.find({
    query: {
        $skip
    }
});
