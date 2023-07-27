const defaultValues = {
    port: 3001,
    dbUri: 'mongodb://localhost:27017',
    dbName: 'yad2',
    govAttractionsUrl: 'https://data.gov.il/api/3/action/datastore_search?resource_id=7d00ab76-1795-4277-978f-c3ce8cc3905b&limit=40',
    getENV: () => (Object.keys(ENVIRONMENT).indexOf(process.env.NODE_ENV || '') > -1 ? process.env.NODE_ENV || 'development' : 'development'),
};
const getENV = defaultValues.getENV;

const ENVIRONMENT = {
    development: {
        ...defaultValues,
    },
    integration: {
        ...defaultValues,
    },
    stage: {
        ...defaultValues,
    },
    production: {
        ...defaultValues,
    },
};

export default ENVIRONMENT[getENV()] as typeof defaultValues;