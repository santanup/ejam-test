import { Store } from 'laco';

const DeploymentStore = new Store({total: 0, data: []}, 'deployment');

export default DeploymentStore;
