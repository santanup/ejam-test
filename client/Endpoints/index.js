import feathers from '@feathersjs/feathers';
import { CookieStorage } from 'cookie-storage';
import rest from '@feathersjs/rest-client';
import Axios from 'axios';

export const cookieStorage = new CookieStorage();

const restClient = rest();

const app = feathers();

app.configure(restClient.axios(Axios));

export default app;
