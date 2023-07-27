"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultValues = {
    port: 3001,
    dbUri: 'mongodb://localhost:27017',
    dbName: 'yad2',
    govAttractionsUrl: 'https://data.gov.il/api/3/action/datastore_search?resource_id=7d00ab76-1795-4277-978f-c3ce8cc3905b&limit=40',
    getENV: () => (Object.keys(ENVIRONMENT).indexOf(process.env.NODE_ENV || '') > -1 ? process.env.NODE_ENV || 'development' : 'development'),
};
const getENV = defaultValues.getENV;
const ENVIRONMENT = {
    development: Object.assign({}, defaultValues),
    integration: Object.assign({}, defaultValues),
    stage: Object.assign({}, defaultValues),
    production: Object.assign({}, defaultValues),
};
exports.default = ENVIRONMENT[getENV()];
//# sourceMappingURL=index.js.map