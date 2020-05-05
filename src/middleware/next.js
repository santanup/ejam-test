import {handle} from '../nextApp';
// const { parse } = require('url');

// Add your own services here.
// If the path is not been added here
// it will be passed to next.js
// const feathersServices = {
//     '/users': true,
// };

// eslint-disable-next-line no-unused-vars
const isNotFeathersService = path => !!path.match(/^(?!(\/(api)\/)).+$/);

// const isOauthService = path => !!path.match(/^(\/(oauth)\/).+$/);
// eslint-disable-next-line no-unused-vars
export default function (options = {}) {
    return function next(req, res, next) {

        // if (isOauthService(req.path)) return next();

        // console.log(!!isFeathersService(req.path), req.path);
        // const parsedUrl = parse(req.url, true);
        // const { pathname } = parsedUrl;
        //
        // // handle GET request to /service-worker.js
        // if (pathname === '/service-worker.js') {
        //     const filePath = join(__dirname, '.next', pathname)
        //
        //     app.serveStatic(req, res, filePath)
        // } else {
        //     handle(req, res, parsedUrl);
        // }
        return isNotFeathersService(req.path) ? handle(req, res) : next();
    };
}
