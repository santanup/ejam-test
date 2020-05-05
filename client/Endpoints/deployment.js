import app from './index';

export const deploymentService = app.service('api/v1/deployment');

export const createDeployment = (url, templateName) => deploymentService.create({url, templateName});

export const updateDeployment = (_id, url, templateName) => deploymentService.patch(_id, {url, templateName});

export const deleteDeployment = (_id) => deploymentService.remove(_id);

export const getDeployments = ($skip = 0) => deploymentService.find({
    query: {
        $skip
    }
});
