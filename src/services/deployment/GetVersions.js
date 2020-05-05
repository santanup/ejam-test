
const GetVersions = () => async context => {
    const {app, result} = context;
    if (!result.data) return context;

    for (let index = 0; index < result.data.length ; index ++) {
        const each = result.data[index];
        const versions = await app
            .service('api/v1/version')
            .find({query: {deployment: each._id}, paginate: false});
        context.result.data[index]['versions'] = versions;
    }

    return context;
};

export default GetVersions;
